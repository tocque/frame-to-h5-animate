export const createImage = async (src: string) => {
  const image = document.createElement("img");
  await new Promise<void>((resolve) => {
    image.addEventListener("load", () => resolve(), { once: true });
    image.src = src;
  });
  return image;
}

export const createImageFromBlob = async (blob: Blob) => {
  const url = URL.createObjectURL(blob);
  const image = await createImage(url);
  URL.revokeObjectURL(url);
  return image;
}

export const splitImage = (image: HTMLImageElement, width: number) => {
  const images: CanvasRenderingContext2D[] = [];
  for (let offset = 0; offset < image.width; offset += width) {
    const canvas = document.createElement("canvas");
    canvas.height = image.height;
    canvas.width = width;
    const context = canvas.getContext("2d")!;
    context.drawImage(image, offset, 0, width, image.height, 0, 0, width, image.height);
    images.push(context);
  }
  return images;
}

