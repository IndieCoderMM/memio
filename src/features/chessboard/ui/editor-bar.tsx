"use client";

import Button from "@/components/blocks/button";
import { BoxSelectIcon, EraserIcon, TrashIcon } from "lucide-react";
import PieceButton from "../blocks/piece-button";
import { useChessStore } from "../hooks/use-chess-store";
import { ChessPiece } from "../types";

type Button = {
  piece: ChessPiece;
  label: string;
  variant?: "left" | "right" | "middle";
  color?: "white" | "black";
};

type Buttons = {
  white: Button[];
  black: Button[];
};

const buttons: Buttons = {
  white: [
    { piece: "wK", label: "King", variant: "left" },
    { piece: "wQ", label: "Queen" },
    { piece: "wR", label: "Rook" },
    { piece: "wB", label: "Bishop" },
    { piece: "wN", label: "Knight" },
    { piece: "wP", label: "Pawn", variant: "right" },
  ],
  black: [
    { piece: "bK", label: "King", variant: "left", color: "black" },
    { piece: "bQ", label: "Queen", color: "black" },
    { piece: "bR", label: "Rook", color: "black" },
    { piece: "bB", label: "Bishop", color: "black" },
    { piece: "bN", label: "Knight", color: "black" },
    { piece: "bP", label: "Pawn", color: "black", variant: "right" },
  ],
} as const;

const EditorBar = () => {
  const activePiece = useChessStore((state) => state.activePiece);
  const setActivePiece = useChessStore((state) => state.setActivePiece);
  const setBoard = useChessStore((state) => state.setBoard);

  const handlePieceClick = (piece: ChessPiece) => () => {
    setActivePiece(piece);
  };

  return (
    <div className="bg-surface flex flex-col gap-2 rounded-lg p-2">
      <div className="grid grid-cols-6">
        {buttons.white.map(({ piece, label, variant }) => (
          <PieceButton
            key={piece}
            onClick={handlePieceClick(piece)}
            variant={variant || "middle"}
            isActive={activePiece === piece}
          >
            {label}
          </PieceButton>
        ))}
      </div>
      <div className="grid grid-cols-6">
        {buttons.black.map(({ piece, label, variant }) => (
          <PieceButton
            key={piece}
            onClick={handlePieceClick(piece)}
            variant={variant || "middle"}
            color="black"
            isActive={activePiece === piece}
          >
            {label}
          </PieceButton>
        ))}
      </div>
      <div className="grid grid-cols-3">
        <PieceButton
          onClick={() => setActivePiece(null)}
          variant={"left"}
          color="black"
        >
          <BoxSelectIcon className="mr-4 inline h-4 w-4" />
          Unselect
        </PieceButton>
        <PieceButton
          onClick={() => setActivePiece("eraser")}
          variant={"middle"}
          color="black"
          isActive={activePiece === "eraser"}
        >
          <EraserIcon className="mr-4 inline h-4 w-4" />
          Eraser
        </PieceButton>
        <PieceButton
          onClick={() => setBoard({})}
          variant={"right"}
          color="black"
        >
          <TrashIcon className="mr-4 inline h-4 w-4" />
          Reset
        </PieceButton>
      </div>
    </div>
  );
};

export default EditorBar;
