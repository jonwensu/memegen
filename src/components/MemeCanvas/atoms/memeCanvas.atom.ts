import type { Canvas } from "fabric";
import { atom } from "jotai";
import type { RefObject } from "react";

export const memeCanvasAtom = atom<RefObject<Canvas>>();
