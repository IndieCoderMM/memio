"use client";

import HistoryList from "@/components/blocks/history-list";
import { useCloseGameDialog } from "@/components/layouts/game-dialog";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNumberStore } from "../hooks/use-number-store";
import { deleteBinary, getSavedBins } from "../utils/storage";

const NumberHistory = () => {
  const [nums, setNums] = useState<Record<string, string>>({});
  const [refreshing, setRefreshing] = useState(true);
  const activeKey = useNumberStore((s) => s.activeKey);
  const setGenerated = useNumberStore((s) => s.setGeneratedNumbers);
  const setMode = useNumberStore((s) => s.setMode);
  const setActiveKey = useNumberStore((s) => s.setActiveKey);
  const closeHistory = useCloseGameDialog();

  const refreshNums = useCallback(async () => {
    setRefreshing(true);
    try {
      setNums(await getSavedBins());
    } catch {
      toast.error("Saved binary history could not be loaded.");
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void refreshNums();
  }, [refreshNums]);

  const handleLoad = (key: string) => {
    const loadedNum = nums[key];
    if (!loadedNum) return;

    setGenerated(loadedNum.split(""));
    setMode("view");
    setActiveKey(key);
    closeHistory();
  };

  const handleDelete = async (key: string) => {
    try {
      await deleteBinary(key);
      setNums(await getSavedBins());
    } catch {
      toast.error("Saved binary sequence could not be deleted.");
    }
  };

  const keys = Object.keys(nums).sort((a, b) => Number(b) - Number(a));

  return (
    <HistoryList
      title="Saved History"
      items={keys.map((k) => ({ id: k, isActive: k === activeKey }))}
      onLoad={handleLoad}
      onDelete={handleDelete}
      onRefresh={() => void refreshNums()}
      refreshing={refreshing}
    />
  );
};

export default NumberHistory;
