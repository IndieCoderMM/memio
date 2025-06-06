import Link from "next/link";

export default function HomePage() {
  return (
    <div className="h-full p-8">
      <div className="mx-auto max-w-xl space-y-6">
        <header className="text-center">
          <h1 className="font-title text-5xl tracking-tight">Memio</h1>
          <p className="mt-2 text-lg text-gray-300">
            Sharpen your mind. Train your memory.
          </p>
        </header>

        <nav className="bg-surface rounded-2xl p-6 shadow-xl">
          <ul className="space-y-4 text-lg">
            <li>
              <Link
                href="/chessboard"
                className="bg-elevated hover:bg-accent-green block rounded-lg px-4 py-2 transition"
              >
                ♟️ Chessboard
              </Link>
            </li>
            <li>
              <Link
                href="/cards"
                className="bg-elevated hover:bg-accent-blue block rounded-lg px-4 py-2 transition"
              >
                ♥️ Cards
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="bg-elevated hover:bg-accent-yellow block rounded-lg px-4 py-2 transition"
              >
                ⚙️ Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
