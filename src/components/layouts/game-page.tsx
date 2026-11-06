import type { ReactNode } from "react";
import { Grid, Row, Stack } from "@/components/pouf/layout";
import { Card } from "@/components/pouf/surface";
import { Eyebrow, Heading, Text } from "@/components/pouf/text";
import { GameDialog } from "@/components/layouts/game-dialog";
import { HistoryIcon } from "lucide-react";

interface GamePageProps {
  title: string;
  description: string;
  board: ReactNode;
  controls: ReactNode;
  mode: ReactNode;
  history: ReactNode;
  result: ReactNode;
}

export function GamePage({
  title,
  description,
  board,
  controls,
  mode,
  history,
  result,
}: GamePageProps) {
  return (
    <main className="page-container">
      <Stack gap={5}>
        <header>
          <Stack gap={2}>
            <Eyebrow>Memory training</Eyebrow>
            <Heading level={1}>{title}</Heading>
            <Text muted>{description}</Text>
          </Stack>
        </header>

        <Grid cols="sidebar" gap={5}>
          <section aria-label={`${title} practice board`} className="min-w-0">
            <Card variant="tight">
              <Stack gap={3}>
                <Row justify="between">
                  {mode}
                  <Row gap={1} wrap={false}>
                    <GameDialog
                      icon={<HistoryIcon size={18} />}
                      label="Open saved history"
                      title="Saved history"
                    >
                      {history}
                    </GameDialog>
                    {result}
                  </Row>
                </Row>
                {board}
              </Stack>
            </Card>
          </section>
          <section aria-label={`${title} controls`} className="min-w-0">
            {controls}
          </section>
        </Grid>
      </Stack>
    </main>
  );
}
