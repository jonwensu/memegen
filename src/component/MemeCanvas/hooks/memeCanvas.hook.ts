"use client";
import { Canvas as FabricCanvas, Textbox as FabricTextbox } from "fabric";
import type { RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { CANVAS_MIN_HEIGHT, CANVAS_MIN_WIDTH } from "../constants";
import type { FabricHandler, MemeTemplate } from "../types";
import { loadBackgroundImage, loadTextboxes } from "../utils";

function useFabric(canvasRef: RefObject<HTMLCanvasElement | null>) {
  const fabricRef = useRef<FabricCanvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    fabricRef.current = new FabricCanvas(canvasRef.current, {
      width: CANVAS_MIN_WIDTH,
      height: CANVAS_MIN_HEIGHT,
      backgroundColor: "white",
    });
    fabricRef.current.renderAll();
    return () => {
      fabricRef.current?.dispose();
    };
  }, [canvasRef]);

  return fabricRef.current;
}

export function useMemeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvas = useFabric(canvasRef);
  const [memeTemplate, setMemeTemplate] = useState<MemeTemplate | null>(null);

  const bootstrap = useCallback(async () => {
    if (!fabricCanvas) return;
    if (!memeTemplate) return;
    fabricCanvas.clear();
    await loadBackgroundImage(memeTemplate.url, fabricCanvas);
    loadTextboxes(fabricCanvas, memeTemplate.texts ?? []);
  }, [fabricCanvas, memeTemplate]);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  const makeFabricHandler = <Args extends unknown[], Return>(
    fn: FabricHandler<Args, Return>,
  ) => {
    return (...args: Args): Return | void => {
      if (!fabricCanvas) return;
      return fn(fabricCanvas, ...args);
    };
  };

  const addText = makeFabricHandler((canvas: FabricCanvas, text: string) => {
    const { x: cx, y: cy } = canvas.getCenterPoint();
    const textbox = new FabricTextbox(text, {
      originX: "center",
      originY: "center",
      left: cx,
      top: cy,
      fill: "#880E4F",
      stroke: "#D81B60",
      fontSize: 100,
    });
    canvas.add(textbox);
    canvas.setActiveObject(textbox);
    canvas.renderAll();
  });

  return { canvasRef, addText, setMemeTemplate };
}
