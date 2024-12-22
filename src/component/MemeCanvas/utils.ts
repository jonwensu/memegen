import type { Canvas as FabricCanvas } from "fabric";
import { FabricImage, Textbox as FabricTextbox, Shadow } from "fabric";
import { CANVAS_MIN_HEIGHT, CANVAS_MIN_WIDTH } from "./constants";
import type { TextboxConfig } from "./types";

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
  canvas.set("width", image.getScaledWidth());
  canvas.set("height", image.getScaledHeight());
  canvas.renderAll();
}

function createTextbox({ content, x, y, allCaps, ...rest }: TextboxConfig) {
  return new FabricTextbox(allCaps ? content.toUpperCase() : content, {
    originX: "center",
    originY: "center",
    left: x,
    top: y,
    ...rest,
  });
}

export function loadTextboxes(canvas: FabricCanvas, texts: TextboxConfig[]) {
  if (texts.length === 0) return;

  const { x: cx, y: cy } = canvas.getCenterPoint();
  const defaultTextConfig: Partial<TextboxConfig> = {
    x: cx,
    y: cy,
    fontSize: 60,
    allCaps: true,
    fill: "white",
    fontFamily: "impact",
    fontWeight: "bold",
    stroke: "black",
    strokeWidth: 1,
    charSpacing: -35,
    shadow: new Shadow({
      color: "black",
      blur: 4,
      offsetX: 2,
      offsetY: 2,
    }),
  };
  canvas.add(
    ...texts.map((config) =>
      createTextbox({ ...defaultTextConfig, ...config }),
    ),
  );

  canvas.renderAll();
}
