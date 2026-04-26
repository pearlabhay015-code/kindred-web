import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { listNotices } from "@/server/site.functions";

export const Route = createFileRoute("/notices")({
  head: () => ({
    meta: [
      { title: "Notices & Updates — CUSB" },
      { name: "description", content: "All notices, circulars, exam updates, recruitment notifications and admission bulletins from CUSB." },
      { property: "og:title", content: "CUSB Notices" },
      { property: "og:description", content: "Latest notices, exam updates and circulars from CUSB." },
    ],
  }),
  loader: () => listNotices(),
  component: NoticesPage,
});

function NoticesPage() {
  useScrollReveal();
  const notices = Route.useLoaderData();
  const [filter, setFilter] = useState<string>("all");
  const [q, setQ] = useState("");

  const categories = useMemo(() => {
    const set = new Set<string>();
    notices.forEach((n) => set.add(n.category));
    return Array.from(set);
  }, [notices]);

  const filtered = useMemo(() => {
    return notices.filter((n) => {
      if (filter !== "all" && n.category !== filter) return false;
      if (q && !n.title.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [notices, filter, q]);

  return (
    <>
      <PageHero
        eyebrow="Notices"
        title="Notices & Updates"
        subtitle="Admission bulletins, exam updates, circulars and event announcements."
        crumbs={[{ label: "Notices" }]}
      />

      <Section>
        <div className="grid md:grid-cols-[1fr_240px] gap-4 mb-8">
          <div className="nm-inset-sm rounded-full">
            <label htmlFor="notice-q" className="sr-only">Search notices</label>
            <input
              id="notice-q"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search notices…"
              className="w-full bg-transparent px-5 py-3 outline-none"
            />
          </div>
          <div className="nm-inset-sm rounded-full">
            <label htmlFor="notice-cat" className="sr-only">Filter by category</label>
            <select
              id="notice-cat"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full bg-transparent px-5 py-3 outline-none"
            >
              <option value="all">All categories</option>
              {categories.map((c) => (<option key={c} value={c}>{c}</option>))}
            </select>
          </div>
        </div>

        <ul className="grid gap-4">
          {filtered.map((n) => (
            <li key={n.id} className="rev nm-surface-sm p-5 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-3 sm:min-w-[180px]">
                <span className="px-3 py-1 rounded-full nm-inset-sm text-[.65rem] font-bold uppercase tracking-wider text-[var(--acc)]">
                  {n.category}
                </span>
                {n.is_new && (
                  <span className="px-2 py-px text-[.6rem] font-semibold uppercase rounded-md bg-[var(--acc2)] text-white">NEW</span>
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-[var(--tx-primary)]">{n.title}</p>
                {n.body && <p className="text-sm text-[var(--tx-secondary)] mt-1">{n.body}</p>}
              </div>
              <div className="text-xs text-[var(--tx-muted)] sm:min-w-[120px] sm:text-right">
                {n.date_label}
                {n.url && (
                  <a href={n.url} target="_blank" rel="noopener" className="block mt-1 text-[var(--acc)] hover:underline">Open ↗</a>
                )}
              </div>
            </li>
          ))}
        </ul>

        {filtered.length === 0 && (
          <p className="text-center text-[var(--tx-muted)] py-12">No notices match your filters.</p>
        )}
      </Section>
    </>
  );
}
