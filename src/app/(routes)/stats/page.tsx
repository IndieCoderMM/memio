import { Stack } from "@/components/pouf/layout";
import { Eyebrow, Heading, Text } from "@/components/pouf/text";
import StatsDashboard from "@/features/stats/ui/stats-dashboard";

export default function Stats() {
  return (
    <main className="mx-auto max-w-[1280px] px-(--s8) py-(--s8) max-[900px]:px-(--s4) max-[620px]:py-(--s5)">
      <Stack gap={6}>
        <header>
          <Stack gap={2}>
            <Eyebrow>Practice history</Eyebrow>
            <Heading level={1}>Your progress</Heading>
            <Text muted>
              Sessions, accuracy, and milestones from your saved games.
            </Text>
          </Stack>
        </header>
        <StatsDashboard />
      </Stack>
    </main>
  );
}
