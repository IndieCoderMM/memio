"use client";

import { IconButton } from "@/components/pouf/Button";
import { Blob } from "@/components/pouf/media";
import { Navbar as PoufNavbar } from "@/components/pouf/navbar";
import { useAppStore } from "@/lib/app-store";
import {
  HomeIcon,
  Moon,
  NewspaperIcon,
  PieChartIcon,
  Sun,
  TargetIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const gameRoutes = ["/numbers", "/binary", "/chessboard", "/cards"];

export default function Navbar() {
  const pathname = usePathname();
  const isDarkMode = useAppStore((state) => state.isDarkMode);
  const toggleDarkMode = useAppStore((state) => state.toggleDarkMode);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <PoufNavbar
      link={Link}
      brand={
        <Link
          href="/"
          className="flex shrink-0 items-center gap-(--s2) font-black text-ink no-underline"
        >
          <Blob icon="target" tone="purple" size="sm" />
          <span>Memio</span>
        </Link>
      }
      links={[
        {
          href: "/",
          label: "Home",
          active: pathname === "/",
          icon: HomeIcon,
        },
        {
          href: "/numbers",
          label: "Practice",
          active: gameRoutes.includes(pathname),
          icon: TargetIcon,
        },
        {
          href: "/wiki",
          label: "Wiki",
          active: pathname === "/wiki",
          icon: NewspaperIcon,
        },
        {
          href: "/stats",
          label: "Stats",
          active: pathname === "/stats",
          icon: PieChartIcon,
        },
        {
          href: "/profile",
          label: "Profile",
          active: pathname === "/profile",
          icon: UserIcon,
        },
      ]}
      actions={
        <IconButton
          variant="solid"
          size="sm"
          icon={
            hasMounted && isDarkMode ? <Sun size={18} /> : <Moon size={18} />
          }
          label={
            hasMounted
              ? isDarkMode
                ? "Switch to light theme"
                : "Switch to dark theme"
              : "Toggle theme"
          }
          aria-pressed={hasMounted ? isDarkMode : undefined}
          onClick={toggleDarkMode}
        />
      }
    />
  );
}
