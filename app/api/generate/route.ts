import { NextRequest } from 'next/server';
import { OpenAI } from '@/lib/openai';

export async function POST(request: NextRequest) {
  // Get form data from request
  const formData = await request.formData();
  const image = formData.get('original');
  const mask = formData.get('mask');
  const description = formData.get('description');

  if (!image || !mask) {
    return new Response('invalid user input', { status: 400 });
  }

  if (!description || typeof description !== 'string') {
    return new Response('invalid user input', { status: 400 });
  }

  const openAI = new OpenAI();
  const images = await openAI.generateImageVariation(image, mask, description);

  return new Response(JSON.stringify(images), { status: 200 });
}
