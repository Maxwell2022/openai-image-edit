'use client';

import React from 'react';

export default function Home() {
  const [isGenerating, setGenerating] = React.useState<boolean>(false);
  const [images, setImages] = React.useState<string[]>([]);
  const imageRef = React.useRef<HTMLInputElement>(null);
  const maskRef = React.useRef<HTMLInputElement>(null);
  const descriptionRef = React.useRef<HTMLTextAreaElement>(null);

  const handleGenerate = React.useCallback(async () => {
    if (isGenerating) {
      return;
    }

    const images = imageRef.current?.files;
    const masks = maskRef.current?.files;
    const description = descriptionRef.current?.value;
    const image = images?.[0];
    const mask = masks?.[0];

    if (!image || !mask || !description) {
      return;
    }

    setGenerating(true);

    const formData = new FormData();
    formData.append('original', image);
    formData.append('mask', mask);
    formData.append('description', description);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      });

      const json = await response.json();
      const urls = json?.data?.map((image: any) => image.url);

      setImages(urls);
      setGenerating(false);
    } catch (e) {
      setGenerating(false);
      console.error(e);
    }
  }, [isGenerating]);

  return (
    <main className="flex min-h-screen flex-col items-start gap-4 p-24 text-sm text-violet-600">
      <div className="w-full">
        <label htmlFor="formFile" className="mb-2 inline-block font-semibold">
          Oringinal Image
        </label>
        <input
          className="semibold relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-white bg-violet-600 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-white transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-violet-600 file:px-3 file:py-[0.32rem] file:text-white file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] focus:outline-none "
          type="file"
          name="original"
          id="originalImage"
          placeholder="must be a valid PNG file, less than 4MB, and square."
          alt="The image to use as the basis for the variation(s)"
          accept="image/png"
          tabIndex={1}
          ref={imageRef}
        />
        <p className="py-2 text-xs italic">
          it must be a valid PNG file, less than 4MB, and square.
        </p>
      </div>
      <div className="w-full">
        <label htmlFor="formFile" className="mb-2 inline-block font-semibold">
          Image Mask (alpha)
        </label>
        <input
          className="semibold relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-white bg-violet-600 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-white transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-violet-600 file:px-3 file:py-[0.32rem] file:text-white file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] focus:outline-none "
          type="file"
          name="mask"
          id="maskImage"
          placeholder="must be a valid PNG file, less than 4MB, and square."
          alt="The mask to use to indicate where the variation(s) should be applied"
          accept="image/png"
          tabIndex={1}
          ref={maskRef}
        />
        <p className="py-2 text-xs italic">
          it must be a valid PNG file, less than 4MB, square and the exact same
          size than the original.
        </p>
      </div>
      <div className="w-full">
        <label htmlFor="formFile" className="mb-2 inline-block font-semibold">
          Describe the variation
        </label>
        <textarea
          name="description"
          className="h-32 w-full p-2"
          placeholder="Describe here the variation of the image you want to generate..."
          tabIndex={2}
          ref={descriptionRef}
        ></textarea>
      </div>
      <input
        type="button"
        value={isGenerating ? 'Generating...' : 'Generate'}
        className="cursor-pointer rounded-md border bg-violet-600 px-4 py-2 text-white"
        tabIndex={3}
        onClick={handleGenerate}
      />
      <div className="min-h-32 center flex w-full flex-1 flex-col gap-4 border-[thin] border-dashed border-violet-600 p-2 text-center text-violet-600">
        {!images
          ? `Your image will be generated here`
          : images.map((image, i) => (
              <img
                key={i}
                alt={`generated image ${i}`}
                src={image}
                className="flex"
              />
            ))}
      </div>
    </main>
  );
}
