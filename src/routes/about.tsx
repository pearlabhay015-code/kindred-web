import { createFileRoute, Link } from "@tanstack/react-router";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { SITE } from "@/lib/site";
import campusImg from "@/assets/cusb-campus-aerial.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About CUSB — Central University of South Bihar" },
      { name: "description", content: "Founded in 2009, CUSB is a Central University on a 300-acre campus at Panchanpur, Gaya. Vision, mission, history and values." },
      { property: "og:title", content: "About CUSB" },
      { property: "og:description", content: "Vision, mission, history and milestones of the Central University of South Bihar." },
      { property: "og:image", content: campusImg },
    ],
  }),
  component: AboutPage,
});

const MILESTONES = [
  { y: "2009", t: "Established by an Act of Parliament under the CU Act 2009." },
  { y: "2014", t: "Foundation of the permanent campus at Panchanpur, Gaya." },
  { y: "2018", t: "First convocation. Schools expanded to cover 13 disciplines." },
  { y: "2020", t: "Adopted NEP 2020 framework across all programmes." },
  { y: "2024", t: "Crossed 4,100+ students and 51+ programmes across 13 schools." },
];

const VALUES = [
  { ico: "🧭", t: "Integrity", p: "Honesty in scholarship, teaching and governance." },
  { ico: "🌐", t: "Inclusivity", p: "Equal access to learning across regions, languages and abilities." },
  { ico: "🔬", t: "Inquiry", p: "Curiosity-driven research with national and global relevance." },
  { ico: "🤝", t: "Service", p: "Knowledge that serves communities and the nation." },
];

function AboutPage() {
  useScrollReveal();
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Collective Reasoning. National Purpose."
        subtitle={`A Central University under the Ministry of Education, Government of India — established in ${SITE.established}, on a permanent ${SITE.campusAcres}-acre campus at Panchanpur, Gaya.`}
        crumbs={[{ label: "About" }]}
      />

      <Section eyebrow="Vision & Mission" title="Why CUSB exists">
        <div className="grid md:grid-cols-2 gap-6">
          <article className="rev nm-surface p-7">
            <h3 className="font-display text-xl font-bold">Vision</h3>
            <p className="mt-3 text-[var(--tx-secondary)] leading-relaxed">
              To be a centre of excellence in teaching, research and innovation —
              contributing to national development and the global knowledge commons.
            </p>
          </article>
          <article className="rev nm-surface p-7">
            <h3 className="font-display text-xl font-bold">Mission</h3>
            <p className="mt-3 text-[var(--tx-secondary)] leading-relaxed">
              To foster an inclusive academic environment that promotes critical
              thinking, ethical values and interdisciplinary research, while
              empowering every learner — regardless of background or ability.
            </p>
          </article>
        </div>
      </Section>

      <Section eyebrow="Our Values" title="Four ideas we live by" centered>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((v) => (
            <div key={v.t} className="rev nm-surface-sm p-6 text-center">
              <div className="text-3xl mb-3" aria-hidden="true">{v.ico}</div>
              <h3 className="font-display font-bold">{v.t}</h3>
              <p className="mt-2 text-sm text-[var(--tx-secondary)]">{v.p}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Journey" title="Milestones">
        <ol className="grid gap-4">
          {MILESTONES.map((m) => (
            <li key={m.y} className="rev nm-surface-sm p-5 flex items-start gap-5">
              <div className="text-2xl font-extrabold font-display text-grad min-w-[72px]">{m.y}</div>
              <p className="text-[var(--tx-secondary)] leading-relaxed">{m.t}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section centered>
        <div className="nm-surface p-10 rounded-[36px] text-center max-w-4xl mx-auto rev">
          <h2 className="sec-title">Want to study or work at CUSB?</h2>
          <p className="sec-sub mx-auto">Explore admissions, leadership and campus life.</p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link to="/admissions" className="btn btn-primary">Admissions →</Link>
            <Link to="/administration" className="btn">Leadership</Link>
            <Link to="/campus" className="btn btn-ghost">Campus tour</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
