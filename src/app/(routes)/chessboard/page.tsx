import { GamePage } from "@/components/layouts/game-page";
import Board from "@/features/chessboard/ui/board";
import BoardControl from "@/features/chessboard/ui/board-control";

export default function ChessboardPage() {
  return (
    <GamePage
      title="Chessboard"
      description="Study a set of piece positions, then place them from memory."
      tone="mint"
      board={<Board />}
      controls={<BoardControl />}
    />
  );
}
