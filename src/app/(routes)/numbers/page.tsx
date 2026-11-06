import { GamePage } from "@/components/layouts/game-page";
import NumberBoard from "@/features/numbers/ui/number-board";
import NumberControls from "@/features/numbers/ui/number-controls";
import NumberCheckResult from "@/features/numbers/ui/number-check-result";
import NumberHistory from "@/features/numbers/ui/number-history";
import NumberStatus from "@/features/numbers/ui/number-status";

export default function NumberPage() {
  return (
    <GamePage
      title="Numbers"
      description="Memorize a sequence, then recall it one digit at a time."
      board={<NumberBoard />}
      controls={<NumberControls />}
      mode={<NumberStatus />}
      history={<NumberHistory />}
      result={<NumberCheckResult />}
    />
  );
}
