import Image from "next/image";
import Link from "next/link";

const features = [
  { title: "Chessboard", icon: "♟️", href: "/chessboard" },
  { title: "Numbers", icon: "🔢", href: "/numbers" },
  { title: "Binary", icon: "0️⃣", href: "/binary" },
  { title: "Cards", icon: "♦️", href: "/cards" },
];

export default function HomePage() {
  return (
    <div className="bg-background min-h-screen p-8 text-white">
      <div className="mx-auto flex h-full max-w-5xl flex-col space-y-10">
        {/* Header */}
        <header className="space-y-2 text-center">
          <div className="flex items-center justify-center gap-3">
            <Image
              src="/logo.png"
              alt="logo"
              width={64}
              height={64}
              className="rounded-xl drop-shadow-md"
            />
            <h1 className="font-title text-accent-green text-5xl font-extrabold tracking-tight">
              Memio
            </h1>
          </div>
          <p className="text-lg text-gray-400">
            Train your brain to master photographic memory.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <GameCard
              key={feature.title}
              title={feature.title}
              icon={feature.icon}
              href={feature.href}
            />
          ))}
        </section>

        <footer className="text-muted mt-auto text-center text-sm">
          &copy; {new Date().getFullYear()} Memio Labs. All rights reserved.
        </footer>
      </div>
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
