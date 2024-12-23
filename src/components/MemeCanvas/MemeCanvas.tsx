"use client";
import type { RefAttributes } from "react";

export const MemeCanvas = (props: RefAttributes<HTMLCanvasElement>) => {
  return (
    <div className="flex justify-center">
      <canvas {...props} />
    </div>
  );
};
