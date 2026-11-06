import { Stack } from "@/components/pouf/layout";
import { Eyebrow, Heading, Text } from "@/components/pouf/text";
import StatsDashboard from "@/features/stats/ui/stats-dashboard";

export default function Stats() {
  return (
    <main className="page-container">
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
