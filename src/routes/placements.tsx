import { createFileRoute } from "@tanstack/react-router";
import { ResourcePage } from "@/components/site/ResourcePage";

export const Route = createFileRoute("/placements")({
  head: () => ({
    meta: [
      { title: "Placements & Careers — CUSB" },
      { name: "description", content: "Training & Placement Cell, recruiters, internships and career services at CUSB." },
    ],
  }),
  component: () => (
    <ResourcePage
      eyebrow="Career"
      title="Placements & Careers"
      subtitle="The Training & Placement Cell connects students with internships, jobs and entrepreneurship opportunities."
      intro={
        <p>
          The CUSB Training & Placement Cell organises pre-placement training, soft-skills workshops,
          recruitment drives and industry interactions throughout the year. Students from every
          discipline — from sciences to humanities — are supported.
        </p>
      }
      sections={[
        {
          heading: "What we do",
          body: (
            <ul className="grid gap-2 list-disc pl-5">
              <li>On-campus and virtual recruitment drives</li>
              <li>Aptitude, GD and personal-interview training</li>
              <li>CV reviews and 1:1 mentoring</li>
              <li>Internship facilitation in partner organisations</li>
              <li>Workshops on entrepreneurship and higher studies</li>
            </ul>
          ),
        },
        {
          heading: "Recent recruiters",
          body: (
            <p>
              CUSB students have been recruited by leading public sector undertakings, banks, NGOs,
              EdTech firms, research institutions and government agencies including UPSC, BPSC and
              SSC services.
            </p>
          ),
        },
      ]}
      links={[
        { label: "Register on Placement Portal", href: "/login" },
        { label: "Notices from Placement Cell", href: "/notices" },
        { label: "Alumni network", href: "/alumni" },
        { label: "Contact Placement Officer", href: "/contact" },
      ]}
    />
  ),
});
