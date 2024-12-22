import type { Ref } from "react";
import type { Canvas as FabricCanvas, TextboxProps, TOptions } from "fabric";

export type TextboxConfig = Partial<
  Pick<
    TOptions<TextboxProps>,
    | "fontSize"
    | "fill"
    | "stroke"
    | "strokeWidth"
    | "fontFamily"
    | "fill"
    | "fontWeight"
    | "charSpacing"
    | "shadow"
  >
> & {
  content: string;
  x?: number;
  y?: number;
  allCaps?: boolean;
};

export type MemeTemplate = { url: string; texts?: TextboxConfig[] };

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
