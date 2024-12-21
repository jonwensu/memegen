"use client";
import { useEffect, useRef } from "react";
import { Canvas as FabricCanvas, Textbox as FabricTextbox } from "fabric";
import type { MemeCanvasProps } from "../types";

const defaultMemeCanvasProps: Partial<MemeCanvasProps> = {
  width: 500,
  height: 500,
};

export function useMemeCanvas(props: MemeCanvasProps = {}) {
  const { width, height } = { ...defaultMemeCanvasProps, ...props };
  const fabricRef = useRef<FabricCanvas | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    fabricRef.current = new FabricCanvas(canvasRef.current, {
      width,
      height,
      backgroundColor: "white",
    });
    fabricRef.current.renderAll();

    return () => {
      fabricRef.current?.dispose();
    };
  }, [height, width]);

  type FabricHandler<Args extends unknown[], Return> = (
    canvas: FabricCanvas,
    ...args: Args
  ) => Return;

  const makeFabricHandler = <Args extends unknown[], Return>(
    fn: FabricHandler<Args, Return>,
  ) => {
    return (...args: Args): Return | void => {
      const canvas = fabricRef.current;
      if (!canvas) return;
      return fn(canvas, ...args);
    };
  };

  const addText = makeFabricHandler((canvas: FabricCanvas, text: string) => {
    const textbox = new FabricTextbox(text, {
      originX: "center",
      originY: "center",
      left: canvas.getCenterPoint().x,
      top: canvas.getCenterPoint().y,
      fill: "#880E4F",
      stroke: "#D81B60",
      fontSize: 100,
    });
    canvas.add(textbox);
    canvas.setActiveObject(textbox);
    canvas.renderAll();
  });

  return { canvasRef, addText };
}
