import { create } from "zustand";
import { ChessBoard, ChessPiece, ChessSquare } from "../types";

interface ChessStore {
  board: ChessBoard;
  activePiece: ChessPiece | null;
  mode: "view" | "edit" | "check";
  boardKey: string | null; // ? key for saving/loading boards
  errorSquares: ChessSquare[]; // ? to track differences between boards
  totalPieces: number;
  setMode: (mode: "view" | "edit" | "check") => void;
  setBoard: (newPosition: ChessBoard) => void;
  resetBoard: () => void;
  setActivePiece: (piece: ChessPiece | null) => void;
  setBoardKey: (key: string | null) => void;
  setErrorSquares: (squares: ChessSquare[]) => void;
  setTotalPieces: (total: number) => void;
}

const board: ChessBoard = {
  a1: "wR",
  b1: "wN",
  c1: "wB",
  d1: "wQ",
  e1: "wK",
  f1: "wB",
  g1: "wN",
  h1: "wR",
  a2: "wP",
  b2: "wP",
  c2: "wP",
  d2: "wP",
  e2: "wP",
  f2: "wP",
  g2: "wP",
  h2: "wP",
  a8: "bR",
  b8: "bN",
  c8: "bB",
  d8: "bQ",
  e8: "bK",
  f8: "bB",
  g8: "bN",
  h8: "bR",
  a7: "bP",
  b7: "bP",
  c7: "bP",
  d7: "bP",
  e7: "bP",
  f7: "bP",
  g7: "bP",
  h7: "bP",
} as const;

export const useChessStore = create<ChessStore>((set) => ({
  board,
  activePiece: null,
  mode: "view",
  boardKey: null,
  errorSquares: [],
  totalPieces: 10,
  resetBoard: () => set({ board }),
  setBoard: (newPosition: ChessBoard) => set({ board: newPosition }),
  setActivePiece: (piece: ChessPiece | null) => set({ activePiece: piece }),
  setMode: (mode: "view" | "edit" | "check") => set({ mode }),
  setBoardKey: (key: string | null) => set({ boardKey: key }),
  setErrorSquares: (squares: ChessSquare[]) => set({ errorSquares: squares }),
  setTotalPieces: (total: number) => set({ totalPieces: total ? total : 1 }),
}));
