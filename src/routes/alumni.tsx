import { createFileRoute } from "@tanstack/react-router";
import { ResourcePage } from "@/components/site/ResourcePage";

export const Route = createFileRoute("/alumni")({
  head: () => ({
    meta: [
      { title: "Alumni — CUSB" },
      { name: "description", content: "CUSB Alumni Association — connect, give back and stay informed." },
    ],
  }),
  component: () => (
    <ResourcePage
      eyebrow="Community"
      title="CUSB Alumni"
      subtitle="A growing community of changemakers — academics, civil servants, professionals and entrepreneurs."
      intro={
        <p>
          The CUSB Alumni Association connects past students with their alma mater and with each other.
          Alumni mentor current students, organise reunions, contribute to scholarships and act as
          ambassadors for the university worldwide.
        </p>
      }
      sections={[
        {
          heading: "Get involved",
          body: (
            <ul className="grid gap-2 list-disc pl-5">
              <li>Register in the alumni directory</li>
              <li>Mentor current students from your discipline</li>
              <li>Offer internships and placements at your organisation</li>
              <li>Contribute to scholarships and lab upgrades</li>
              <li>Participate in annual alumni meet</li>
            </ul>
          ),
        },
      ]}
      links={[
        { label: "Register as alumni", href: "/register" },
        { label: "Alumni events & notices", href: "/notices" },
        { label: "Contact Alumni Cell", href: "/contact" },
      ]}
    />
  ),
});
