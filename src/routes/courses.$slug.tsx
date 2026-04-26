import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { getDepartment } from "@/server/site.functions";

export const Route = createFileRoute("/courses/$slug")({
  loader: async ({ params }) => {
    const dept = await getDepartment({ data: { slug: params.slug } });
    if (!dept) throw notFound();
    return dept;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} — CUSB` : "Department — CUSB" },
      { name: "description", content: loaderData?.description ?? "Department at the Central University of South Bihar." },
      { property: "og:title", content: loaderData?.name ?? "CUSB Department" },
      { property: "og:description", content: loaderData?.description ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="px-[5vw] py-20 text-center">
      <h1 className="sec-title">Department not found</h1>
      <p className="sec-sub mx-auto">We couldn't find that department.</p>
      <Link to="/courses" className="btn btn-primary mt-6">All courses</Link>
    </div>
  ),
  component: DeptPage,
});

function DeptPage() {
  const d = Route.useLoaderData();
  return (
    <>
      <PageHero
        eyebrow={d.icon ? `${d.icon} Department` : "Department"}
        title={d.name}
        subtitle={d.description ?? undefined}
        crumbs={[
          { label: "Courses", to: "/courses" },
          { label: d.name },
        ]}
      />

      <Section>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 nm-surface p-7 rounded-[28px]">
            <h2 className="font-display text-xl font-bold mb-4">Programmes offered</h2>
            {d.programmes && d.programmes.length > 0 ? (
              <ul className="grid sm:grid-cols-2 gap-3">
                {d.programmes.map((p) => (
                  <li key={p} className="nm-inset-sm rounded-xl px-4 py-3 text-sm">
                    <span className="text-[var(--acc)] mr-2" aria-hidden="true">▸</span>
                    {p}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[var(--tx-muted)]">Programme list will be updated soon.</p>
            )}
          </div>
          <aside className="nm-surface-sm p-6">
            <h3 className="font-display font-bold">Department contact</h3>
            {d.hod && (
              <p className="mt-3 text-sm">
                <span className="block text-xs uppercase tracking-wider text-[var(--tx-muted)]">Head of Department</span>
                <span className="text-[var(--tx-primary)] font-medium">{d.hod}</span>
              </p>
            )}
            {d.contact_email && (
              <p className="mt-3 text-sm">
                <span className="block text-xs uppercase tracking-wider text-[var(--tx-muted)]">Email</span>
                <a href={`mailto:${d.contact_email}`} className="text-[var(--acc)] hover:underline">{d.contact_email}</a>
              </p>
            )}
            <Link to="/admissions" className="btn btn-primary mt-6 w-full">Apply 2026–27 →</Link>
          </aside>
        </div>
      </Section>
    </>
  );
}
