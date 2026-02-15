import { CustomPieceFn } from "react-chessboard/dist/chessboard/types";

type PieceId =
  | "wP"
  | "wB"
  | "wN"
  | "wR"
  | "wQ"
  | "wK"
  | "bP"
  | "bN"
  | "bB"
  | "bR"
  | "bQ"
  | "bK";

type PieceTheme = {
  id: string;
  name: string;
  // map of piece id -> URL
  pieces: Record<PieceId, string>;
  raw?: Record<PieceId, string>;
};

const governorTheme: PieceTheme = {
  id: "chess",
  name: "Chess",
  pieces: {
    wP: "assets/chess/governor/wP.svg",
    wB: "assets/chess/governor/wB.svg",
    wN: "assets/chess/governor/wN.svg",
    wR: "assets/chess/governor/wR.svg",
    wQ: "assets/chess/governor/wQ.svg",
    wK: "assets/chess/governor/wK.svg",
    bP: "assets/chess/governor/bP.svg",
    bN: "assets/chess/governor/bN.svg",
    bB: "assets/chess/governor/bB.svg",
    bR: "assets/chess/governor/bR.svg",
    bQ: "assets/chess/governor/bQ.svg",
    bK: "assets/chess/governor/bK.svg",
  },
};

export const boardTheme = {
  lightSquareColor: "#D8D9D8",
  darkSquareColor: "#A8A9A8",
  pieces: getCustomPieces(),
};

function getCustomPieces() {
  const pieces: Record<string, CustomPieceFn> = {};

  Object.entries(governorTheme.pieces).forEach(([pieceId, url]) => {
    pieces[pieceId] = ({ squareWidth }) => {
      return (
        <img
          src={url}
          alt={pieceId}
          width={squareWidth}
          height={squareWidth}
          style={{
            width: squareWidth,
            height: squareWidth,
            objectFit: "contain",
          }}
        />
      );
    };
  });
  return pieces;
}
