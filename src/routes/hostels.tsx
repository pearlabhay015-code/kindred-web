import { createFileRoute } from "@tanstack/react-router";
import { ResourcePage } from "@/components/site/ResourcePage";

export const Route = createFileRoute("/hostels")({
  head: () => ({
    meta: [
      { title: "Hostels — CUSB" },
      { name: "description", content: "On-campus hostels for boys and girls — accommodation, mess, rules and how to apply." },
    ],
  }),
  component: () => (
    <ResourcePage
      eyebrow="Campus living"
      title="Hostels"
      subtitle="On-campus accommodation for boys and girls — safe, walkable and inclusive."
      intro={
        <p>
          CUSB provides separate hostel accommodation for boys and girls within the 300-acre campus.
          Hostels include common rooms, study halls, recreation areas, mess facilities and 24×7 security.
        </p>
      }
      sections={[
        {
          heading: "Facilities",
          body: (
            <ul className="grid gap-2 list-disc pl-5">
              <li>Twin-sharing and triple-sharing rooms with study desks</li>
              <li>Hot water, Wi-Fi and ample power back-up</li>
              <li>Mess with vegetarian and non-vegetarian options</li>
              <li>Indoor and outdoor recreation, common reading rooms</li>
              <li>24×7 security and visiting wardens</li>
            </ul>
          ),
        },
        {
          heading: "How to apply",
          body: (
            <ol className="grid gap-2 list-decimal pl-5">
              <li>Confirm admission to a CUSB programme.</li>
              <li>Fill the hostel application form on your student portal.</li>
              <li>Upload identity proof and recent photographs.</li>
              <li>Pay the hostel & mess fee for the semester.</li>
            </ol>
          ),
        },
      ]}
      links={[
        { label: "Hostel application form (Portal)", href: "/login" },
        { label: "Hostel rules & code of conduct", href: "/notices" },
        { label: "Anti-Ragging cell", href: "/anti-ragging" },
        { label: "Contact Chief Warden", href: "/contact" },
      ]}
    />
  ),
});
