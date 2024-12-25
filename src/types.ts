import { type TextboxProps, type TOptions } from "fabric";

export type WithId<T> = T & { id: string };

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
    | "originX"
    | "originY"
    | "left"
    | "top"
  >
> &
  WithId<{
    content: string;
    x?: number;
    y?: number;
    allCaps?: boolean;
  }>;

export type MemeTemplate = WithId<{
  description: string;
  url: string;
  texts?: Omit<TextboxConfig, "id">[];
}>;
