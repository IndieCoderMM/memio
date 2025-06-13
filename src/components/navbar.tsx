import { BookOpen, Home, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Home", icon: <Home size={18} /> },
  { href: "/learn", label: "Learn", icon: <BookOpen size={18} /> },
  { href: "/settings", label: "Settings", icon: <Settings size={18} /> },
  { href: "/profile", label: "Profile", icon: <User size={18} /> },
];

export default function Navbar() {
  return (
    <nav className="bg-surface absolute top-0 right-0 left-0 z-[99] border-b border-[#2c2c36]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center -space-x-1">
          <Image
            src={"/logo.png"}
            className="h-10 w-10"
            width={40}
            height={40}
            alt="logo"
          />
          <h1 className="text-accent-green font-title text-2xl font-bold tracking-tight brightness-110">
            Memio
          </h1>
        </Link>
        <ul className="flex space-x-6 text-sm">
          {navItems.map(({ href, label, icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="hover:bg-elevated hover:text-accent-green flex items-center gap-1 rounded-md px-3 py-1 transition"
              >
                {icon}
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
