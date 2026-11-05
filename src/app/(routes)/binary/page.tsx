import { GamePage } from "@/components/layouts/game-page";
import NumberBoard from "@/features/binary/ui/number-board";
import NumberControls from "@/features/binary/ui/number-controls";

export default function BinaryPage() {
  return (
    <GamePage
      title="Binary"
      description="Study a stream of zeroes and ones, then recall the pattern."
      tone="purple"
      board={<NumberBoard />}
      controls={<NumberControls />}
    />
  );
}
