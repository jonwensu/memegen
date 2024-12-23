import type { TextboxProps, TOptions } from "fabric";

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
    | "textAlign"
  >
> & {
  content: string;
  x?: number;
  y?: number;
  allCaps?: boolean;
};

export type MemeTemplate = {
  id: string;
  url: string;
  texts?: TextboxConfig[];
};
