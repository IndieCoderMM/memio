import { GamePage } from "@/components/layouts/game-page";
import NumberBoard from "@/features/binary/ui/number-board";
import NumberControls from "@/features/binary/ui/number-controls";
import NumberCheckResult from "@/features/binary/ui/number-check-result";
import NumberHistory from "@/features/binary/ui/number-history";
import NumberStatus from "@/features/binary/ui/number-status";

export default function BinaryPage() {
  return (
    <GamePage
      title="Binary"
      description="Study a stream of zeroes and ones, then recall the pattern."
      board={<NumberBoard />}
      controls={<NumberControls />}
      mode={<NumberStatus />}
      history={<NumberHistory />}
      result={<NumberCheckResult />}
    />
  );
}
