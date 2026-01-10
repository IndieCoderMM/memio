import { Button } from "@/components/ui/button";
import { cn } from "@/utils/tailwind";
import { Binary, ChessPawn, LayoutGridIcon, Spade } from "lucide-react";
import Link from "next/link";

const ICON_SIZE = 48;

const games = [
  {
    id: "numbers",
    name: "Numbers",
    href: "/numbers",
    icon: (
      <LayoutGridIcon size={ICON_SIZE} className="stroke-1 text-violet-800" />
    ),
    description: "Memorize long sequences of random numbers",
    difficulty: "Beginner",
    color: "from-blue-500/20 to-violet-600/20",
  },
  {
    id: "binary",
    name: "Binary",
    href: "/binary",
    icon: <Binary size={ICON_SIZE} className="stroke-1 text-orange-700" />,
    description: "Master binary sequences and patterns",
    difficulty: "Intermediate",
    color: "from-purple-500/20 to-red-600/20",
  },
  {
    id: "chessboard",
    name: "Chessboard",
    href: "/chessboard",
    icon: <ChessPawn size={ICON_SIZE} className="stroke-1 text-blue-800" />,
    description: "Remember the positions of chess pieces on the board",
    difficulty: "Advanced",
    color: "from-blue-400/20 to-orange-600/20",
  },
  {
    id: "cards",
    name: "Cards",
    href: "/cards",
    icon: <Spade size={ICON_SIZE} className="text-accent-red stroke-1" />,
    description: "Find matching pairs in a card grid",
    difficulty: "Advanced",
    color: "from-green-400/20 to-red-700/20",
  },
];

export default function HomePage() {
  return (
    <div className="bg-background min-h-screen">
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-16 text-center">
          <h1 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
            Train Your Brain
          </h1>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg">
            Master photographic memory through engaging mini games. Challenge
            yourself and track your progress.
          </p>
          <Link href="/wiki">
            <Button className="bg-primary hover:bg-primary/90">
              Learn Memory Techniques
            </Button>
          </Link>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {games.map((game) => (
            <div
              key={game.id}
              className="group bg-card border-border hover:border-primary/50 relative flex flex-col border p-6 transition-all"
            >
              {/* Background gradient effect */}
              <div
                className={cn(
                  `absolute inset-0 bg-linear-to-br ${game.color} opacity-0 transition-opacity group-hover:opacity-100`,
                )}
              ></div>

              <div className="relative z-10">
                <div className="mb-3 text-4xl">{game.icon}</div>
                <h3 className="text-foreground mb-2 text-lg font-bold">
                  {game.name}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {game.description}
                </p>
              </div>

              <div className="relative mt-auto flex items-center justify-between">
                <span className="text-primary text-xs font-semibold uppercase">
                  {game.difficulty}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:bg-primary hover:text-primary-foreground"
                  asChild
                >
                  <Link href={game.href}>Play →</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="text-muted mt-auto text-center text-sm">
        {/* Stats Section */}
        <section className="border-border mx-auto mt-8 max-w-7xl border-t px-6 py-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="bg-card border-border border p-6 text-center">
              <div className="text-primary mb-2 text-3xl font-bold">1,200+</div>
              <p className="text-muted-foreground text-sm">Games Played</p>
            </div>
            <div className="bg-card border-border border p-6 text-center">
              <div className="text-primary mb-2 text-3xl font-bold">2:45</div>
              <p className="text-muted-foreground text-sm">Best Time</p>
            </div>
            <div className="bg-card border-border border p-6 text-center">
              <div className="text-primary mb-2 text-3xl font-bold">87%</div>
              <p className="text-muted-foreground text-sm">Accuracy</p>
            </div>
          </div>
        </section>
        &copy; {new Date().getFullYear()} Memio Labs. All rights reserved.
      </footer>
    </div>
  );
}

type GameCardProps = {
  title: string;
  icon: string;
  href: string;
};

const GameCard = ({ title, icon, href }: GameCardProps) => {
  return (
    <Link href={href} className="group">
      <div
        className={`bg-surface rounded-2xl p-6 transition hover:scale-[1.02] hover:ring-2`}
      >
        <div className="mb-3 text-4xl">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
    </Link>
  );
};
