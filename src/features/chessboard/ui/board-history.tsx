"use client";

import HistoryList from "@/components/blocks/history-list";
import Logger from "@/utils/logger";
import { useEffect, useState } from "react";
import { useChessStore } from "../hooks/use-chess-store";
import { ChessBoard } from "../types";
import { getSavedBoards, replaceBoards } from "../utils/storage";

const BoardHistory = () => {
  const [boards, setBoards] = useState<Record<string, ChessBoard> | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const activeKey = useChessStore((state) => state.boardKey);

  const setActivePiece = useChessStore((state) => state.setActivePiece);
  const setBoard = useChessStore((state) => state.setBoard);
  const setMode = useChessStore((state) => state.setMode);
  const setBoardKey = useChessStore((state) => state.setBoardKey);
  const setErrorSquares = useChessStore((state) => state.setErrorSquares);

  useEffect(() => {
    const initialBoards = getSavedBoards();
    if (initialBoards) {
      setBoards(initialBoards);
    } else {
      Logger.info("BoardHistory", "No saved boards found.");
    }
  }, []);

  const refreshBoards = () => {
    const updatedBoards = getSavedBoards();
    setBoards(updatedBoards);
  };

  const handleLoad = (key: string) => {
    if (!boards) {
      Logger.error("BoardHistory", "No boards available to load.");
      return;
    }

    const recalledBoard = boards[key];
    if (!recalledBoard) {
      Logger.error("BoardHistory", `No board found for key: ${key}`);
      return;
    }

    // Set the board state
    setBoard(recalledBoard);
    setMode("view");
    setActivePiece(null);
    setErrorSquares([]);
    setBoardKey(key);
  };

  const handleDelete = (key: string) => {
    const newBoards = { ...boards };
    delete newBoards[key];

    replaceBoards(newBoards);
    refreshBoards();
  };

  const keys = boards ? Object.keys(boards) : [];

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
        refreshBoards();
        setTimeout(() => {
          setRefreshing(false);
        }, 1000); // Simulate a short loading time
      }}
      refreshing={refreshing}
    />
  );
};

export default BoardHistory;
