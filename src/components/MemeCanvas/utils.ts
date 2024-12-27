import type { Canvas as FabricCanvas } from "fabric";
import { FabricImage, Textbox as FabricTextbox, Shadow } from "fabric";
import { CANVAS_MIN_HEIGHT, CANVAS_MIN_WIDTH } from "./constants";
import type { TextboxConfig, WithId } from "@/types";
import { nanoid } from "nanoid";

export async function loadImage(url: string) {
  const image = await FabricImage.fromURL(url, { crossOrigin: "anonymous" });

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

export function downloadCanvas(canvas: FabricCanvas) {
  const dataURL = canvas.toDataURL({
    format: "png",
    quality: 1,
    multiplier: 2,
  });
  const link = document.createElement("a");
  link.download = "meme.png";
  link.href = dataURL;
  link.click();
  document.body.removeChild(link);
}

async function requestClipboardPermission() {
  const permissionStatus = await navigator.permissions.query({
    name: "clipboard-write" as PermissionName,
  });

  switch (permissionStatus.state) {
    case "granted":
      return true;
    case "prompt":
      // Trigger the permission prompt
      try {
        await navigator.clipboard.writeText("");
        return true;
      } catch (_error) {
        return false;
      }
    case "denied":
      alert("Clipboard permission was denied...");
      return false;
  }
}

async function checkClipboardPermissions() {
  try {
    // Check if clipboard-write permission is available
    const result = await navigator.permissions.query({
      name: "clipboard-write" as PermissionName,
    });
    return result.state === "granted" || result.state === "prompt";
  } catch (_error) {
    console.warn("Clipboard permissions API not available");
    return false;
  }
}

export async function copyCanvasToClipboard(canvas: FabricCanvas) {
  try {
    const hasPermission = await checkClipboardPermissions();
    if (!hasPermission) {
      console.warn("Clipboard write permission not granted");
      if (!(await requestClipboardPermission())) {
        return false;
      }
    }

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.lowerCanvasEl.toBlob((b) => {
        if (!b) return reject(new Error("Failed to convert canvas to blob"));
        resolve(b);
      }, "image/png");
    });

    const data = new ClipboardItem({ "image/png": blob });

    await navigator.clipboard.write([data]);
    return true;
  } catch (error) {
    console.error("Failed to copy canvas to clipboard", error);
    return false;
  }
}
