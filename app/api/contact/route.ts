import { NextRequest, NextResponse } from 'next/server';

interface ContactBody {
  name: string;
  email: string;
  message: string;
}

// Rate limiting (simple in-memory — use Redis/Upstash in production)
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimit.get(ip);

  if (!limit || now > limit.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 60_000 }); // 1 min window
    return true;
  }
  if (limit.count >= 3) return false; // max 3 per minute
  limit.count++;
  return true;
}

export async function POST(req: NextRequest) {
  // Basic rate limiting
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment.' },
      { status: 429 }
    );
  }

  try {
    const body: ContactBody = await req.json();
    const { name, email, message } = body;

    // Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // In production, you can either:
    // 1. Call EmailJS server-side API here
    // 2. Use Nodemailer with SMTP
    // 3. Use Resend API (https://resend.com) — simple and free tier
    //
    // For now, we log and return success.
    // The frontend also handles EmailJS directly as a fallback.
    console.log('Contact form submission:', { name, email, message: message.substring(0, 50) });

    return NextResponse.json(
      { success: true, message: 'Message received! Chinmay will get back to you soon.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact route error:', error);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
