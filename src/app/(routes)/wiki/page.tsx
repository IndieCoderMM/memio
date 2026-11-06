import { Icon } from "@/components/pouf/Icon";
import { Grid, Row, Stack } from "@/components/pouf/layout";
import { Blob } from "@/components/pouf/media";
import { Card } from "@/components/pouf/surface";
import { Eyebrow, Heading, Text } from "@/components/pouf/text";
import techniques from "@/data/wiki.json";

const bestPractices = [
  {
    title: "Getting started",
    tone: "blue",
    tips: [
      "Start with one technique at a time.",
      "Practice for short, focused sessions.",
      "Combine techniques as you improve.",
      "Be patient—improvement takes time.",
    ],
  },
  {
    title: "Building a routine",
    tone: "mint",
    tips: [
      "Play a game regularly for practice.",
      "Review your saved progress.",
      "Stay consistent with your training.",
      "Mix different techniques for variety.",
    ],
  },
] as const;

export default function Wiki() {
  return (
    <main className="page-container">
      <Stack gap={10}>
        <header>
          <Stack gap={2}>
            <Eyebrow>Learn and practice</Eyebrow>
            <Heading level={1}>Memory techniques</Heading>
            <Text muted>
              Explore practical ways to organize information and make recall
              easier.
            </Text>
          </Stack>
        </header>

        <section aria-label="Memory techniques">
          <Grid cols={2} gap={4}>
            {techniques.map((technique, index) => (
              <Card key={technique.title} motion="lift">
                <Stack gap={4}>
                  <Row gap={3} align="top" wrap={false}>
                    <Blob
                      icon={index % 2 === 0 ? "sparkle" : "wand"}
                      tone={index % 2 === 0 ? "purple" : "blue"}
                      size="md"
                    />
                    <Stack gap={1}>
                      <Heading level={3}>{technique.title}</Heading>
                      <Text muted>{technique.description}</Text>
                    </Stack>
                  </Row>
                  <Stack gap={2}>
                    <Eyebrow>Try this</Eyebrow>
                    <ul className="m-0 flex list-none flex-col gap-(--s2) p-0">
                      {technique.tips.map((tip) => (
                        <li key={tip}>
                          <Row gap={2} align="top" wrap={false}>
                            <Icon name="ok" size="sm" />
                            <Text size="sm" muted>
                              {tip}
                            </Text>
                          </Row>
                        </li>
                      ))}
                    </ul>
                  </Stack>
                </Stack>
              </Card>
            ))}
          </Grid>
        </section>

        <section aria-label="Practice tips">
          <Stack gap={4}>
            <Stack gap={1}>
              <Eyebrow>Build a routine</Eyebrow>
              <Heading level={2}>Make practice manageable</Heading>
            </Stack>
            <Grid cols={2} gap={4}>
              {bestPractices.map((practice) => (
                <Card key={practice.title} variant="tight">
                  <Stack gap={3}>
                    <Row gap={2}>
                      <Blob icon="target" tone={practice.tone} size="sm" />
                      <Heading level={3}>{practice.title}</Heading>
                    </Row>
                    <ul className="m-0 flex list-none flex-col gap-(--s2) p-0">
                      {practice.tips.map((tip) => (
                        <li key={tip}>
                          <Text size="sm" muted>
                            {tip}
                          </Text>
                        </li>
                      ))}
                    </ul>
                  </Stack>
                </Card>
              ))}
            </Grid>
          </Stack>
        </section>
      </Stack>
    </main>
  );
}
