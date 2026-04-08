import { NextRequest, NextResponse } from 'next/server';
import {
  AWARDS,
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCES,
  NAV_LINKS,
  PROJECTS,
  SKILL_GROUPS,
  TESTIMONIALS,
} from '@/data';

// ─── Types ────────────────────────────────────────────────────────────────────
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface RequestBody {
  message: string;
  history?: ChatMessage[];
}

interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  topics?: string[];
  updated_at: string;
  pushed_at: string;
  fork: boolean;
}

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? 'ChinmayR07';
const FAQ_CACHE_TTL_MS = 5 * 60 * 1000;
const faqResponseCache = new Map<string, { response: string; expiresAt: number }>();

const BASE_SYSTEM_PROMPT = `You are Chinmay Raichur's AI portfolio assistant.

Your job:
- Answer questions for recruiters/hiring managers/developers about Chinmay's background, projects, and GitHub work.
- Prioritize factual accuracy from the provided context.
- Be concise, confident, and professional.

Behavior rules:
- Keep answers to 2-5 sentences unless the user asks for deep detail.
- Lead with strongest evidence (impact metrics, production scope, ownership).
- If a question asks for "latest/current/newest" repo info, prioritize the GitHub live snapshot context.
- If data is unavailable or uncertain, say that clearly and suggest contacting Chinmay at chinmayraichur@gmail.com.
- For salary, notice period, or private/personal questions: respond politely that it's best discussed directly with Chinmay.
- Never invent companies, dates, repo names, metrics, or links.
`;

function listToBullets(lines: string[]) {
  return lines.map((line) => `- ${line}`).join('\n');
}

function normalizeFaqKey(input: string) {
  return input.toLowerCase().replace(/\s+/g, ' ').trim();
}

function buildPortfolioContext() {
  const nav = NAV_LINKS.map((link) => link.label).join(', ');

  const experienceLines = EXPERIENCES.map((exp) => {
    const bullets = exp.bullets.slice(0, 3).join(' | ');
    return `${exp.title} @ ${exp.company} (${exp.startDate} - ${exp.endDate}, ${exp.location}) :: ${bullets}`;
  });

  const skillLines = SKILL_GROUPS.map(
    (group) => `${group.category}: ${group.skills.slice(0, 8).join(', ')}`
  );

  const projectLines = PROJECTS.map(
    (project) =>
      `${project.title} (${project.year}) [${project.category}] - ${project.description} | tech: ${project.techStack.join(', ')} | github: ${project.githubUrl ?? 'N/A'} | live: ${project.liveUrl ?? 'N/A'}`
  );

  const educationLines = EDUCATION.map(
    (edu) =>
      `${edu.degree} ${edu.major} @ ${edu.institutionShort} (${edu.startYear} - ${edu.endYear}) GPA ${edu.gpa}/${edu.gpaScale}`
  );

  const awardLines = AWARDS.map((award) => `${award.title} (${award.year}) - ${award.description}`);
  const certificationLines = CERTIFICATIONS.map(
    (cert) => `${cert.title} (${cert.year}) by ${cert.issuer}`
  );
  const testimonialLines = TESTIMONIALS.slice(0, 3).map(
    (t) => `${t.name}, ${t.title} at ${t.company}: "${t.text.slice(0, 220)}..."`
  );

  return `## Portfolio Context (Source of Truth from Portfolio Data)
Sections on portfolio: ${nav}

### Experience
${listToBullets(experienceLines)}

### Skills
${listToBullets(skillLines)}

### Projects
${listToBullets(projectLines)}

### Education
${listToBullets(educationLines)}

### Awards
${listToBullets(awardLines)}

### Certifications
${listToBullets(certificationLines)}

### Testimonials (sample)
${listToBullets(testimonialLines)}
`;
}

async function fetchLiveGitHubContext() {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'chinmay-portfolio-chatbot',
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers,
      next: { revalidate: 300 },
    }),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=24&sort=updated`, {
      headers,
      next: { revalidate: 300 },
    }),
  ]);

  if (!userRes.ok || !reposRes.ok) {
    throw new Error(
      `GitHub API failed: user=${userRes.status} repos=${reposRes.status} username=${GITHUB_USERNAME}`
    );
  }

  const user = await userRes.json();
  const repos = (await reposRes.json()) as GitHubRepo[];

  const sourceRepos = repos.filter((repo) => !repo.fork);
  const topByStars = [...sourceRepos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 8);
  const recentUpdates = [...sourceRepos]
    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
    .slice(0, 8);

  const repoLines = sourceRepos.slice(0, 12).map((repo) => {
    const topics = repo.topics?.slice(0, 5).join(', ') || 'none';
    return `${repo.name} | stars=${repo.stargazers_count} forks=${repo.forks_count} lang=${repo.language ?? 'N/A'} | updated=${repo.updated_at} | topics=${topics} | ${repo.description ?? 'No description'} | ${repo.html_url}`;
  });

  return `## Live GitHub Snapshot
GitHub username: ${user.login}
Profile URL: ${user.html_url}
Public repos: ${user.public_repos}
Followers: ${user.followers}
Following: ${user.following}

Top repositories by stars:
${listToBullets(topByStars.map((repo) => `${repo.name} (${repo.stargazers_count}★)`))}

Most recently pushed repositories:
${listToBullets(recentUpdates.map((repo) => `${repo.name} (pushed ${repo.pushed_at})`))}

Repository details:
${listToBullets(repoLines)}
`;
}

// ─── POST Handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const { message, history = [] } = body;

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const trimmedMessage = message.trim();
    const isFirstTurn = history.length === 0;
    const faqCacheKey = normalizeFaqKey(trimmedMessage);

    if (isFirstTurn) {
      const cached = faqResponseCache.get(faqCacheKey);
      if (cached && cached.expiresAt > Date.now()) {
        return NextResponse.json({
          response: cached.response,
          cache: { source: 'faq-memory', hit: true },
        });
      }
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      // Graceful fallback in development if key not set
      return NextResponse.json(
        {
          response:
            "I'm Chinmay's portfolio assistant, but the AI service isn't configured yet. " +
            "Please reach out to Chinmay directly at chinmayraichur@gmail.com!",
        },
        { status: 200 }
      );
    }

    const portfolioContext = buildPortfolioContext();
    let githubContext = '## Live GitHub Snapshot\n- Live GitHub data unavailable for this request.';

    try {
      githubContext = await fetchLiveGitHubContext();
    } catch (githubError) {
      console.warn('Could not fetch live GitHub data for chat context:', githubError);
    }

    const systemPrompt = `${BASE_SYSTEM_PROMPT}\n${portfolioContext}\n${githubContext}`;

    // Build messages array — include conversation history for multi-turn chat
    const messages = [
      ...history.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: 'user' as const, content: trimmedMessage },
    ];

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 700,
        cache_control: { type: 'ephemeral' },
        system: systemPrompt,
        messages,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Anthropic API error:', error);
      return NextResponse.json(
        { error: 'AI service error. Please try again.' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const aiResponse = data.content?.[0]?.text ?? 'Sorry, I could not generate a response.';

    if (isFirstTurn) {
      faqResponseCache.set(faqCacheKey, {
        response: aiResponse,
        expiresAt: Date.now() + FAQ_CACHE_TTL_MS,
      });
    }

    return NextResponse.json({
      response: aiResponse,
      cache: {
        source: 'anthropic-prompt-cache',
        read_tokens: data?.usage?.cache_read_input_tokens ?? 0,
        write_tokens: data?.usage?.cache_creation_input_tokens ?? 0,
      },
    });
  } catch (error) {
    console.error('Chat route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
