import { FC, useLayoutEffect, useMemo } from "react";
import { Animate } from "./transform";
import { useNode } from "./base/hooks/node";

const DEFAULT_CANVAS_SIZE = { width: 200, height: 200 };

interface IAnimatePreviewProps {
  animate: Animate;
  frame: number,
  canvasSize?: { width: number, height: number },
}

const AnimatePreview: FC<IAnimatePreviewProps> = (props) => {
  const { animate, frame, canvasSize = DEFAULT_CANVAS_SIZE } = props;

  const [canvas, mountCanvas] = useNode<HTMLCanvasElement>();
  const context = useMemo(() => canvas && canvas.getContext("2d"), [canvas]);

  useLayoutEffect(() => {
    if (!context) return;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    const centerX = canvasSize.width / 2;
    const centerY = canvasSize.height / 2;
    const drawOrders = animate.frames[frame];
    drawOrders.forEach(([index, x, y, zoom, opacity]) => {
      context.globalAlpha = opacity / 255;
      const bitmap = animate.bitmaps[index];
      const bitmapSize = { width: bitmap.canvas.width * zoom / 100, height: bitmap.canvas.height * zoom / 100 };
      context.drawImage(bitmap.canvas, centerX + x - bitmapSize.width / 2, centerY + y - bitmapSize.height / 2, bitmapSize.width, bitmapSize.height);
    });
  }, [context, animate, frame, canvasSize]);

  return (
    <canvas ref={mountCanvas} width={canvasSize.width} height={canvasSize.height} />
  )
}

export default AnimatePreview;
