"use client";

import { cn } from "@/utils/tailwind";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const Breadcrumbs = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  if (paths.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "inline-flex min-h-12 items-center gap-(--s2) rounded-control bg-surface px-(--s2) py-(--s1) text-[13px] font-extrabold text-muted cushion-field",
        className,
      )}
    >
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Go to home"
        title="Home"
        asChild
      >
        <Link href="/">
          <HomeIcon className="inline h-5 w-5" />
        </Link>
      </Button>
      <ol className="m-0 flex min-w-0 list-none items-center gap-(--s2) p-0">
        {paths.map((path, index) => (
          <li
            key={`${path}-${index}`}
            aria-current={index === paths.length - 1 ? "page" : undefined}
            className={cn(
              "min-w-0 capitalize",
              index === paths.length - 1 ? "text-ink" : "text-muted",
            )}
          >
            <span className="mr-(--s2) text-muted/60">/</span>
            {path.replaceAll("-", " ")}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
