import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { SITE } from "@/lib/site";
import heroImg from "@/assets/cusb-hero.jpg";
import campusImg from "@/assets/cusb-campus-aerial.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CUSB — Central University of South Bihar" },
      { name: "description", content: "300-acre Central University at Panchanpur, Gaya. 51+ programmes across 13 schools. Admissions open 2026–27 via CUET." },
      { property: "og:title", content: "Central University of South Bihar" },
      { property: "og:description", content: "Collective Reasoning. National Purpose. Admissions open 2026–27." },
    ],
  }),
  component: HomePage,
});

const STATS = [
  { n: "180+", l: "Teachers" },
  { n: "51+", l: "Programmes" },
  { n: "4,100+", l: "Students" },
  { n: "300", l: "Acre Campus" },
];

const HIGHLIGHTS = [
  { ico: "🎓", t: "Vision", p: "To be a centre of excellence in teaching, research and innovation — contributing to national development and global knowledge creation." },
  { ico: "🤝", t: "Mission", p: "To foster an inclusive academic environment promoting critical thinking, ethical values and interdisciplinary research." },
  { ico: "💡", t: "Motto", p: "Collective Reasoning — fostering collaborative inquiry and shared wisdom across all disciplines." },
  { ico: "📘", t: "NEP 2020", p: "Aligned with the National Education Policy 2020 — holistic, multidisciplinary and skill-oriented learning." },
];

