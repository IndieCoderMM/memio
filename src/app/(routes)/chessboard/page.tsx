import { GamePage } from "@/components/layouts/game-page";
import Board from "@/features/chessboard/ui/board";
import BoardControl from "@/features/chessboard/ui/board-control";
import BoardHistory from "@/features/chessboard/ui/board-history";
import BoardStatus from "@/features/chessboard/ui/board-status";
import CheckResult from "@/features/chessboard/ui/check-result";

export default function ChessboardPage() {
  return (
    <GamePage
      title="Chessboard"
      description="Study a set of piece positions, then place them from memory."
      board={<Board />}
      controls={<BoardControl />}
      mode={<BoardStatus />}
      history={<BoardHistory />}
      result={<CheckResult />}
    />
  );
}
