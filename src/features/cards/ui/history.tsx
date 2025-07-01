import { fromDate } from "@/utils/day";
import { Encoder } from "@/utils/Encoder";
import Logger from "@/utils/logger";
import { cn } from "@/utils/tailwind";
import { LoaderIcon, RotateCwIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useCardStore } from "../hooks/use-card-store";
import { Deck } from "../types";
import { getSavedDecks, replaceDecks } from "../utils/storage";

const DeckHistory = () => {
  const [decks, setDecks] = useState<Record<string, Deck> | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const activeKey = useCardStore((s) => s.activeKey);
  const setGenerated = useCardStore((s) => s.setGeneratedCards);
  const setActiveKey = useCardStore((s) => s.setActiveKey);

  useEffect(() => {
    const savedDecks = getSavedDecks();
    if (savedDecks) {
      setDecks(savedDecks);
    } else {
      Logger.info("DeckHistory", "No saved nums found.");
    }
  }, []);

  const refreshDecks = () => {
    const nums = getSavedDecks();
    setDecks(nums);
  };

  const handleLoad = (key: string) => {
    if (!decks) {
      Logger.info("NumberHistory", "No nums available to load.");
      return;
    }

    const loadedNum = decks[key];
    if (!loadedNum) {
      Logger.info("NumberHistory", `No num found for key: ${key}`);
      return;
    }

    setGenerated(loadedNum);
    setActiveKey(key);
  };

  const handleDelete = (key: string) => {
    const newDecks = { ...decks };
    delete newDecks[key];

    replaceDecks(newDecks);
    refreshDecks();
  };

  const keys = decks ? Object.keys(decks) : [];

  keys.sort((a, b) => {
    return Number(b) - Number(a); // Sort in descending order
  });

  return (
    <div className="flex flex-col justify-between">
      <div className="mb-1 flex w-full items-center justify-between px-2">
        <h2 className="text-md">
          <span className="text-text-muted">Saved History</span>
        </h2>
        <button
          onClick={() => {
            setRefreshing(true);
            refreshDecks();
            setTimeout(() => {
              setRefreshing(false);
            }, 1000);
          }}
          className="text-accent-green cursor-pointer underline transition-transform hover:brightness-125"
          aria-label="Refresh history"
          title="Refresh history"
        >
          {refreshing ? (
            <LoaderIcon className="inline h-5 w-5 animate-spin" />
          ) : (
            <RotateCwIcon className="inline h-5 w-5" />
          )}
        </button>
      </div>
      <ul className="bg-surface flex max-h-[300px] min-h-[250px] flex-col gap-2 overflow-y-auto rounded-sm p-2">
        {keys?.map((k) => {
          return (
            <li key={k}>
              <HistoryItem
                id={k}
                isActive={k === activeKey}
                handleLoad={handleLoad}
                handleDelete={handleDelete}
              />
            </li>
          );
        })}
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
        "bg-elevated flex items-center justify-between rounded-sm px-2 py-1",
        isActive
          ? "border-accent-yellow/30 border shadow-md"
          : "shadow-sm hover:brightness-110",
      )}
    >
      <div>
        <button
          onClick={() => handleLoad(id)}
          className="text-accent-green cursor-pointer font-mono text-lg underline hover:brightness-125"
          aria-label={`View board`}
          title={`View board`}
        >
          {Encoder.encodeId(Number(id))}
        </button>
        <span className="text-text-muted/80 block text-xs">
          {fromDate(date)}
        </span>
      </div>
      <button
        className="text-accent-red cursor-pointer hover:brightness-125"
        onClick={() => handleDelete(id)}
        aria-label="Delete board"
        title="Delete board"
      >
        <Trash2Icon />
      </button>
    </div>
  );
};

export default DeckHistory;
