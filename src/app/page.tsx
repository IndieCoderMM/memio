import { Footer } from "@/components/pouf/footer";
import { Grid, Row, Stack } from "@/components/pouf/layout";
import { Badge, Blob } from "@/components/pouf/media";
import { Card } from "@/components/pouf/surface";
import { Eyebrow, Heading, Highlight, Text } from "@/components/pouf/text";
import HomeProgress from "@/features/stats/ui/home-progress";
import { Binary, ChessPawn, LayoutGridIcon, Spade } from "lucide-react";
import Link from "next/link";

const games = [
  {
    id: "numbers",
    name: "Numbers",
    href: "/numbers",
    icon: <LayoutGridIcon size={32} strokeWidth={1.9} />,
    description: "Memorize sequences of random numbers.",
    difficulty: "newbie",
    tone: "mint",
    iconTone: "blue",
  },
  {
    id: "binary",
    name: "Binary",
    href: "/binary",
    icon: <Binary size={32} strokeWidth={1.9} />,
    description: "Practice recalling binary sequences and patterns.",
    difficulty: "newbie",
    tone: "yellow",
    iconTone: "purple",
  },
  {
    id: "chessboard",
    name: "Chessboard",
    href: "/chessboard",
    icon: <ChessPawn size={32} strokeWidth={1.9} />,
    description: "Remember where chess pieces sit on the board.",
    difficulty: "pro",
    tone: "pink",
    iconTone: "mint",
  },
  {
    id: "cards",
    name: "Cards",
    href: "/cards",
    icon: <Spade size={32} strokeWidth={1.9} />,
    description: "Find matching pairs in a card grid.",
    difficulty: "pro",
    tone: "orange",
    iconTone: "yellow",
  },
] as const;

const sampleSequence = [
  { digit: "7", tone: "purple" },
  { digit: "2", tone: "yellow" },
  { digit: "9", tone: "mint" },
  { digit: "4", tone: "pink" },
] as const;

export default function HomePage() {
  return (
    <main className="page-container">
      <Stack gap={10}>
        <section aria-label="Introduction">
          <Grid cols="sidebar" gap={6}>
            <Stack gap={4}>
              <Eyebrow>Memory practice, made playful</Eyebrow>
              <Heading level={1}>
                Train your <Highlight>memory</Highlight> one round at a time.
              </Heading>
            </Stack>
          </Grid>
        </section>

        <section aria-label="Memory games" id="games">
          <Stack gap={4}>
            <Stack gap={1}>
              <Eyebrow>Choose a practice</Eyebrow>
              <Heading level={2}>Find your next challenge</Heading>
            </Stack>

            <Grid cols={4} gap={2}>
              {games.map((game) => (
                <Link
                  key={game.id}
                  href={game.href}
                  className="rounded-card text-ink focus-visible:outline-purple block no-underline focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  <Card motion="lift">
                    <Stack gap={4}>
                      <Row justify="between" align="top">
                        <Blob icon={game.icon} tone={game.iconTone} />
                        <Badge tone={game.tone}>{game.difficulty}</Badge>
                      </Row>
                      <Stack gap={1}>
                        <Heading level={3}>{game.name}</Heading>
                        <Text muted>{game.description}</Text>
                      </Stack>
                      <span className="inline-flex min-h-[40px] items-center gap-(--s2) self-start font-black">
                        Play {game.name}
                        <span aria-hidden="true">→</span>
                      </span>
                    </Stack>
                  </Card>
                </Link>
              ))}
            </Grid>
          </Stack>
        </section>

        <HomeProgress />

        <Footer
          link={Link}
          brand={
            <Link href="/" className="text-ink no-underline">
              Memio
            </Link>
          }
          tagline="Memory practice for curious minds."
          columns={[
            {
              title: "Practice",
              links: [
                { label: "Numbers", href: "/numbers" },
                { label: "Binary", href: "/binary" },
                { label: "Chessboard", href: "/chessboard" },
                { label: "Cards", href: "/cards" },
              ],
            },
            {
              title: "Explore",
              links: [
                { label: "Memory wiki", href: "/wiki" },
                { label: "Your stats", href: "/stats" },
              ],
            },
          ]}
          note={`© ${new Date().getFullYear()} Memio Labs`}
        />
      </Stack>
    </main>
  );
}
