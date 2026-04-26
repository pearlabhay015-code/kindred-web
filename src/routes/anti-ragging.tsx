import { createFileRoute } from "@tanstack/react-router";
import { ResourcePage } from "@/components/site/ResourcePage";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/anti-ragging")({
  head: () => ({
    meta: [
      { title: "Anti-Ragging — CUSB" },
      { name: "description", content: "CUSB has a zero-tolerance policy on ragging. Helpline numbers, complaint mechanism and anti-ragging cell." },
    ],
  }),
  component: () => (
    <ResourcePage
      eyebrow="Safety"
      title="Anti-Ragging"
      subtitle="A safe campus is a non-negotiable promise. CUSB enforces a zero-tolerance policy on ragging."
      intro={
        <p>
          As per UGC regulations, ragging in any form is strictly prohibited at CUSB. Any complaint of
          ragging is investigated by the Anti-Ragging Committee within 24 hours, and disciplinary
          action — including expulsion and FIR — is taken against offenders.
        </p>
      }
      sections={[
        {
          heading: "How to report",
          body: (
            <ol className="grid gap-2 list-decimal pl-5">
              <li>Call the National Anti-Ragging Helpline: <strong>1800-180-5522</strong> (24×7).</li>
              <li>File an online complaint at antiragging.in.</li>
              <li>Email the CUSB Anti-Ragging Cell or speak to the Chief Warden.</li>
              <li>All complaints are kept strictly confidential.</li>
            </ol>
          ),
        },
        {
          heading: "Your rights",
          body: (
            <ul className="grid gap-2 list-disc pl-5">
              <li>You will not face any retaliation for reporting ragging.</li>
              <li>The university will provide counselling and support.</li>
              <li>Action against offenders is time-bound and transparent.</li>
            </ul>
          ),
        },
      ]}
      links={[
        { label: "National Anti-Ragging Portal", href: SITE.external.antiRagging, external: true },
        { label: "Hostels", href: "/hostels" },
        { label: "Contact CUSB", href: "/contact" },
      ]}
    />
  ),
});
