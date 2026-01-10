import HistoryList from "@/components/blocks/history-list";
import Logger from "@/utils/logger";
import { useEffect, useState } from "react";
import { useNumberStore } from "../hooks/use-number-store";
import { getSavedBins, replaceBins } from "../utils/storage";

const NumberHistory = () => {
  const [nums, setNums] = useState<Record<string, string> | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const activeKey = useNumberStore((s) => s.activeKey);
  const setGenerated = useNumberStore((s) => s.setGeneratedNumbers);
  const setActiveKey = useNumberStore((s) => s.setActiveKey);

  useEffect(() => {
    const savedNums = getSavedBins();
    if (savedNums) {
      setNums(savedNums);
    } else {
      Logger.info("NumberHistory", "No saved nums found.");
    }
  }, []);

  const refreshNums = () => {
    const nums = getSavedBins();
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

    replaceBins(newNums);
    refreshNums();
  };

  const keys = nums ? Object.keys(nums) : [];

  keys.sort((a, b) => {
    return Number(b) - Number(a); // Sort in descending order
  });

  return (
    <HistoryList
      title="Saved History"
      items={keys.map((k) => ({ id: k, isActive: k === activeKey }))}
      onLoad={handleLoad}
      onDelete={handleDelete}
      onRefresh={() => {
        setRefreshing(true);
        refreshNums();
        setTimeout(() => setRefreshing(false), 1000);
      }}
      refreshing={refreshing}
    />
  );
};

export default NumberHistory;
