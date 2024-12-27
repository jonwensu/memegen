"use client";
import { MemeCanvas, useMemeCanvas } from "@/components/MemeCanvas";
import { MemeTemplatePicker } from "@/components/MemeCanvas/MemeTemplatePicker";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { MemeTemplate } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Copy, Trash } from "lucide-react";
import { toast } from "sonner";

const Home = () => {
  const { data } = useQuery({
    queryKey: ["memeTemplates"],
    queryFn: async () => {
      const response = await fetch(
        "https://memegen-be.fly.dev/api/collections/meme_template/records",
      );
      const json = await response.json();
      return json.items as MemeTemplate[];
    },
  });
  const {
    canvasRef,
    memeTemplate,
    setMemeTemplate,
    textboxes,
    removeObject,
    addText,
    updateTextbox,
    download,
    copy,
    reset,
  } = useMemeCanvas();

  const handleCopyCanvas = async () => {
    const isSuccess = await copy();
    if (isSuccess) {
      toast.success("Copied to clipboard", {
        richColors: true,
        duration: 1000,
      });
    }
  };

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
                templates={data ?? []}
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
                        size="icon"
                      >
                        <Trash />
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
            {memeTemplate && (
              <div className="mb-5 mt-10 flex justify-between">
                <div className="flex items-center divide-x divide-blue-400">
                  <Button
                    onClick={download}
                    className="rounded-none rounded-l-md bg-blue-500 text-white hover:bg-blue-400 active:bg-blue-600"
                  >
                    Generate
                  </Button>
                  <Button
                    onClick={handleCopyCanvas}
                    className="rounded-none rounded-r-md bg-blue-500 text-white hover:bg-blue-400 active:bg-blue-600"
                  >
                    <Copy />
                  </Button>
                </div>
                <Button onClick={reset} variant="outline">
                  Reset
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
export default Home;
