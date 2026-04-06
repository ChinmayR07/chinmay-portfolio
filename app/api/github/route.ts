import { NextResponse } from 'next/server';

// Cache for 1 hour to avoid hitting GitHub rate limits
export const revalidate = 3600;

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? 'chinmayraichur';

export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
    };

    // Optional auth token — increases rate limit from 60 to 5000 req/hr
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }),
      fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=6`,
        { headers }
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      throw new Error('GitHub API error');
    }

    const user = await userRes.json();
    const repos = await reposRes.json();

    // Return only the data we need
    return NextResponse.json({
      user: {
        login: user.login,
        name: user.name,
        avatar_url: user.avatar_url,
        public_repos: user.public_repos,
        followers: user.followers,
        html_url: user.html_url,
      },
      repos: repos
        .filter((r: { fork: boolean }) => !r.fork) // exclude forks
        .slice(0, 4)
        .map((r: {
          id: number;
          name: string;
          description: string;
          html_url: string;
          homepage: string;
          stargazers_count: number;
          language: string;
          topics: string[];
        }) => ({
          id: r.id,
          name: r.name,
          description: r.description,
          url: r.html_url,
          homepage: r.homepage,
          stars: r.stargazers_count,
          language: r.language,
          topics: r.topics,
        })),
    });
  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json({ error: 'Could not fetch GitHub data' }, { status: 500 });
  }
}
