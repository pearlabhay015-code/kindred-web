import { createFileRoute } from "@tanstack/react-router";
import { ResourcePage } from "@/components/site/ResourcePage";

export const Route = createFileRoute("/prospectus")({
  head: () => ({
    meta: [
      { title: "Admission Prospectus — CUSB" },
      { name: "description", content: "CUSB Admission Prospectus / Bulletin 2026–27." },
    ],
  }),
  component: () => (
    <ResourcePage
      eyebrow="Admissions"
      title="Admission Prospectus 2026–27"
      subtitle="Everything you need to know about CUSB programmes, eligibility, fees and the admission process."
      intro={
        <p>
          The official Admission Prospectus / Information Bulletin lists every programme offered by
          CUSB along with eligibility criteria, intake, fee structure and key dates. The bulletin is
          updated each admission cycle.
        </p>
      }
      sections={[
        {
          heading: "What's inside",
          body: (
            <ul className="grid gap-2 list-disc pl-5">
              <li>Programme list with intake and fees</li>
              <li>Eligibility for each course</li>
              <li>CUET subject mapping</li>
              <li>Reservation and category-wise rules</li>
              <li>Important dates and counselling schedule</li>
            </ul>
          ),
        },
      ]}
      links={[
        { label: "Latest admission notices", href: "/notices" },
        { label: "How to apply (5 steps)", href: "/admissions" },
        { label: "All courses", href: "/courses" },
        { label: "Contact admissions", href: "/contact" },
      ]}
    />
  ),
});
