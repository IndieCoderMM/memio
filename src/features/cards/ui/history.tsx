import HistoryList from "@/components/blocks/history-list";
import Logger from "@/utils/logger";
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
    <HistoryList
      title="Saved History"
      refreshing={refreshing}
      items={keys.map((k) => ({ id: k, isActive: k === activeKey }))}
      onLoad={handleLoad}
      onDelete={handleDelete}
      onRefresh={() => {
        setRefreshing(true);
        refreshDecks();
        setTimeout(() => setRefreshing(false), 1000);
      }}
    />
  );
};

export default DeckHistory;
