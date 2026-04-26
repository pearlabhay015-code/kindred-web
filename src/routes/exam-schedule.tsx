import { createFileRoute } from "@tanstack/react-router";
import { ResourcePage } from "@/components/site/ResourcePage";

export const Route = createFileRoute("/exam-schedule")({
  head: () => ({
    meta: [
      { title: "Exam Schedule — CUSB" },
      { name: "description", content: "Semester exam schedule, date-sheets and important examination notices at CUSB." },
    ],
  }),
  component: () => (
    <ResourcePage
      eyebrow="Examinations"
      title="Exam Schedule"
      subtitle="Date-sheets, hall-ticket release and important reminders for semester examinations."
      intro={
        <p>
          Semester exam date-sheets are released by the Controller of Examinations at least three weeks
          before the start of exams. Hall tickets are made available on the student portal one week
          before exams begin.
        </p>
      }
      sections={[
        {
          heading: "Typical timeline",
          body: (
            <ul className="grid gap-2 list-disc pl-5">
              <li><strong>Even semester</strong> exams: April – May</li>
              <li><strong>Odd semester</strong> exams: November – December</li>
              <li>Supplementary exams: as per schedule</li>
              <li>Practical exams: 1–2 weeks before theory papers</li>
            </ul>
          ),
        },
        {
          heading: "Things to remember",
          body: (
            <ul className="grid gap-2 list-disc pl-5">
              <li>Carry a printed hall ticket and a valid photo ID.</li>
              <li>Reach the exam hall 30 minutes before the start time.</li>
              <li>Mobile phones, smart-watches and bags are not allowed inside the hall.</li>
            </ul>
          ),
        },
      ]}
      links={[
        { label: "Latest exam notices", href: "/notices" },
        { label: "Examination results", href: "/results" },
        { label: "Previous year question papers", href: "/pyqs" },
        { label: "Contact Examination Section", href: "/contact" },
      ]}
    />
  ),
});
