type DrawOrder = [index: number, x: number, y: number, zoom: number, opacity: number];

export interface Animate {
  ratio: number;
  se?: string;
  bitmaps: CanvasRenderingContext2D[];
  frame_max: number;
  frames: DrawOrder[][];
}

export interface AnimateData {
  ratio: number;
  se?: string;
  bitmaps: string[];
  frame_max: number;
  frames: DrawOrder[][];
}

export const frameToAnimate = async (frameImages: CanvasRenderingContext2D[], se?: string): Promise<Animate> => {

  return {
    ratio: 1,
    se,
    bitmaps: frameImages,
    frame_max: frameImages.length,
    frames: frameImages.map((_, i) => [[i, 0, 0, 100, 255]]),
  }
}

export const dumpAnimate = async (animate: Animate): Promise<AnimateData> => {
  const bitmaps = animate.bitmaps.map((e) => e.canvas.toDataURL("image/png"));

  return {
    ratio: animate.ratio,
    se: animate.se,
    bitmaps: bitmaps,
    frame_max: animate.frame_max,
    frames: animate.frames,
  }
}
