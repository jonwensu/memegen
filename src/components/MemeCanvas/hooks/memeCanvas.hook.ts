"use client";
import type { FabricObject } from "fabric";
import { Canvas as FabricCanvas, Textbox as FabricTextbox } from "fabric";
import type { RefObject } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CANVAS_MIN_HEIGHT, CANVAS_MIN_WIDTH } from "../constants";
import type { FabricHandler } from "../types";
import {
  loadBackgroundImage,
  loadTextboxes,
  createTextbox,
  hasId,
  downloadCanvas,
  copyCanvasToClipboard,
} from "../utils";
import type { MemeTemplate } from "@/types";

type FabricConfig = {
  onSelect?: (object: FabricObject | null) => void;
  onChange?: (objects: FabricObject[]) => void;
};

function useFabric(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  { onSelect, onChange }: FabricConfig,
) {
  const fabricRef = useRef<FabricCanvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    fabricRef.current = new FabricCanvas(canvasRef.current, {
      width: CANVAS_MIN_WIDTH,
      height: CANVAS_MIN_HEIGHT,
    });

    const canvas = fabricRef.current;
    canvas.renderAll();
    canvas.on("object:added", () => {
      const updatedObjects = canvas.getObjects();
      onChange?.(updatedObjects);
    });

    canvas.on("object:removed", () => {
      const updatedObjects = canvas.getObjects();
      onChange?.(updatedObjects);
    });

    canvas.on("object:modified", () => {
      const updatedObjects = canvas.getObjects();
      onChange?.(updatedObjects);
    });

    canvas.on("text:changed", () => {
      const updatedObjects = canvas.getObjects();
      onChange?.(updatedObjects);
    });

    canvas.on("selection:created", (e) => {
      onSelect?.(e.selected?.[0] || null);
    });

    canvas.on("selection:cleared", () => {
      onSelect?.(null);
    });

    return () => {
      fabricRef.current?.dispose();
    };
  }, [canvasRef, onSelect, onChange]);

  return fabricRef.current;
}

export function useMemeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [objects, setObjects] = useState<FabricObject[]>([]);
  const [selectedObject, setSelectedObject] = useState<FabricObject | null>(
    null,
  );

  const makeFabricHandler = <Args extends unknown[], Return>(
    fn: FabricHandler<Args, Return>,
  ) => {
    return (...args: Args): Return | void => {
      if (!fabricCanvas) return;
      return fn(fabricCanvas, ...args);
    };
  };

  const textboxes = useMemo(
    () => objects.filter((object) => object instanceof FabricTextbox),
    [objects],
  );

  const updateTextbox = makeFabricHandler(
    (canvas: FabricCanvas, index: number, value: string) => {
      const textbox = textboxes[index];
      if (!textbox) return;
      if (!hasId(textbox)) return;
      canvas.forEachObject((object) => {
        if (!hasId(object)) return;
        if (!(object instanceof FabricTextbox)) return;
        if (object.id !== textbox.id) return;
        object.set({ text: value });
        canvas.fire("text:changed", { target: object });
      });
      canvas.requestRenderAll();
    },
  );

  const fabricCanvas = useFabric(canvasRef, {
    onChange: setObjects,
    onSelect: setSelectedObject,
  });
  const [memeTemplate, setMemeTemplate] = useState<MemeTemplate>();

  const bootstrap = useCallback(async () => {
    if (!fabricCanvas) return;
    if (!memeTemplate) return;
    fabricCanvas.clear();
    await loadBackgroundImage(memeTemplate.url, fabricCanvas);

    const templateTextboxes = (memeTemplate.texts ?? []).map((item) =>
      createTextbox(fabricCanvas, item),
    );
    loadTextboxes(fabricCanvas, templateTextboxes);
  }, [fabricCanvas, memeTemplate]);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  const addText = makeFabricHandler(
    (canvas: FabricCanvas, text: string, isActiveObject = true) => {
      const textbox = createTextbox(canvas, { content: text });

      canvas.add(textbox);
      if (isActiveObject) canvas.setActiveObject(textbox);
      canvas.renderAll();
    },
  );

  const removeObject = makeFabricHandler(
    (canvas: FabricCanvas, object: FabricObject) => {
      canvas.remove(object);
    },
  );

  const download = makeFabricHandler((canvas: FabricCanvas) => {
    downloadCanvas(canvas);
  });

  const copy = makeFabricHandler(async (canvas: FabricCanvas) => {
    return await copyCanvasToClipboard(canvas);
  });

  return {
    canvasRef,
    addText,
    memeTemplate,
    setMemeTemplate,
    objects,
    selectedObject,
    textboxes,
    removeObject,
    updateTextbox,
    download,
    copy,
  };
}
