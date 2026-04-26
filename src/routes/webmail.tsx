import { createFileRoute } from "@tanstack/react-router";
import { ResourcePage } from "@/components/site/ResourcePage";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/webmail")({
  head: () => ({
    meta: [
      { title: "Webmail — CUSB" },
      { name: "description", content: "Access your CUSB email account." },
    ],
  }),
  component: () => (
    <ResourcePage
      eyebrow="Utility"
      title="CUSB Webmail"
      subtitle="Faculty, staff and students with an official CUSB email can sign in here."
      intro={
        <p>
          Official CUSB webmail accounts are issued to faculty, staff and selected research scholars.
          Students primarily use the Samarth student portal for university communication.
        </p>
      }
      links={[
        { label: "Webmaster (issue with login)", href: `mailto:${SITE.emails.webmaster}`, external: true },
        { label: "Samarth Student Portal", href: SITE.external.samarthStudent, external: true },
        { label: "Samarth Employee Portal", href: SITE.external.samarthEmployee, external: true },
        { label: "Contact IT helpdesk", href: "/contact" },
      ]}
    />
  ),
});
