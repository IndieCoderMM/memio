import { Grid, Row, Stack } from "@/components/pouf/layout";
import { Badge, Blob } from "@/components/pouf/media";
import { Card } from "@/components/pouf/surface";
import { Eyebrow, Heading, Text } from "@/components/pouf/text";
import { ArrowRight, UserRound } from "lucide-react";
import Link from "next/link";

export default function PersonalSystemsPage() {
  return (
    <main className="page-container">
      <div className="mx-auto w-full max-w-[1080px]">
        <Stack gap={6}>
          <header>
            <Stack gap={2}>
              <Link
                href="/library"
                className="text-muted hover:text-ink w-fit font-extrabold no-underline"
              >
                ← Library
              </Link>
              <Eyebrow>Build and keep your own</Eyebrow>
              <Heading level={1}>Personal systems</Heading>
              <Text muted>
                Your mnemonic lists are personal. Build each one from
                associations that make sense to you.
              </Text>
            </Stack>
          </header>

          <section aria-label="Available systems">
            <Grid cols="sidebar" gap={4}>
              <Link
                href="/library/systems/number-pao"
                className="rounded-card text-ink focus-visible:outline-purple block no-underline focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                <Card motion="lift">
                  <Stack gap={5}>
                    <Row justify="between" align="top">
                      <Blob
                        icon={<UserRound size={24} />}
                        tone="purple"
                        size="md"
                      />
                      <Badge tone="mint">Ready to build</Badge>
                    </Row>
                    <Stack gap={2}>
                      <Heading level={2}>Number PAO</Heading>
                      <Text muted>
                        Create a person, action, and object for each number from
                        00 to 99. Your entries save in this browser.
                      </Text>
                    </Stack>
                    <span className="inline-flex min-h-10 items-center gap-(--s2) self-start font-black">
                      Open builder <ArrowRight size={18} aria-hidden="true" />
                    </span>
                  </Stack>
                </Card>
              </Link>

              <Card variant="tight">
                <Stack gap={3}>
                  <Eyebrow>Your workspace</Eyebrow>
                  <Heading level={3}>Start with one strong image</Heading>
                  <Text muted>
                    Fill in the numbers you already know. You can search your
                    list and come back to unfinished entries whenever you like.
                  </Text>
                  <Text size="sm" muted>
                    More personal system builders will appear here as they are
                    added.
                  </Text>
                </Stack>
              </Card>
            </Grid>
          </section>
        </Stack>
      </div>
    </main>
  );
}
