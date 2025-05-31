import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4">
      <h1>Home</h1>
      <p>Welcome to Memio, your memory training app!</p>
      <div className="">
        <ul>
          <li>
            <Link href="/chessboard">Chessboard</Link>
          </li>
          <li>
            <a href="/memory-game">Memory Game</a>
          </li>
          <li>
            <a href="/settings">Settings</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
