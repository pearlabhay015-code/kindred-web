import { createFileRoute } from "@tanstack/react-router";
import { ResourcePage } from "@/components/site/ResourcePage";

export const Route = createFileRoute("/nss-ncc")({
  head: () => ({
    meta: [
      { title: "NSS & NCC — CUSB" },
      { name: "description", content: "National Service Scheme (NSS) and National Cadet Corps (NCC) units at CUSB." },
    ],
  }),
  component: () => (
    <ResourcePage
      eyebrow="Beyond classrooms"
      title="NSS & NCC"
      subtitle="Two flagship co-curricular wings — building leadership, service and discipline."
      intro={
        <p>
          The National Service Scheme (NSS) and National Cadet Corps (NCC) are open to every CUSB
          student. Activities range from rural-development camps and blood-donation drives to
          parades, adventure camps and disaster-management training.
        </p>
      }
      sections={[
        {
          heading: "NSS — Service learning",
          body: (
            <ul className="grid gap-2 list-disc pl-5">
              <li>Adopted villages around CUSB campus</li>
              <li>Health, hygiene & literacy drives</li>
              <li>Annual special camp (7 days)</li>
              <li>Certificate on completion of 240+ hours</li>
            </ul>
          ),
        },
        {
          heading: "NCC — Leadership in uniform",
          body: (
            <ul className="grid gap-2 list-disc pl-5">
              <li>Drill, weapons training and obstacle courses</li>
              <li>Republic Day camps and parades</li>
              <li>Adventure & trekking expeditions</li>
              <li>A / B / C certificates with bonus marks in many recruitments</li>
            </ul>
          ),
        },
      ]}
      links={[
        { label: "Register for NSS / NCC", href: "/login" },
        { label: "Notices from NSS / NCC units", href: "/notices" },
        { label: "Contact Programme Officer", href: "/contact" },
      ]}
    />
  ),
});
