import type { Canvas as FabricCanvas } from "fabric";
import { FabricImage, Textbox as FabricTextbox, Shadow } from "fabric";
import { CANVAS_MIN_HEIGHT, CANVAS_MIN_WIDTH } from "./constants";
import type { TextboxConfig, WithId } from "@/types";
import { nanoid } from "nanoid";

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
  canvas.setDimensions({
    width: image.getScaledWidth(),
    height: image.getScaledHeight(),
  });
  canvas.renderAll();
}

export function createTextbox(
  canvas: FabricCanvas,
  {
    content,
    x = 0.5,
    y = 0.5,
    allCaps,
    ...rest
  }: Omit<TextboxConfig, "id"> & { id?: string },
) {
  const defaultTextConfig: Partial<TextboxConfig> = {
    fontSize: 60,
    allCaps: true,
    fill: "white",
    fontFamily: "impact",
    fontWeight: "bold",
    stroke: "black",
    strokeWidth: 1,
    charSpacing: -50,
    textAlign: "center",
    originX: "center",
    originY: "center",
    left: x * canvas.width,
    top: y * canvas.height,
    shadow: new Shadow({
      color: "black",
      blur: 4,
      offsetX: 2,
      offsetY: 2,
    }),
    id: nanoid(),
  };
  return new FabricTextbox(allCaps ? content.toUpperCase() : content, {
    ...defaultTextConfig,
    ...rest,
  });
}

export function loadTextboxes(canvas: FabricCanvas, texts: FabricTextbox[]) {
  if (texts.length === 0) return [];

  canvas.add(...texts);
  canvas.renderAll();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hasId<T>(obj: any): obj is WithId<T> {
  return "id" in obj;
}
