import { createFileRoute } from "@tanstack/react-router";
import { ResourcePage } from "@/components/site/ResourcePage";

export const Route = createFileRoute("/convocation")({
  head: () => ({
    meta: [
      { title: "Convocation — CUSB" },
      { name: "description", content: "CUSB Annual Convocation — degrees, gold medals and celebration." },
    ],
  }),
  component: () => (
    <ResourcePage
      eyebrow="Celebrations"
      title="Convocation"
      subtitle="Where every student takes their degree home — and CUSB celebrates a year of academic excellence."
      intro={
        <p>
          The Annual Convocation is the most important ceremonial event of the CUSB calendar. Degrees,
          medals and prizes are conferred by the Visitor or Chancellor in the presence of family,
          faculty and dignitaries.
        </p>
      }
      sections={[
        {
          heading: "What to expect",
          body: (
            <ul className="grid gap-2 list-disc pl-5">
              <li>Award of degrees from UG to Ph.D.</li>
              <li>Gold medals for top rankers across schools</li>
              <li>Convocation address by a leading academic / public figure</li>
              <li>Invited guests, alumni and parents</li>
            </ul>
          ),
        },
        {
          heading: "How to register",
          body: (
            <p>
              Eligible graduating students are notified by the Examination Section. Registration is
              completed via the student portal — please book early as on-campus seating is limited.
            </p>
          ),
        },
      ]}
      links={[
        { label: "Convocation notices", href: "/notices" },
        { label: "Examination results", href: "/results" },
        { label: "Contact Examination Section", href: "/contact" },
      ]}
    />
  ),
});
