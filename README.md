## Edit Image with OpenAI

My goal was to quickly try out the openAI API to generate images.  
What I had in mind was the AI assistant could be a renouned interior designer and could help me improve the decoration in my leaving room.

I initially tried to call [this endpoint](https://platform.openai.com/docs/api-reference/images/create-edit) without a mask but it was not working, probably because it's expecting the original image to have the alpha layer (transparency) where you want to modify the image. So instead to modify the original I just provided a mask that I created in Gimp.

## Findings

It's pretty bad... I really wish I had access to GPT4 to play with this a bit more. The result was horrendus.

I tried to type everything but I found out that the openai SDK is expecting a `File` (DOM) type and is not accepting `ReadableStream` so I ended up using a `fetch` and hit the API directly.

It was a fun little project :)

## Todo

I'd really like to load the image to preview it. And what I have in mind is to load it in some kind of canva where we can create this alpha layer by deleting part of the image with a brush. I never used canvas so I'm not sure that's possible.
