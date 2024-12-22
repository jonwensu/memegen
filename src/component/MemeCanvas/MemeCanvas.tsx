"use client";
import type { RefAttributes } from "react";

export const MemeCanvas = (props: RefAttributes<HTMLCanvasElement>) => {
  return <canvas {...props} />;
};
