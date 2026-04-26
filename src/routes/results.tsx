import { createFileRoute } from "@tanstack/react-router";
import { ResourcePage } from "@/components/site/ResourcePage";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Examination Results — CUSB" },
      { name: "description", content: "Check semester examination results, gradesheets and revaluation status." },
    ],
  }),
  component: () => (
    <ResourcePage
      eyebrow="Examinations"
      title="Examination Results"
      subtitle="Check your semester results, download gradesheets and apply for revaluation."
      intro={
        <p>
          All semester results are published through the official student portal. Use your enrolment
          number and date of birth to log in. Provisional gradesheets are available immediately;
          final mark-sheets are issued by the Controller of Examinations within 60 days.
        </p>
      }
      sections={[
        {
          heading: "How to check",
          body: (
            <ol className="grid gap-2 list-decimal pl-5">
              <li>Sign in at the Samarth student portal.</li>
              <li>Go to <em>Examinations → Results</em>.</li>
              <li>Select session and semester and download your provisional gradesheet.</li>
            </ol>
          ),
        },
        {
          heading: "Revaluation",
          body: (
            <p>
              Apply for revaluation within 15 days of result declaration via the same portal. Revaluation
              fees are payable per paper. Final outcomes are notified within 30 days.
            </p>
          ),
        },
      ]}
      links={[
        { label: "Samarth student portal", href: SITE.external.samarthStudent, external: true },
        { label: "Exam schedule", href: "/exam-schedule" },
        { label: "Previous year question papers", href: "/pyqs" },
        { label: "Contact Examination Section", href: "/contact" },
      ]}
    />
  ),
});
