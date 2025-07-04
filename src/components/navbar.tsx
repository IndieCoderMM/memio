"use client";
import { BookOpen, ChartLine, Home, Menu, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home", icon: <Home size={18} /> },
  { href: "/learn", label: "Learn", icon: <BookOpen size={18} /> },
  { href: "/stats", label: "Statistics", icon: <ChartLine size={18} /> },
  { href: "/profile", label: "Profile", icon: <User size={18} /> },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
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
        {/* Desktop Nav */}
        <ul className="hidden items-center gap-6 text-sm md:flex">
          {navItems.map(({ href, label, icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="hover:bg-elevated hover:text-accent-green flex items-center gap-1 rounded-md px-3 py-1 transition"
              >
                {icon} {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="hover:text-accent-green p-2 transition md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {open && (
        <ul className="space-y-2 px-6 pb-4 text-sm md:hidden">
          {navItems.map(({ href, label, icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="hover:bg-elevated hover:text-accent-green flex items-center gap-2 rounded-md px-3 py-2 transition"
                onClick={() => setOpen(false)}
              >
                {icon} {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
