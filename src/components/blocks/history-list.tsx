import { fromDate } from "@/utils/day";
import { Encoder } from "@/utils/Encoder";
import { cn } from "@/utils/tailwind";
import { LoaderIcon, RotateCwIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

interface HistoryItemData {
  id: string;
  isActive: boolean;
}

interface HistoryListProps {
  title: string;
  items: HistoryItemData[];
  onLoad: (id: string) => void;
  onDelete: (id: string) => void;
  onRefresh: () => void;
  refreshing: boolean;
}

const HistoryList: React.FC<HistoryListProps> = ({
  title,
  items,
  onLoad,
  onDelete,
  onRefresh,
  refreshing,
}) => {
  return (
    <div className="border-border bg-muted flex flex-col justify-between border p-2">
      <div className="mb-1 flex w-full items-center justify-between">
        <h2 className="text-md">
          <span className="text-muted-foreground font-semibold">{title}</span>
        </h2>
        <Button
          onClick={onRefresh}
          aria-label="Refresh history"
          title="Refresh history"
          size="icon"
          variant="ghost"
        >
          {refreshing ? (
            <LoaderIcon className="inline h-5 w-5 animate-spin" />
          ) : (
            <RotateCwIcon className="inline h-5 w-5" />
          )}
        </Button>
      </div>
      <ul className="flex max-h-[200px] min-h-[150px] flex-col gap-2 overflow-y-auto rounded-sm">
        {items?.map((item) => (
          <li key={item.id}>
            <HistoryItem
              id={item.id}
              isActive={item.isActive}
              handleLoad={onLoad}
              handleDelete={onDelete}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

const HistoryItem = ({
  id,
  isActive,
  handleLoad,
  handleDelete,
}: {
  id: string;
  isActive: boolean;
  handleLoad: (key: string) => void;
  handleDelete: (key: string) => void;
}) => {
  const date = new Date(Number(id));
  return (
    <div
      className={cn(
        "bg-muted border-border group flex items-center justify-between border px-2 py-1",
        isActive ? "border-accent border-2" : "hover:brightness-105",
      )}
    >
      <div className="pl-1">
        <Button
          onClick={() => handleLoad(id)}
          className={cn(
            "text-accent-green hover:text-primary pl-0 text-left font-mono text-lg underline",
            isActive && "text-accent",
          )}
          aria-label={`View board`}
          title={`View board`}
          variant="link"
        >
          {Encoder.encodeId(Number(id))}
        </Button>
        <span className="text-foreground/80 block text-xs">
          {fromDate(date)}
        </span>
      </div>
      <Button
        onClick={() => handleDelete(id)}
        aria-label="Delete board"
        title="Delete board"
        variant="ghost"
        className="hover:bg-destructive text-muted-foreground invisible group-hover:visible"
        size="icon"
      >
        <Trash2Icon />
      </Button>
    </div>
  );
};

export default HistoryList;
