import { createFileRoute } from "@tanstack/react-router";
import { ResourcePage } from "@/components/site/ResourcePage";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "Downloads — CUSB" },
      { name: "description", content: "Download official CUSB forms, circulars, formats and templates." },
    ],
  }),
  component: () => (
    <ResourcePage
      eyebrow="Utility"
      title="Downloads"
      subtitle="Forms, formats, circulars and templates — everything in one place."
      intro={
        <p>
          The Downloads section provides PDF and DOC versions of commonly requested forms — including
          leave applications, no-objection certificates, hostel forms and academic templates.
        </p>
      }
      sections={[
        {
          heading: "Common downloads",
          body: (
            <ul className="grid gap-2 list-disc pl-5">
              <li>Leave application form (Faculty / Staff / Students)</li>
              <li>No Objection Certificate (NOC) format</li>
              <li>Bonafide certificate request form</li>
              <li>Hostel application & undertaking</li>
              <li>Migration / Transfer certificate request</li>
              <li>Ph.D. thesis submission templates</li>
            </ul>
          ),
        },
      ]}
      links={[
        { label: "Notices & circulars", href: "/notices" },
        { label: "Student portal", href: "/login" },
        { label: "Contact administration", href: "/contact" },
      ]}
    />
  ),
});
