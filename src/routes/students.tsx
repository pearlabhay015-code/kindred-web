import { createFileRoute, Link } from "@tanstack/react-router";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { listQuickLinks } from "@/server/site.functions";

export const Route = createFileRoute("/students")({
  head: () => ({
    meta: [
      { title: "Student Resources — CUSB" },
      { name: "description", content: "Scholarships, hostels, results, library, PYQs, placements, alumni, anti-ragging — every student resource in one place." },
      { property: "og:title", content: "CUSB Student Resources" },
      { property: "og:description", content: "Quick links and resources for CUSB students." },
    ],
  }),
  loader: () => listQuickLinks(),
  component: StudentsPage,
});

function StudentsPage() {
  useScrollReveal();
  const links = Route.useLoaderData();

  // Group by category
  const grouped = links.reduce<Record<string, typeof links>>((acc, l) => {
    const c = l.category || "General";
    (acc[c] ||= []).push(l);
    return acc;
  }, {});

  return (
    <>
      <PageHero
        eyebrow="Students"
        title="Everything a CUSB student needs"
        subtitle="One page for scholarships, exam results, library, hostels, PYQs, placements, alumni, anti-ragging and more."
        crumbs={[{ label: "Students" }]}
      />

      <Section>
        <div className="grid gap-12">
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} className="rev">
              <h2 className="font-display text-xl font-bold mb-5 text-[var(--tx-primary)]">{cat}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((l) => {
                  const inner = (
                    <>
                      <div className="text-2xl mb-2" aria-hidden="true">{l.icon ?? "🔗"}</div>
                      <h3 className="font-display font-bold">{l.name}</h3>
                      {l.description && <p className="mt-1 text-sm text-[var(--tx-secondary)]">{l.description}</p>}
                      <span className="mt-3 inline-block text-sm font-semibold text-[var(--acc)]">
                        {l.external ? "Open ↗" : "Open →"}
                      </span>
                    </>
                  );
                  return l.external ? (
                    <a key={l.slug} href={l.url} target="_blank" rel="noopener" className="nm-surface p-6 block hover:shadow-[var(--nm-out-xl)] transition-shadow">
                      {inner}
                    </a>
                  ) : (
                    <Link key={l.slug} to={l.url} className="nm-surface p-6 block hover:shadow-[var(--nm-out-xl)] transition-shadow">
                      {inner}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
