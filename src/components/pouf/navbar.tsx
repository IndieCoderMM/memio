import clsx from "clsx";
import { LucideIcon, MenuIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface NavbarLink {
  label: string;
  href: string;
  active?: boolean;
  icon?: LucideIcon;
}

interface NavbarProps {
  /** Your logo/wordmark. */
  brand: ReactNode;
  links?: NavbarLink[];
  /** Right-side actions — usually a Button or two. */
  actions?: ReactNode;
  /** Identifies this navigation landmark when a page has more than one. */
  label?: string;
}

/** A top navigation bar on a floating cushion. Brand on the left, links, and
 * right-aligned actions. On narrow screens the links move into a native
 * details menu, so a complete page never loses its navigation just because it
 * reached phone width. */
export function Navbar({
  brand,
  links = [],
  actions,
  label = "Primary",
}: NavbarProps) {
  return (
    <nav
      className="pouf-navbar bg-surface cushion-card rounded-card fixed top-2 left-1/2 mx-auto flex h-16 w-2xl -translate-x-1/2 items-center gap-(--s4) p-(--s3) pl-(--s3)"
      aria-label={label}
    >
      <div className="pouf-navbar__links flex items-center justify-center gap-[2px]">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            aria-current={l.active ? "page" : undefined}
            className={clsx(
              /* inline-flex + min-h so the 8px padding actually yields a 24px
               * target: as a bare inline anchor these measured 23px, just under
               * the WCAG 2.2 AA minimum (2.5.8), and they are standalone nav
               * links so the "inline" exemption does not apply. */
              "rounded-pill px-(--s3) py-(--s2) font-extrabold no-underline transition-colors",
              "inline-flex min-h-[24px] items-center",
              /* Active is an accent fill, so its label follows --on-accent —
               * --ink goes near-white in dark mode and would vanish on purple. */
              l.active
                ? "bg-purple text-[var(--on-accent)]"
                : "text-ink hover:bg-[rgba(201,168,255,0.25)]",
            )}
          >
            {l.icon && <l.icon size={16} className="mr-1" />}
            {l.label}
          </a>
        ))}
      </div>
      {links.length > 0 ? (
        <details className="pouf-navbar__mobile relative mr-auto">
          <summary
            className="text-ink rounded-pill inline-flex min-h-[40px] cursor-pointer items-center px-(--s3) font-extrabold hover:bg-[rgba(201,168,255,0.25)]"
            style={{ listStyle: "none" }}
          >
            <span className="sr-only">Menus</span>
            <MenuIcon />
          </summary>
          <div className="bg-surface rounded-control cushion-card absolute top-[calc(100%+12px)] left-0 z-20 flex min-w-[190px] flex-col gap-(--s1) p-(--s2)">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={link.active ? "page" : undefined}
                className={clsx(
                  "rounded-control inline-flex min-h-[40px] items-center px-(--s3) py-(--s2) font-extrabold no-underline",
                  link.active
                    ? "bg-purple text-[var(--on-accent)]"
                    : "text-ink hover:bg-[rgba(201,168,255,0.25)]",
                )}
                onClick={(event) =>
                  event.currentTarget
                    .closest("details")
                    ?.removeAttribute("open")
                }
              >
                {link.label}
              </a>
            ))}
          </div>
        </details>
      ) : null}
      {actions && (
        <div className="pouf-navbar__actions ml-auto flex items-center gap-(--s2)">
          {actions}
        </div>
      )}
    </nav>
  );
}
