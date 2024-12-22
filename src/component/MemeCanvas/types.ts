import type { Ref } from "react";
import type { Canvas as FabricCanvas } from "fabric";

export type MemeCanvasProps = {
  ref: Ref<HTMLCanvasElement>;
  template?: string;
  width?: number;
  height?: number;
};

export type FabricHandler<Args extends unknown[], Return> = (
  canvas: FabricCanvas,
  ...args: Args
) => Return;
