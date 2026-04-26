import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { listSchoolsAndDepartments } from "@/server/site.functions";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses & Programmes — CUSB" },
      { name: "description", content: "Explore 51+ programmes across 13 schools at CUSB. Search departments, programmes and HoDs." },
      { property: "og:title", content: "CUSB Courses" },
      { property: "og:description", content: "Search 51+ programmes across 13 schools at the Central University of South Bihar." },
    ],
  }),
  loader: () => listSchoolsAndDepartments(),
  component: CoursesPage,
});

function CoursesPage() {
  useScrollReveal();
  const data = Route.useLoaderData();
  const [q, setQ] = useState("");
  const [schoolFilter, setSchoolFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    const lower = q.toLowerCase().trim();
    return data.departments.filter((d) => {
      if (schoolFilter !== "all" && d.school_slug !== schoolFilter) return false;
      if (!lower) return true;
      return (
        d.name.toLowerCase().includes(lower) ||
        (d.description ?? "").toLowerCase().includes(lower) ||
        (d.programmes ?? []).some((p) => p.toLowerCase().includes(lower))
      );
    });
  }, [q, schoolFilter, data.departments]);

  return (
    <>
      <PageHero
        eyebrow="Academics"
        title="Courses & Programmes"
        subtitle="51+ programmes across 13 schools — UG, PG, M.Phil. and Ph.D. Search by name, programme or department."
        crumbs={[{ label: "Courses" }]}
      />

      <Section>
        <div className="grid md:grid-cols-[1fr_240px] gap-4 mb-8">
          <div className="nm-inset-sm rounded-full">
            <label htmlFor="course-q" className="sr-only">Search programmes</label>
            <input
              id="course-q"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              type="search"
              placeholder="Search e.g. ‘physics’, ‘law’, ‘education’…"
              className="w-full bg-transparent px-5 py-3 outline-none text-[var(--tx-primary)]"
            />
          </div>
          <div className="nm-inset-sm rounded-full">
            <label htmlFor="course-school" className="sr-only">Filter by school</label>
            <select
              id="course-school"
              value={schoolFilter}
              onChange={(e) => setSchoolFilter(e.target.value)}
              className="w-full bg-transparent px-5 py-3 outline-none text-[var(--tx-primary)]"
            >
              <option value="all">All Schools</option>
              {data.schools.map((s) => (
                <option key={s.slug} value={s.slug}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-sm text-[var(--tx-muted)] mb-6">
          Showing <strong>{filtered.length}</strong> of {data.departments.length} departments.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((d) => (
            <Link
              key={d.slug}
              to="/courses/$slug"
              params={{ slug: d.slug }}
              className="rev nm-surface p-6 block hover:shadow-[var(--nm-out-xl)] transition-shadow"
            >
              <div className="text-2xl mb-3" aria-hidden="true">{d.icon ?? "📘"}</div>
              <h3 className="font-display font-bold text-lg">{d.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-wider text-[var(--tx-muted)]">
                {data.schools.find((s) => s.slug === d.school_slug)?.short_name ?? d.school_slug}
              </p>
              {d.description && (
                <p className="mt-3 text-sm text-[var(--tx-secondary)] line-clamp-3">{d.description}</p>
              )}
              <span className="mt-4 inline-block text-sm font-semibold text-[var(--acc)]">Open department →</span>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-[var(--tx-muted)] py-12">No programmes match your search. Try different keywords.</p>
        )}
      </Section>
    </>
  );
}
