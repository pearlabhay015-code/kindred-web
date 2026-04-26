import { createFileRoute, Link } from "@tanstack/react-router";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions 2026–27 — CUSB" },
      { name: "description", content: "Apply to CUSB programmes for 2026–27 via CUET-UG and CUET-PG. Eligibility, fees, timeline and helpdesk." },
      { property: "og:title", content: "CUSB Admissions 2026–27" },
      { property: "og:description", content: "Apply via CUET-UG and CUET-PG. Open now." },
    ],
  }),
  component: AdmissionsPage,
});

const STEPS = [
  { n: 1, t: "Register on CUET", p: "Visit cuet.samarth.ac.in and create your profile." },
  { n: 2, t: "Choose CUSB & programme", p: "Select 'Central University of South Bihar' as a preferred institution." },
  { n: 3, t: "Take the CUET exam", p: "Appear for CUET-UG / CUET-PG as per your programme." },
  { n: 4, t: "Counselling & seat allotment", p: "Participate in CUSB's counselling rounds." },
  { n: 5, t: "Confirm admission", p: "Pay fees, upload documents and report to campus." },
];

function AdmissionsPage() {
  useScrollReveal();
  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title="Admissions 2026–27"
        subtitle="Applications open via CUET-UG and CUET-PG for all programmes. Step-by-step guide below."
        crumbs={[{ label: "Admissions" }]}
      >
        <div className="flex flex-wrap gap-3">
          <a href={SITE.external.cuet} target="_blank" rel="noopener" className="btn btn-primary">Apply via CUET ↗</a>
          <Link to="/courses" className="btn">Browse programmes</Link>
          <Link to="/contact" className="btn btn-ghost">Admission helpdesk</Link>
        </div>
      </PageHero>

      <Section eyebrow="How to apply" title="Five clear steps">
        <ol className="grid gap-4">
          {STEPS.map((s) => (
            <li key={s.n} className="rev nm-surface-sm p-5 flex items-start gap-5">
              <div className="w-12 h-12 rounded-full nm-inset-sm flex items-center justify-center font-display font-extrabold text-grad text-xl flex-shrink-0">
                {s.n}
              </div>
              <div>
                <h3 className="font-display font-bold">{s.t}</h3>
                <p className="text-[var(--tx-secondary)] mt-1">{s.p}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Quick info" title="Important links">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <InfoCard title="CUET Portal" desc="Official CUET application portal." href={SITE.external.cuet} external />
          <InfoCard title="Scholarships" desc="Central & state scholarships." href="/scholarship" />
          <InfoCard title="Hostels" desc="On-campus accommodation." href="/hostels" />
          <InfoCard title="Anti-Ragging" desc="A safe campus for everyone." href={SITE.external.antiRagging} external />
          <InfoCard title="Fee structure" desc="Programme-wise fee details." href="/notices" />
          <InfoCard title="Helpdesk" desc="Talk to the admissions team." href="/contact" />
        </div>
      </Section>
    </>
  );
}

function InfoCard({ title, desc, href, external }: { title: string; desc: string; href: string; external?: boolean }) {
  const inner = (
    <>
      <h3 className="font-display font-bold">{title}</h3>
      <p className="mt-1 text-sm text-[var(--tx-secondary)]">{desc}</p>
      <span className="mt-3 inline-block text-sm font-semibold text-[var(--acc)]">{external ? "Open ↗" : "Open →"}</span>
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener" className="rev nm-surface p-6 block hover:shadow-[var(--nm-out-xl)] transition-shadow">{inner}</a>
  ) : (
    <Link to={href} className="rev nm-surface p-6 block hover:shadow-[var(--nm-out-xl)] transition-shadow">{inner}</Link>
  );
}
