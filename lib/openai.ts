import { oneLineTrim } from 'common-tags';

export class OpenAI {
  async generateImageVariation(image: any, mask: any, description: string) {
    const prompt = oneLineTrim`
    You are an AI specializing in interior design. You are sourcing your inspiration from unsplash website.

    Human: Hi, I need your export help to design a room
    AI: Sure I'll be happy to help with my expertise.
    Human: ${description}
    `;

    const formData = new FormData();
    formData.append('image', image);
    formData.append('mask', mask);
    formData.append('prompt', description);
    formData.append('n', '2');
    formData.append('size', '1024x1024');
    formData.append('response_format', 'url');

    // openai SDK is not typing image correctly so we need to fetch it directly
    const response = await fetch('https://api.openai.com/v1/images/edits', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: formData,
    });

    return response.json();
  }
}
