"use client";
import { cn } from "@/utils/tailwind";
import { BookOpen, ChartLine, Home, Menu, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home", icon: <Home size={18} /> },
  { href: "/wiki", label: "Wiki", icon: <BookOpen size={18} /> },
  { href: "/stats", label: "Stats", icon: <ChartLine size={18} /> },
  { href: "/profile", label: "Profile", icon: <User size={18} /> },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-border bg-card sticky top-0 left-0 z-50 w-full border-b">
      <div className="w-full px-6 py-2">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={"/logo.png"}
              className="h-8 w-8"
              width={32}
              height={32}
              alt="logo"
            />
            <span className="text-foreground hover:text-primary text-xl font-bold">
              Memio
            </span>
          </Link>
          {/* Navigation Links */}
          <div className="ml-auto flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "border border-transparent px-4 py-2 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-primary text-primary-foreground border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

function OldNavbar() {
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
          {navLinks.map(({ href, label, icon }) => (
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
          {navLinks.map(({ href, label, icon }) => (
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
