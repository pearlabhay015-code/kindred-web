import { createFileRoute } from "@tanstack/react-router";
import { ResourcePage } from "@/components/site/ResourcePage";

export const Route = createFileRoute("/pyqs")({
  head: () => ({
    meta: [
      { title: "Previous Year Question Papers — CUSB" },
      { name: "description", content: "Browse and download previous year question papers (PYQs) for CUSB programmes." },
    ],
  }),
  component: () => (
    <ResourcePage
      eyebrow="Exam prep"
      title="Previous Year Question Papers"
      subtitle="Practice with past papers from every department. Updated each semester."
      intro={
        <p>
          Past question papers are a great way to prepare for semester examinations. CUSB makes
          PYQs available through the Central Library OPAC and the student portal — searchable by
          school, department and semester.
        </p>
      }
      sections={[
        {
          heading: "How to find papers",
          body: (
            <ol className="grid gap-2 list-decimal pl-5">
              <li>Sign in to the student portal.</li>
              <li>Go to <em>Library → PYQ Repository</em>.</li>
              <li>Filter by school / department / semester / year.</li>
              <li>Download as PDF.</li>
            </ol>
          ),
        },
      ]}
      links={[
        { label: "Student portal login", href: "/login" },
        { label: "Central Library", href: "/library" },
        { label: "Exam schedule", href: "/exam-schedule" },
        { label: "Examination results", href: "/results" },
      ]}
    />
  ),
});
