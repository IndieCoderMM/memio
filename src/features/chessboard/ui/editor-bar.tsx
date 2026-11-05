"use client";

import { Stack } from "@/components/pouf/layout";
import { Text } from "@/components/pouf/text";
import { BoxSelectIcon, BrushCleaningIcon, EraserIcon } from "lucide-react";
import PieceButton from "../blocks/piece-button";
import { useChessStore } from "../hooks/use-chess-store";
import { ChessPiece } from "../types";

type Button = {
  piece: ChessPiece;
  label: string;
  color?: "white" | "black";
};

type Buttons = {
  white: Button[];
  black: Button[];
};

const buttons: Buttons = {
  white: [
    { piece: "wK", label: "King" },
    { piece: "wQ", label: "Queen" },
    { piece: "wR", label: "Rook" },
    { piece: "wB", label: "Bishop" },
    { piece: "wN", label: "Knight" },
    { piece: "wP", label: "Pawn" },
  ],
  black: [
    { piece: "bK", label: "King", color: "black" },
    { piece: "bQ", label: "Queen", color: "black" },
    { piece: "bR", label: "Rook", color: "black" },
    { piece: "bB", label: "Bishop", color: "black" },
    { piece: "bN", label: "Knight", color: "black" },
    { piece: "bP", label: "Pawn", color: "black" },
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
    <Stack gap={3}>
      <section className="flex flex-col gap-(--s2)">
        <Text size="sm" muted>
          White pieces
        </Text>
        <div className="grid grid-cols-3 gap-(--s2) sm:grid-cols-6">
          {buttons.white.map(({ piece, label }) => (
            <PieceButton
              key={piece}
              onClick={handlePieceClick(piece)}
              isActive={activePiece === piece}
            >
              {label}
            </PieceButton>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-(--s2)">
        <Text size="sm" muted>
          Black pieces
        </Text>
        <div className="grid grid-cols-3 gap-(--s2) sm:grid-cols-6">
          {buttons.black.map(({ piece, label }) => (
            <PieceButton
              key={piece}
              onClick={handlePieceClick(piece)}
              color="black"
              isActive={activePiece === piece}
            >
              {label}
            </PieceButton>
          ))}
        </div>
      </section>
      <div className="grid grid-cols-1 gap-(--s2) sm:grid-cols-3">
        <PieceButton onClick={() => setActivePiece(null)} color="black">
          <BoxSelectIcon className="h-4 w-4" />
          Unselect
        </PieceButton>
        <PieceButton
          onClick={() => setActivePiece("eraser")}
          color="black"
          isActive={activePiece === "eraser"}
        >
          <EraserIcon className="h-4 w-4" />
          Eraser
        </PieceButton>
        <PieceButton
          onClick={() => setBoard({})}
          color="black"
        >
          <BrushCleaningIcon className="h-4 w-4" />
          Reset
        </PieceButton>
      </div>
    </Stack>
  );
};

export default EditorBar;
