"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Chessboard } from "react-chessboard";
import { CustomSquareStyles } from "react-chessboard/dist/chessboard/types";
import { useChessStore } from "../hooks/use-chess-store";
import { ChessSquare } from "../types";
import { boardTheme } from "../utils/theme";

const Board = () => {
  const boardContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(500);
  const board = useChessStore((state) => state.board);
  const activePiece = useChessStore((state) => state.activePiece);
  const errorSquares = useChessStore((state) => state.errorSquares);
  const setBoard = useChessStore((state) => state.setBoard);

  useEffect(() => {
    const container = boardContainerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      if (entry) setContainerWidth(entry.contentRect.width);
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const handleSquareClick = (square: ChessSquare) => {
    if (!activePiece) return;
    if (activePiece === "eraser") {
      const newBoard = { ...board };
      delete newBoard[square];

      setBoard(newBoard);
      return;
    }

    setBoard({ ...board, [square]: activePiece });
  };

  const squareStyles = useMemo(() => {
    const styles: CustomSquareStyles = {};

    errorSquares.forEach((square) => {
      styles[square] = { border: "2px solid var(--pink)" };
    });

    return styles;
  }, [errorSquares]);

  return (
    <div ref={boardContainerRef} className="mx-auto w-full max-w-[500px]">
      <Chessboard
        onSquareClick={handleSquareClick}
        position={board}
        boardWidth={Math.min(500, Math.floor(containerWidth))}
        allowDragOutsideBoard
        customSquareStyles={squareStyles}
        onPromotionCheck={() => false}
        onPieceDropOffBoard={(square) => {
          const newBoard = { ...board };
          delete newBoard[square];
          setBoard(newBoard);
        }}
        onPieceDrop={(srcSquare, targetSquare, piece) => {
          const newBoard = { ...board };
          delete newBoard[srcSquare];
          newBoard[targetSquare] = piece;

          setBoard(newBoard);

          return true;
        }}
        customLightSquareStyle={{ backgroundColor: boardTheme.lightSquareColor }}
        customDarkSquareStyle={{ backgroundColor: boardTheme.darkSquareColor }}
        customPieces={boardTheme.pieces}
      />
    </div>
  );
};

export default Board;
