"use client";

import HistoryList from "@/components/blocks/history-list";
import { useCloseGameDialog } from "@/components/layouts/game-dialog";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useChessStore } from "../hooks/use-chess-store";
import { ChessBoard } from "../types";
import { deleteBoard, getSavedBoards } from "../utils/storage";

const BoardHistory = () => {
  const [boards, setBoards] = useState<Record<string, ChessBoard>>({});
  const [refreshing, setRefreshing] = useState(true);
  const activeKey = useChessStore((state) => state.boardKey);
  const setActivePiece = useChessStore((state) => state.setActivePiece);
  const setBoard = useChessStore((state) => state.setBoard);
  const setMode = useChessStore((state) => state.setMode);
  const setBoardKey = useChessStore((state) => state.setBoardKey);
  const setErrorSquares = useChessStore((state) => state.setErrorSquares);
  const closeHistory = useCloseGameDialog();

  const refreshBoards = useCallback(async () => {
    setRefreshing(true);
    try {
      setBoards(await getSavedBoards());
    } catch {
      toast.error("Saved chessboard history could not be loaded.");
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void refreshBoards();
  }, [refreshBoards]);

  const handleLoad = (key: string) => {
    const recalledBoard = boards[key];
    if (!recalledBoard) return;

    setBoard(recalledBoard);
    setMode("view");
    setActivePiece(null);
    setErrorSquares([]);
    setBoardKey(key);
    closeHistory();
  };

  const handleDelete = async (key: string) => {
    try {
      await deleteBoard(key);
      setBoards(await getSavedBoards());
    } catch {
      toast.error("Saved chessboard could not be deleted.");
    }
  };

  const keys = Object.keys(boards).sort((a, b) => Number(b) - Number(a));

  return (
    <HistoryList
      title="Saved History"
      items={keys.map((k) => ({ id: k, isActive: k === activeKey }))}
      onLoad={handleLoad}
      onDelete={handleDelete}
      onRefresh={() => void refreshBoards()}
      refreshing={refreshing}
    />
  );
};

export default BoardHistory;
