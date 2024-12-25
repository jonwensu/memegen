"use client";
import { MemeCanvas, useMemeCanvas } from "@/components/MemeCanvas";
import { MemeTemplatePicker } from "@/components/MemeCanvas/MemeTemplatePicker";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { MemeTemplate } from "@/types";
import { Copy } from "lucide-react";

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
  const {
    canvasRef,
    memeTemplate,
    setMemeTemplate,
    textboxes,
    removeObject,
    addText,
    updateTextbox,
  } = useMemeCanvas();
  return (
    <main className="container mx-auto min-h-screen max-w-screen-lg space-y-4 bg-gray-900 py-8 text-gray-100">
      <h1 className="py-2 text-center text-4xl">Meme Generator</h1>
      <Card className="col-span-2">
        <CardContent className="grid grid-cols-1 gap-3 divide-y divide-gray-800 p-0 py-4 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <div
            className={cn("flex items-center justify-center", {
              "bg-gray-300/30": !memeTemplate,
            })}
          >
            <h1 className="absolute text-xl">Select a template</h1>
            <MemeCanvas ref={canvasRef} />
          </div>
          <div className="flex flex-col justify-between px-4">
            <div className="my-5 flex flex-col gap-3">
              <MemeTemplatePicker
                activeTemplate={memeTemplate}
                templates={templates}
                onSelect={setMemeTemplate}
              />
              <div className="flex max-h-80 flex-col gap-2 overflow-y-auto py-2">
                {textboxes.map((textbox, index) => (
                  <div key={index}>
                    <Label>Textbox #{index + 1}</Label>
                    <div className="flex gap-2">
                      <Input
                        className="bg-white text-black"
                        value={textbox.text}
                        onChange={(event) => {
                          updateTextbox(index, event.target.value);
                        }}
                      />
                      <Button
                        variant="destructive"
                        onClick={() => removeObject(textbox)}
                      >
                        X
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              {memeTemplate && (
                <Button
                  className="self-end"
                  size="sm"
                  variant="outline"
                  onClick={() => addText("Sample")}
                >
                  Add Text
                </Button>
              )}
            </div>

            <div className="mb-5 mt-10 flex justify-between">
              <div className="flex items-center divide-x divide-green-400">
                <Button className="rounded-none rounded-l-md bg-green-500 text-white hover:bg-green-700">
                  Download
                </Button>
                <Button className="rounded-none rounded-r-md bg-green-500 text-white hover:bg-green-700">
                  <Copy />
                </Button>
              </div>
              <Button variant="outline">Reset</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
export default Home;
