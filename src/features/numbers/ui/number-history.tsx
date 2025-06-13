import { fromDate } from "@/utils/day";
import { Encoder } from "@/utils/Encoder";
import Logger from "@/utils/logger";
import { cn } from "@/utils/tailwind";
import { LoaderIcon, RotateCwIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNumberStore } from "../hooks/use-number-store";
import { getSavedNums, replaceNums } from "../utils/storage";

const NumberHistory = () => {
  const [nums, setNums] = useState<Record<string, string> | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const activeKey = useNumberStore((s) => s.activeKey);
  const setGenerated = useNumberStore((s) => s.setGeneratedNumbers);
  const setActiveKey = useNumberStore((s) => s.setActiveKey);

  useEffect(() => {
    const savedNums = getSavedNums();
    if (savedNums) {
      setNums(savedNums);
    } else {
      Logger.info("NumberHistory", "No saved nums found.");
    }
  }, []);

  const refreshNums = () => {
    const nums = getSavedNums();
    setNums(nums);
  };

  const handleLoad = (key: string) => {
    if (!nums) {
      Logger.info("NumberHistory", "No nums available to load.");
      return;
    }

    const loadedNum = nums[key];
    if (!loadedNum) {
      Logger.info("NumberHistory", `No num found for key: ${key}`);
      return;
    }

    setGenerated(loadedNum.split(""));
    setActiveKey(key);
  };

  const handleDelete = (key: string) => {
    const newNums = { ...nums };
    delete newNums[key];

    replaceNums(newNums);
    refreshNums();
  };

  const keys = nums ? Object.keys(nums) : [];

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
            refreshNums();
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

export default NumberHistory;
