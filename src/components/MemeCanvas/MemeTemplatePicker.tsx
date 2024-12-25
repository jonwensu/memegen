import type { MemeTemplate } from "@/types";
import Image from "next/image";
import { cn } from "@/lib/utils";

type MemeTemplatePickerProps = {
  templates: MemeTemplate[];
  onSelect: (template: MemeTemplate) => void;
  activeTemplate?: MemeTemplate;
  className?: string;
};
export const MemeTemplatePicker = ({
  templates,
  activeTemplate,
  onSelect,
}: MemeTemplatePickerProps) => {
  return (
    <div>
      <div className="p-2">
        <div className="space-y-3">
          <h1 className="text-2xl text-white">Pick a meme template</h1>
          <div className="flex gap-3">
            {templates.map((template, index) => (
              <div
                key={index}
                className={cn(
                  "relative aspect-square w-10 cursor-pointer overflow-hidden rounded-md border-2 transition-all",
                  {
                    "scale-125 transform border border-white shadow-md shadow-white":
                      activeTemplate?.id === template.id,
                  },
                )}
                onClick={() => onSelect(template)}
              >
                <Image
                  alt="Template"
                  src={template.url}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
