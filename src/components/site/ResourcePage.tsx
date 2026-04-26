import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";

export type InfoLink = { label: string; href: string; external?: boolean };

export function ResourcePage({
  eyebrow,
  title,
  subtitle,
  intro,
  sections,
  links,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  intro?: ReactNode;
  sections?: { heading: string; body: ReactNode }[];
  links?: InfoLink[];
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        crumbs={[{ label: "Students", to: "/students" }, { label: title }]}
      />
      <Section>
        <div className="grid lg:grid-cols-3 gap-6">
          <article className="lg:col-span-2 nm-surface p-7 rounded-[28px]">
            {intro && <div className="prose-cusb text-[var(--tx-secondary)] leading-relaxed">{intro}</div>}
            {sections?.map((s) => (
              <div key={s.heading} className="mt-6">
                <h2 className="font-display text-lg font-bold text-[var(--tx-primary)]">{s.heading}</h2>
                <div className="mt-2 text-[var(--tx-secondary)] leading-relaxed">{s.body}</div>
              </div>
            ))}
          </article>
          <aside className="nm-surface-sm p-6">
            <h3 className="font-display font-bold">Useful links</h3>
            {links && links.length > 0 ? (
              <ul className="mt-3 grid gap-2 text-sm">
                {links.map((l) =>
                  l.external ? (
                    <li key={l.href}>
                      <a href={l.href} target="_blank" rel="noopener" className="text-[var(--acc)] hover:underline">{l.label} ↗</a>
                    </li>
                  ) : (
                    <li key={l.href}>
                      <Link to={l.href} className="text-[var(--acc)] hover:underline">{l.label} →</Link>
                    </li>
                  )
                )}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-[var(--tx-muted)]">More links coming soon.</p>
            )}
            <Link to="/students" className="btn mt-6 w-full">All resources</Link>
          </aside>
        </div>
      </Section>
    </>
  );
}
