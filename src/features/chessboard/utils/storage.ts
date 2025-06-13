import { Storage } from "@/utils/StorageManager";
import { ChessBoard } from "../types";

const BOARD_STORAGE = "savedBoards";

const boardStorage = new Storage<ChessBoard>(BOARD_STORAGE);

export const saveBoard = (board: ChessBoard) => {
  const key = boardStorage.saveWithTimestamp(board);

  return key;
};

export const getSavedBoards = (): Record<string, ChessBoard> | null => {
  const boards = boardStorage.getAll();

  return boards;
};

export const getBoard = (key: string): ChessBoard | null => {
  const board = boardStorage.getItem(key);

  return board;
};

export const replaceBoards = (boards: Record<string, ChessBoard>) => {
  boardStorage.replaceAll(boards);
};
