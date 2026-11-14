import { Grid, Row, Stack } from "@/components/pouf/layout";
import { Badge, Blob } from "@/components/pouf/media";
import { Card } from "@/components/pouf/surface";
import { Eyebrow, Heading, Text } from "@/components/pouf/text";
import { ArrowRight, BookOpenText, LibraryBig } from "lucide-react";
import Link from "next/link";

const destinations = [
  {
    title: "Memory techniques",
    description:
      "Learn practical ways to organize information and make it easier to recall.",
    href: "/library/wiki",
    action: "Explore the wiki",
    icon: BookOpenText,
    tone: "blue",
    badge: "Learn",
  },
  {
    title: "Personal systems",
    description:
      "Build mnemonic lists that fit the way you remember, then keep them close for practice.",
    href: "/library/systems",
    action: "View your systems",
    icon: LibraryBig,
    tone: "purple",
    badge: "Build",
  },
] as const;

export default function LibraryPage() {
  return (
    <main className="page-container">
      <div className="mx-auto w-full max-w-[1080px]">
        <Stack gap={6}>
          <header>
            <Grid cols="sidebar" gap={6}>
              <Stack gap={3}>
                <Eyebrow>Your memory toolkit</Eyebrow>
                <Heading level={1}>The Library</Heading>
                <Text muted>
                  Learn memory techniques and build personal systems for the
                  things you want to remember.
                </Text>
              </Stack>
              <Card variant="tight">
                <Stack gap={3}>
                  <Row gap={3} align="top" wrap={false}>
                    <Blob
                      icon={<LibraryBig size={24} />}
                      tone="yellow"
                      size="md"
                    />
                    <Stack gap={1}>
                      <Heading level={3}>Make memory personal</Heading>
                      <Text size="sm" muted>
                        Start with an idea, shape it into your own associations,
                        and revisit it as you practice.
                      </Text>
                    </Stack>
                  </Row>
                  <div
                    className="flex flex-wrap gap-2"
                    aria-label="Library contents"
                  >
                    <Badge tone="blue">Guides</Badge>
                    <Badge tone="mint">Your systems</Badge>
                  </div>
                </Stack>
              </Card>
            </Grid>
          </header>

          <section aria-label="Explore the library">
            <Stack gap={3}>
              <div>
                <Eyebrow>Explore</Eyebrow>
                <Heading level={2}>Where would you like to start?</Heading>
              </div>
              <Grid cols={2} gap={4}>
                {destinations.map((destination) => (
                  <Link
                    key={destination.href}
                    href={destination.href}
                    className="rounded-card text-ink focus-visible:outline-purple block no-underline focus-visible:outline-2 focus-visible:outline-offset-4"
                  >
                    <Card motion="lift">
                      <Stack gap={5}>
                        <Row justify="between" align="top">
                          <Blob
                            icon={<destination.icon size={24} />}
                            tone={destination.tone}
                            size="md"
                          />
                          <Badge tone={destination.tone}>
                            {destination.badge}
                          </Badge>
                        </Row>
                        <Stack gap={2}>
                          <Heading level={3}>{destination.title}</Heading>
                          <Text muted>{destination.description}</Text>
                        </Stack>
                        <span className="inline-flex min-h-10 items-center gap-(--s2) self-start font-black">
                          {destination.action}
                          <ArrowRight size={18} aria-hidden="true" />
                        </span>
                      </Stack>
                    </Card>
                  </Link>
                ))}
              </Grid>
            </Stack>
          </section>
        </Stack>
      </div>
    </main>
  );
}