function HomePage() {
  useScrollReveal();
  useEffect(() => {
    // Re-run reveal observer when route content changes
  }, []);

  return (
    <>
      {/* HERO */}
      <header className="px-[5vw] pt-10 pb-16 lg:pt-16 lg:pb-24 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center max-w-7xl mx-auto">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full nm-inset-sm text-xs font-bold tracking-wider uppercase text-[var(--acc)]">
            <span className="w-2 h-2 rounded-full bg-[var(--acc2)] animate-pulse" />
            Admissions Open — 2026–27
          </div>
          <h1 className="mt-5 text-[clamp(2.4rem,5.5vw,4.4rem)] font-extrabold font-display leading-[1.05] tracking-tight">
            Central University<br />of <span className="text-grad">South Bihar</span>
          </h1>
          <p className="mt-5 text-lg text-[var(--tx-secondary)] max-w-xl leading-relaxed">
            A Central University under the Ministry of Education, Government of India.{" "}
            <strong>{SITE.campusAcres} acres</strong> of learning at Panchanpur, Gaya.
            Motto: <em>{SITE.motto}.</em>
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/admissions" className="btn btn-primary">Apply Now →</Link>
            <Link to="/about" className="btn">Explore CUSB</Link>
            <Link to="/courses" className="btn btn-ghost">Choose Your Path ↓</Link>
          </div>
          <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map((s) => (
              <div key={s.l} className="nm-surface-sm p-4 text-center">
                <dt className="text-2xl font-extrabold font-display text-grad">{s.n}</dt>
                <dd className="text-xs uppercase tracking-wider text-[var(--tx-muted)] mt-1">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rev">
          <div className="nm-surface p-3 rounded-[36px] overflow-hidden">
            <img
              src={heroImg}
              alt="CUSB administrative building at Panchanpur, Gaya"
              width={1280}
              height={896}
              className="w-full h-auto rounded-[28px] object-cover"
            />
          </div>
        </div>
      </header>

      {/* ABOUT */}
      <section aria-labelledby="about-h" className="px-[5vw] py-20 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto rev">
          <div className="sec-eyebrow">About the University</div>
          <h2 id="about-h" className="sec-title">Collective Reasoning,<br />National Purpose</h2>
          <p className="sec-sub mx-auto">
            CUSB is one among 54 Central Universities under the Ministry of Education, Government of India.
            Established in {SITE.established}, on a permanent {SITE.campusAcres}-acre campus at Panchanpur,
            in the historic land of Bihar.
          </p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HIGHLIGHTS.map((h) => (
            <article key={h.t} className="rev nm-surface-sm p-6 hover:shadow-[var(--nm-out-lg)] transition-shadow">
              <div className="text-3xl mb-3" aria-hidden="true">{h.ico}</div>
              <h3 className="font-display font-bold text-lg text-[var(--tx-primary)]">{h.t}</h3>
              <p className="mt-2 text-sm text-[var(--tx-secondary)] leading-relaxed">{h.p}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center rev">
          <Link to="/about" className="btn btn-ghost">Read more about CUSB →</Link>
        </div>
      </section>

      {/* QUICK NAVIGATION CARDS */}
      <section aria-labelledby="explore-h" className="px-[5vw] py-20 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto rev">
          <div className="sec-eyebrow">Explore</div>
          <h2 id="explore-h" className="sec-title">Where do you want to go?</h2>
          <p className="sec-sub mx-auto">Pick a path. Every page is designed to be clear, accessible and to the point.</p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { t: "Administration", d: "Visitor, Chancellor, Vice-Chancellor and senior leadership.", to: "/administration", ico: "🏛️" },
            { t: "Courses & Programmes", d: "51+ programmes across 13 schools — search and explore.", to: "/courses", ico: "📚" },
            { t: "Campus & Facilities", d: "Library, hostels, sports, labs, biodiversity park & more.", to: "/campus", ico: "🌳" },
            { t: "Notices & Updates", d: "Admissions, exams, events and circulars.", to: "/notices", ico: "📢" },
            { t: "Student Resources", d: "Scholarships, results, PYQs, placements, alumni and more.", to: "/students", ico: "🎒" },
            { t: "Contact CUSB", d: "Reach the right office — phones, emails and address.", to: "/contact", ico: "✉️" },
          ].map((c) => (
            <Link key={c.to} to={c.to} className="rev group nm-surface p-6 block hover:shadow-[var(--nm-out-xl)] transition-all">
              <div className="text-3xl mb-3" aria-hidden="true">{c.ico}</div>
              <h3 className="font-display font-bold text-lg group-hover:text-[var(--acc)] transition-colors">{c.t}</h3>
              <p className="mt-1.5 text-sm text-[var(--tx-secondary)] leading-relaxed">{c.d}</p>
              <span aria-hidden="true" className="block mt-4 text-sm font-semibold text-[var(--acc)]">Open →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CAMPUS BANNER */}
      <section className="px-[5vw] py-16">
        <div className="max-w-7xl mx-auto rev nm-surface p-3 rounded-[36px] overflow-hidden relative">
          <img
            src={campusImg}
            alt="Aerial view of CUSB Panchanpur campus"
            width={1280}
            height={768}
            loading="lazy"
            className="w-full h-[260px] sm:h-[420px] object-cover rounded-[28px]"
          />
          <div className="absolute inset-3 rounded-[28px] bg-gradient-to-t from-black/70 via-black/10 to-transparent flex items-end p-8">
            <div className="text-white max-w-lg">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold leading-tight">A campus built for learning.</h2>
              <p className="mt-2 text-sm sm:text-base text-white/90">Walkable, green, and inclusive — from libraries to sports grounds, designed for everyone.</p>
              <Link to="/campus" className="btn btn-primary mt-4 inline-flex">Explore Campus →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-[5vw] py-20">
        <div className="max-w-4xl mx-auto text-center nm-surface p-10 sm:p-14 rounded-[36px] rev">
          <h2 className="sec-title">Begin your journey at CUSB</h2>
          <p className="sec-sub mx-auto">
            Admissions open for 2026–27. Join thousands of students shaping India's future from the heartland of Bihar.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <a href={SITE.external.cuet} target="_blank" rel="noopener" className="btn btn-primary">Apply via CUET →</a>
            <Link to="/students" className="btn">Student Resources</Link>
            <Link to="/contact" className="btn btn-ghost">Contact Helpdesk</Link>
          </div>
        </div>
      </section>
    </>
  );
}
