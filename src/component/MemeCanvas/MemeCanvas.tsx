"use client";
import { useMemeCanvas } from "./hooks/memeCanvas.hook";
import type { MemeCanvasProps } from "./types";

export const MemeCanvas = () => {
  const { canvasRef, addText } = useMemeCanvas();
  return (
    <>
      <canvas ref={canvasRef} />;
      <button
        onClick={() => {
          addText("test");
        }}
      >
        Add Text
      </button>
    </>
  );
};
