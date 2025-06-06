import { create } from "zustand";
import { ChessBoard, ChessPiece, ChessSquare } from "../types";
import { BOARD } from "../utils/constants";

interface ChessStore {
  board: ChessBoard;
  activePiece: ChessPiece | null | "eraser";
  mode: "view" | "edit" | "check";
  boardKey: string | null; // ? key for saving/loading boards
  errorSquares: ChessSquare[]; // ? to track differences between boards
  totalPieces: number;
  setMode: (mode: "view" | "edit" | "check") => void;
  setBoard: (newPosition: ChessBoard) => void;
  resetBoard: () => void;
  setActivePiece: (piece: ChessPiece | null | "eraser") => void;
  setBoardKey: (key: string | null) => void;
  setErrorSquares: (squares: ChessSquare[]) => void;
  setTotalPieces: (total: number) => void;
}

export const useChessStore = create<ChessStore>((set) => ({
  board: BOARD,
  activePiece: null,
  mode: "view",
  boardKey: null,
  errorSquares: [],
  totalPieces: 10,
  resetBoard: () => set({ board: BOARD }),
  setBoard: (newPosition: ChessBoard) => set({ board: newPosition }),
  setActivePiece: (piece: ChessPiece | null | "eraser") =>
    set({ activePiece: piece }),
  setMode: (mode: "view" | "edit" | "check") => set({ mode }),
  setBoardKey: (key: string | null) => set({ boardKey: key }),
  setErrorSquares: (squares: ChessSquare[]) => set({ errorSquares: squares }),
  setTotalPieces: (total: number) => set({ totalPieces: total ? total : 1 }),
}));
