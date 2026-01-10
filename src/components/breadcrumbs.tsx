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
    <div
      className={cn(
        "bg-muted border-border flex items-center border text-sm",
        className,
      )}
    >
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Home"
        title="Home"
        asChild
      >
        <Link href="/">
          <HomeIcon className="inline h-5 w-5" />
        </Link>
      </Button>
      <div className="bg-muted-foreground/30 h-8 w-px"></div>
      {paths.map((path, index) => (
        <div
          key={index}
          className="bg-muted inline-block h-full px-4 capitalize"
        >
          {index === paths.length - 1 ? path : `${path}`}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
