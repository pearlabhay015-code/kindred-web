import { createFileRoute } from "@tanstack/react-router";
import { ResourcePage } from "@/components/site/ResourcePage";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/scholarship")({
  head: () => ({
    meta: [
      { title: "Scholarships — CUSB" },
      { name: "description", content: "Central, state and CUSB scholarships for SC/ST/OBC, EWS, minority and merit-cum-means students." },
    ],
  }),
  component: () => (
    <ResourcePage
      eyebrow="Scholarships"
      title="Scholarships at CUSB"
      subtitle="Central, state and CUSB-administered scholarships — designed so finances never come in the way of learning."
      intro={
        <p>
          CUSB students can apply for a wide range of scholarships through the National Scholarships
          Portal (NSP) and via state and university channels. Applications are typically open between
          July and November every academic year.
        </p>
      }
      sections={[
        {
          heading: "Major scholarship schemes",
          body: (
            <ul className="grid gap-2 list-disc pl-5">
              <li>Post-Matric Scholarship for SC / ST / OBC students</li>
              <li>Central Sector Scheme for College & University students</li>
              <li>Merit-cum-Means Scholarship for Minority students</li>
              <li>National Fellowship for Higher Education (UGC)</li>
              <li>Junior Research Fellowship (UGC-JRF / CSIR)</li>
              <li>State-government scholarships (Bihar & home states)</li>
            </ul>
          ),
        },
        {
          heading: "How to apply",
          body: (
            <ol className="grid gap-2 list-decimal pl-5">
              <li>Register on the National Scholarships Portal.</li>
              <li>Choose CUSB and your programme; upload required documents.</li>
              <li>Visit the Dean Students' Welfare office for verification.</li>
              <li>Track status on NSP and your CUSB student dashboard.</li>
            </ol>
          ),
        },
      ]}
      links={[
        { label: "National Scholarships Portal", href: SITE.external.scholarships, external: true },
        { label: "Bihar State Scholarships", href: "https://www.bcebcwelfare.bih.nic.in/", external: true },
        { label: "Notices & circulars", href: "/notices" },
        { label: "Contact Dean Students' Welfare", href: "/contact" },
      ]}
    />
  ),
});
