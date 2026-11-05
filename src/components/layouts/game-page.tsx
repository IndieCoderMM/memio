import type { ReactNode } from "react";
import { Blob } from "@/components/pouf/media";
import { Grid, Row, Stack } from "@/components/pouf/layout";
import { Card } from "@/components/pouf/surface";
import { Eyebrow, Heading, Text } from "@/components/pouf/text";

interface GamePageProps {
  title: string;
  description: string;
  board: ReactNode;
  controls: ReactNode;
  tone: "purple" | "blue" | "mint" | "orange";
}

export function GamePage({
  title,
  description,
  board,
  controls,
  tone,
}: GamePageProps) {
  return (
    <main className="mx-auto max-w-[1440px] px-(--s8) py-(--s7) max-[900px]:px-(--s4) max-[900px]:py-(--s5)">
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
                  <Heading level={3}>Practice board</Heading>
                  <Blob icon="target" tone={tone} size="sm" />
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
