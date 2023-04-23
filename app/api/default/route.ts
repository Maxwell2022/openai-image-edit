import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { query } = await request.json();
  return new Response(JSON.stringify({ query }), {
    headers: { 'content-type': 'application/json' },
    status: 200,
  });
}
