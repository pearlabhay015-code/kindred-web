import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

type Crumb = { label: string; to?: string };

export function PageHero({
  eyebrow,
  title,
  subtitle,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <header
      className="px-[5vw] pt-12 pb-10 lg:pt-16 lg:pb-14"
      style={{ background: "var(--nm-bg-sec)" }}
    >
      <div className="max-w-7xl mx-auto">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--tx-muted)]">
              <li>
                <Link to="/" className="hover:text-[var(--acc)]">
                  Home
                </Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span aria-hidden="true">/</span>
                  {c.to ? (
                    <Link to={c.to} className="hover:text-[var(--acc)]">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-[var(--tx-secondary)]">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && <div className="sec-eyebrow">{eyebrow}</div>}
        <h1 className="font-display font-extrabold tracking-tight text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.1] text-[var(--tx-primary)]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-3xl text-base sm:text-lg text-[var(--tx-secondary)] leading-relaxed">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </header>
  );
}
