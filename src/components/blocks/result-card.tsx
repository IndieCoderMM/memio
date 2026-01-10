import { LucideIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";

const ResultCard = ({
  title,
  stats,
  onClose,
}: {
  title: string;
  stats: { icon: LucideIcon; title: string; value: number | string }[];
  onClose: () => void;
}) => {
  return (
    <div className="border-border bg-muted flex flex-col justify-between border">
      <div className="text-foreground mb-1 flex w-full items-center justify-between px-2 py-2 font-semibold">
        <h2 className="text-md">
          <span>{title}</span>
        </h2>
        <Button
          onClick={onClose}
          aria-label="Refresh history"
          title="Refresh history"
          size="icon-sm"
          variant="destructive"
        >
          <XIcon className="inline h-5 w-5" />
        </Button>
      </div>
      <div className="flex max-h-[300px] min-h-[250px] flex-col justify-around gap-2 overflow-y-auto p-4 pb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="text-muted-foreground/80 flex w-full items-center justify-between"
          >
            <div className="flex size-8 items-center justify-center border">
              <stat.icon className="h-6 w-6" />
            </div>
            <div className="p-2">
              <span className="text-lg">{stat.title}</span>
            </div>
            <span className="ml-auto text-xl font-semibold">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultCard;
