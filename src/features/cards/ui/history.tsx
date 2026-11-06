"use client";

import HistoryList from "@/components/blocks/history-list";
import { useCloseGameDialog } from "@/components/layouts/game-dialog";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCardStore } from "../hooks/use-card-store";
import { Deck } from "../types";
import { deleteDeck, getSavedDecks } from "../utils/storage";

const DeckHistory = () => {
  const [decks, setDecks] = useState<Record<string, Deck>>({});
  const [refreshing, setRefreshing] = useState(true);
  const activeKey = useCardStore((s) => s.activeKey);
  const setGenerated = useCardStore((s) => s.setGeneratedCards);
  const setMode = useCardStore((s) => s.setMode);
  const setActiveKey = useCardStore((s) => s.setActiveKey);
  const closeHistory = useCloseGameDialog();

  const refreshDecks = useCallback(async () => {
    setRefreshing(true);
    try {
      setDecks(await getSavedDecks());
    } catch {
      toast.error("Saved card history could not be loaded.");
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void refreshDecks();
  }, [refreshDecks]);

  const handleLoad = (key: string) => {
    const loadedDeck = decks[key];
    if (!loadedDeck) return;

    setGenerated(loadedDeck);
    setMode("view");
    setActiveKey(key);
    closeHistory();
  };

  const handleDelete = async (key: string) => {
    try {
      await deleteDeck(key);
      setDecks(await getSavedDecks());
    } catch {
      toast.error("Saved deck could not be deleted.");
    }
  };

  const keys = Object.keys(decks).sort((a, b) => Number(b) - Number(a));

  return (
    <HistoryList
      title="Saved History"
      refreshing={refreshing}
      items={keys.map((k) => ({ id: k, isActive: k === activeKey }))}
      onLoad={handleLoad}
      onDelete={handleDelete}
      onRefresh={() => void refreshDecks()}
    />
  );
};

export default DeckHistory;
