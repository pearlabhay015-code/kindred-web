import { createFileRoute } from "@tanstack/react-router";
import { ResourcePage } from "@/components/site/ResourcePage";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Central Library — CUSB" },
      { name: "description", content: "Central library at CUSB — books, journals, e-resources, opening hours and membership." },
    ],
  }),
  component: () => (
    <ResourcePage
      eyebrow="Knowledge"
      title="Central Library"
      subtitle="A modern library with books, journals, e-resources and quiet study spaces — open to every student and faculty member."
      intro={
        <p>
          The CUSB Central Library is the academic heart of the campus, supporting teaching and research
          across all 13 schools. It houses a growing print collection, subscribes to leading academic
          journals and provides access to thousands of e-resources via INFLIBNET N-LIST.
        </p>
      }
      sections={[
        {
          heading: "Resources",
          body: (
            <ul className="grid gap-2 list-disc pl-5">
              <li>Print collection across humanities, sciences, law and management</li>
              <li>Online databases via INFLIBNET N-LIST and other consortia</li>
              <li>Reference section with encyclopaedias, dictionaries and atlases</li>
              <li>Quiet study halls and group discussion rooms</li>
              <li>Photocopying, printing and inter-library loan support</li>
            </ul>
          ),
        },
        {
          heading: "Opening hours",
          body: (
            <ul className="grid gap-1">
              <li>Mon – Fri: 9:00 AM – 8:00 PM</li>
              <li>Saturday: 9:00 AM – 5:00 PM</li>
              <li>Sunday & holidays: Closed</li>
            </ul>
          ),
        },
      ]}
      links={[
        { label: "INFLIBNET N-LIST", href: "https://nlist.inflibnet.ac.in/", external: true },
        { label: "Library catalogue (OPAC)", href: "/login" },
        { label: "Previous year question papers", href: "/pyqs" },
        { label: "Contact Library", href: "/contact" },
      ]}
    />
  ),
});
