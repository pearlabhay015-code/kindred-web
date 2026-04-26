import { createFileRoute, Link } from "@tanstack/react-router";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { listFacilities } from "@/server/site.functions";
import campusImg from "@/assets/cusb-campus-aerial.jpg";

export const Route = createFileRoute("/campus")({
  head: () => ({
    meta: [
      { title: "Campus & Facilities — CUSB" },
      { name: "description", content: "300-acre green campus at Panchanpur, Gaya. Library, hostels, sports, labs, biodiversity park and more." },
      { property: "og:title", content: "CUSB Campus" },
      { property: "og:description", content: "Walkable, green, inclusive campus — built for learning." },
      { property: "og:image", content: campusImg },
    ],
  }),
  loader: () => listFacilities(),
  component: CampusPage,
});

function CampusPage() {
  useScrollReveal();
  const facilities = Route.useLoaderData();
  return (
    <>
      <PageHero
        eyebrow="Campus"
        title="A campus built for learning"
        subtitle="Walkable, green, inclusive — from libraries and labs to sports grounds and a biodiversity park. 300 acres at Panchanpur, Gaya."
        crumbs={[{ label: "Campus" }]}
      />

      <Section>
        <div className="rev nm-surface p-3 rounded-[36px] overflow-hidden mb-12">
          <img
            src={campusImg}
            alt="Aerial view of CUSB Panchanpur campus"
            width={1280}
            height={620}
            className="w-full h-[260px] sm:h-[420px] object-cover rounded-[28px]"
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((f) => (
            <Link
              key={f.slug}
              to="/campus/$slug"
              params={{ slug: f.slug }}
              className="rev nm-surface p-6 block hover:shadow-[var(--nm-out-xl)] transition-shadow"
            >
              <h3 className="font-display font-bold text-lg">{f.name}</h3>
              {f.short_description && (
                <p className="mt-2 text-sm text-[var(--tx-secondary)] leading-relaxed">{f.short_description}</p>
              )}
              <span className="mt-4 inline-block text-sm font-semibold text-[var(--acc)]">Learn more →</span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
