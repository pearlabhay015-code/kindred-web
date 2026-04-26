import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { getFacility } from "@/server/site.functions";

export const Route = createFileRoute("/campus/$slug")({
  loader: async ({ params }) => {
    const f = await getFacility({ data: { slug: params.slug } });
    if (!f) throw notFound();
    return f;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} — CUSB Campus` : "Facility — CUSB" },
      { name: "description", content: loaderData?.short_description ?? "Campus facility at CUSB." },
      { property: "og:title", content: loaderData?.name ?? "CUSB Facility" },
      { property: "og:description", content: loaderData?.short_description ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="px-[5vw] py-20 text-center">
      <h1 className="sec-title">Facility not found</h1>
      <Link to="/campus" className="btn btn-primary mt-6">Back to campus</Link>
    </div>
  ),
  component: FacilityPage,
});

function FacilityPage() {
  const f = Route.useLoaderData();
  return (
    <>
      <PageHero
        eyebrow="Campus Facility"
        title={f.name}
        subtitle={f.short_description ?? undefined}
        crumbs={[
          { label: "Campus", to: "/campus" },
          { label: f.name },
        ]}
      />

      <Section>
        <div className="grid lg:grid-cols-3 gap-6">
          <article className="lg:col-span-2 nm-surface p-7 rounded-[28px]">
            <h2 className="font-display text-xl font-bold mb-3">About this facility</h2>
            <p className="text-[var(--tx-secondary)] leading-relaxed whitespace-pre-line">
              {f.long_description ?? f.short_description ?? "Detailed information will be updated soon."}
            </p>
          </article>
          <aside className="nm-surface-sm p-6">
            <h3 className="font-display font-bold">Highlights</h3>
            {f.highlights && f.highlights.length > 0 ? (
              <ul className="mt-3 grid gap-2 text-sm">
                {f.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="text-[var(--acc)]" aria-hidden="true">▸</span>
                    <span className="text-[var(--tx-secondary)]">{h}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-[var(--tx-muted)]">More details coming soon.</p>
            )}
            <Link to="/campus" className="btn mt-6 w-full">All facilities</Link>
          </aside>
        </div>
      </Section>
    </>
  );
}
