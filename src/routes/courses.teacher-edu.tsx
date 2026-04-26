import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/courses/teacher-edu")({
  head: () => ({
    meta: [
      { title: "4-Year ITEP — Teacher Education at CUSB" },
      { name: "description", content: "4-Year Integrated Teacher Education Programme (ITEP) under NEP 2020 — admission via NCET." },
    ],
  }),
  component: TeacherEduPage,
});

function TeacherEduPage() {
  return (
    <>
      <PageHero
        eyebrow="Special programme"
        title="4-Year Integrated Teacher Education Programme"
        subtitle="A flagship NEP-2020 initiative offered at CUSB, combining a degree and B.Ed. into a single 4-year integrated programme. Admission is through NCET conducted by NTA."
        crumbs={[
          { label: "Courses", to: "/courses" },
          { label: "Teacher Education" },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <a href="https://ncet.samarth.ac.in/" target="_blank" rel="noopener" className="btn btn-primary">Apply via NCET ↗</a>
          <Link to="/admissions" className="btn">All admissions</Link>
        </div>
      </PageHero>

      <Section eyebrow="Programme" title="What is ITEP?">
        <div className="grid lg:grid-cols-2 gap-6">
          <article className="nm-surface p-6">
            <h3 className="font-display font-bold text-lg">A degree + B.Ed., together</h3>
            <p className="mt-3 text-[var(--tx-secondary)] leading-relaxed">
              ITEP is a 4-year dual-major programme that integrates a Bachelor's degree (B.A. /
              B.Sc. / B.Com.) with a B.Ed. — preparing teachers in half the usual time.
            </p>
          </article>
          <article className="nm-surface p-6">
            <h3 className="font-display font-bold text-lg">Stages</h3>
            <ul className="mt-3 grid gap-2 list-disc pl-5 text-[var(--tx-secondary)]">
              <li>Foundational (Pre-Primary)</li>
              <li>Preparatory (Grades 1–5)</li>
              <li>Middle (Grades 6–8)</li>
              <li>Secondary (Grades 9–12)</li>
            </ul>
          </article>
        </div>
      </Section>

      <Section eyebrow="Eligibility" title="Who can apply?">
        <ul className="grid gap-2 list-disc pl-5 text-[var(--tx-secondary)]">
          <li>Class 12 with at least 50% marks (45% for reserved categories).</li>
          <li>Valid NCET 2026 score.</li>
          <li>Subject combinations as per NCET subject list.</li>
        </ul>
      </Section>
    </>
  );
}
