import { ChessBoard } from "../types";

const KEY = "savedBoards";

export const saveBoard = (board: ChessBoard) => {
  const key = Date.now().toString();
  const boardString = JSON.stringify(board);
  const existingBoards = localStorage.getItem(KEY);

  if (existingBoards) {
    const boards = JSON.parse(existingBoards);
    boards[key] = boardString;
    localStorage.setItem(KEY, JSON.stringify(boards));
  } else {
    localStorage.setItem(KEY, JSON.stringify({ [key]: boardString }));
  }

  return key;
};

export const getBoard = (key: string): ChessBoard | null => {
  const savedBoards = localStorage.getItem(KEY);
  if (!savedBoards) {
    return null;
  }

  const boards = JSON.parse(savedBoards);
  const boardString = boards[key];

  if (boardString) {
    return JSON.parse(boardString);
  }

  return null;
};
