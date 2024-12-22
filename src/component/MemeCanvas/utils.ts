import type { Canvas as FabricCanvas } from "fabric";
import { FabricImage } from "fabric";
import { CANVAS_MIN_HEIGHT, CANVAS_MIN_WIDTH } from "./constants";

export async function loadImage(url: string) {
  const image = await FabricImage.fromURL(url);

  // Calculate scaling
  const scaleX = CANVAS_MIN_WIDTH / image.width;
  const scaleY = CANVAS_MIN_HEIGHT / image.height;
  const scale = Math.min(scaleX, scaleY);

  // Apply the scaling
  image.scale(scale);

  return image;
}

export async function loadBackgroundImage(url: string, canvas: FabricCanvas) {
  const image = await loadImage(url);

  canvas.backgroundImage = image;
  canvas.setWidth(image.getScaledWidth());
  canvas.setHeight(image.getScaledHeight());
  canvas.renderAll();
}
