"use client";
import { MemeCanvas, useMemeCanvas } from "@/components/MemeCanvas";
import { MemeTemplatePicker } from "@/components/MemeTemplatePicker";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { MemeTemplate } from "@/types";
const MEME_URL = "https://i.imgur.com/tDspe1M.jpeg";
const OLD_MAN = "https://i.imgur.com/UukQHgi.jpeg";

const NOT_COOL_BRO = "https://i.imgur.com/UonYUnV.jpeg";
const DISTRACTED_BOYFRIEND = "https://i.imgur.com/Ms9LoaS.jpeg";
const templates: MemeTemplate[] = [
  {
    id: "1",
    url: MEME_URL,

    description: "Drake Hotline Bling",
    texts: [
      { content: "Hello World", x: 0.75, y: 0.25 },
      { content: "Wazzup World", x: 0.75, y: 0.75 },
    ],
  },
  {
    id: "2",
    url: OLD_MAN,
    description: "Man Slamming Card on Table",
    texts: [
      { content: "Hello", x: 0.55, y: 0.07 },
      { content: "World", x: 0.3, y: 0.8 },
    ],
  },
  {
    id: "3",
    url: NOT_COOL_BRO,
    description: "Not Cool Bro",
    texts: [
      { content: "Hello", x: 0.3, y: 0.3 },
      { content: "World", x: 0.3, y: 0.8 },
    ],
  },
  {
    id: "4",
    url: DISTRACTED_BOYFRIEND,
    description: "Distracted Boyfriend",
    texts: [
      { content: "Hello", x: 0.63, y: 0.5 },
      { content: "World", x: 0.3, y: 0.8 },
    ],
  },
];

const Home = () => {
  const { canvasRef, memeTemplate, setMemeTemplate } = useMemeCanvas();
  return (
    <main className="container mx-auto min-h-screen max-w-screen-lg space-y-4 bg-gray-900 px-4 py-8 text-gray-100">
      <h1 className="py-2 text-center text-4xl">Meme Generator</h1>
      <Card className="col-span-2">
        <CardContent className="grid grid-cols-2 gap-3 divide-x divide-gray-800 py-4">
          <div
            className={cn("col-span-1 flex items-center justify-center", {
              "bg-gray-300/30": !memeTemplate,
            })}
          >
            <h1 className="absolute text-xl">Select a template</h1>
            <MemeCanvas ref={canvasRef} />
          </div>
          <div className="px-5">
            <MemeTemplatePicker
              activeTemplate={memeTemplate}
              templates={templates}
              onSelect={setMemeTemplate}
            />
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
export default Home;
