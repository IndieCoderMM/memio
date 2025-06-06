import { BoardSetting, ChessBoard } from "../types";

const BOARD_STORE = "savedBoards";
const BOARD_SETTINGS = "boardSettings";

export const saveSettings = (settings: BoardSetting) => {
  localStorage.setItem(BOARD_SETTINGS, JSON.stringify(settings));
};

export const getSettings = (): BoardSetting | null => {
  const settings = localStorage.getItem(BOARD_SETTINGS);
  if (!settings) {
    return null;
  }

  return JSON.parse(settings);
};

export const saveBoard = (board: ChessBoard) => {
  const key = Date.now().toString();
  const boardString = JSON.stringify(board);
  const existingBoards = localStorage.getItem(BOARD_STORE);

  if (existingBoards) {
    const boards = JSON.parse(existingBoards);
    boards[key] = boardString;
    localStorage.setItem(BOARD_STORE, JSON.stringify(boards));
  } else {
    localStorage.setItem(BOARD_STORE, JSON.stringify({ [key]: boardString }));
  }

  return key;
};

export const getSavedBoards = (): Record<string, string> | null => {
  const savedBoards = localStorage.getItem(BOARD_STORE);
  if (!savedBoards) {
    return null;
  }

  const boards = JSON.parse(savedBoards);

  return boards;
};

export const getBoard = (key: string): ChessBoard | null => {
  const boards = getSavedBoards();
  if (!boards || !boards[key]) {
    return null;
  }

  const boardString = boards[key];
  return JSON.parse(boardString);
};

export const replaceBoards = (boards: Record<string, string>) => {
  localStorage.setItem(BOARD_STORE, JSON.stringify(boards));
};
