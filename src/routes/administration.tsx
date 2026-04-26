import { createFileRoute, Link } from "@tanstack/react-router";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { listLeaders } from "@/server/site.functions";

export const Route = createFileRoute("/administration")({
  head: () => ({
    meta: [
      { title: "Administration & Leadership — CUSB" },
      { name: "description", content: "Visitor, Chancellor, Vice-Chancellor, Registrar and senior leadership of the Central University of South Bihar." },
      { property: "og:title", content: "CUSB Administration" },
      { property: "og:description", content: "Meet the leadership of the Central University of South Bihar." },
    ],
  }),
  loader: () => listLeaders(),
  component: AdminPage,
});

function AdminPage() {
  useScrollReveal();
  const leaders = Route.useLoaderData();

  return (
    <>
      <PageHero
        eyebrow="Administration"
        title="People who lead CUSB"
        subtitle="A snapshot of the people who steward the university — from the Visitor of India to academic and executive officers."
        crumbs={[{ label: "Administration" }]}
      />

      <Section>
        {leaders && leaders.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaders.map((l) => (
              <article key={l.slug} className="rev nm-surface p-6">
                <div className="w-20 h-20 rounded-full nm-inset-sm flex items-center justify-center text-3xl font-bold font-display text-grad mb-4" aria-hidden="true">
                  {l.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                </div>
                <h2 className="font-display text-lg font-bold">{l.name}</h2>
                <p className="text-sm font-semibold text-[var(--acc)]">{l.role}</p>
                {l.short_note && (
                  <p className="mt-3 text-sm text-[var(--tx-secondary)] leading-relaxed">{l.short_note}</p>
                )}
              </article>
            ))}
          </div>
        ) : (
          <p className="text-[var(--tx-muted)]">Leadership information will be available shortly.</p>
        )}
      </Section>

      <Section centered>
        <div className="nm-surface p-8 max-w-3xl mx-auto rev text-center">
          <h2 className="sec-title">Reach the right office</h2>
          <p className="sec-sub mx-auto">For grievances, RTI or administrative queries.</p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="btn btn-primary">Contact directory →</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
