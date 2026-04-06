import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Initialize Redis client using env vars
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const VIEWS_KEY = 'portfolio:views';

// GET — fetch current view count (no increment)
export async function GET() {
  try {
    const views = await redis.get<number>(VIEWS_KEY);
    return NextResponse.json({ views: views ?? 0 });
  } catch (error) {
    console.error('Redis GET error:', error);
    return NextResponse.json({ views: 0 });
  }
}

// POST — increment view count and return new value
export async function POST() {
  try {
    // INCR atomically increments by 1 and returns the new value
    // This is Redis's built-in atomic increment — no race conditions
    const views = await redis.incr(VIEWS_KEY);
    return NextResponse.json({ views });
  } catch (error) {
    console.error('Redis POST error:', error);
    return NextResponse.json({ views: 0 });
  }
}
