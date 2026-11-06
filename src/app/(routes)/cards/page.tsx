import { GamePage } from "@/components/layouts/game-page";
import CardBoard from "@/features/cards/ui/board";
import CardControls from "@/features/cards/ui/controls";
import DeckHistory from "@/features/cards/ui/history";
import DeckCheckResult from "@/features/cards/ui/result";
import Status from "@/features/cards/ui/status";

export default function CardsPage() {
  return (
    <GamePage
      title="Cards"
      description="Study a shuffled deck, then recall its order."
      board={<CardBoard />}
      controls={<CardControls />}
      mode={<Status />}
      history={<DeckHistory />}
      result={<DeckCheckResult />}
    />
  );
}
