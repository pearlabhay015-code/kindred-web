import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { SITE } from "@/lib/site";
import { sendContactMessage } from "@/server/site.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact CUSB" },
      { name: "description", content: "Phone, email, address and contact form for the Central University of South Bihar." },
      { property: "og:title", content: "Contact CUSB" },
      { property: "og:description", content: "Reach the right office at CUSB." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  useScrollReveal();
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const fd = new FormData(e.currentTarget);
    try {
      await sendContactMessage({
        data: {
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          subject: String(fd.get("subject") || ""),
          message: String(fd.get("message") || ""),
        },
      });
      setStatus("ok");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("err");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We'd love to hear from you"
        subtitle="Reach the right office — admissions, administration, RTI or general queries."
        crumbs={[{ label: "Contact" }]}
      />

      <Section>
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8">
          <form onSubmit={onSubmit} className="nm-surface p-7 rounded-[28px] grid gap-5">
            <h2 className="font-display text-xl font-bold">Send us a message</h2>
            <Field label="Your name" name="name" required />
            <Field label="Email address" name="email" type="email" required />
            <Field label="Subject" name="subject" required />
            <div>
              <label htmlFor="cc-msg" className="block text-sm font-medium mb-2">Message</label>
              <textarea
                id="cc-msg" name="message" required minLength={10} rows={5}
                className="w-full nm-inset-sm rounded-2xl bg-transparent px-4 py-3 outline-none text-[var(--tx-primary)]"
              />
            </div>
            <button type="submit" disabled={status === "sending"} className="btn btn-primary justify-self-start disabled:opacity-60">
              {status === "sending" ? "Sending…" : "Send message →"}
            </button>
            {status === "ok" && <p className="text-sm text-[var(--acc3)]">Thanks — we'll get back to you soon.</p>}
            {status === "err" && <p className="text-sm text-[var(--acc2)]">{error || "Could not send your message."}</p>}
          </form>

          <aside className="grid gap-4">
            <InfoCard title="Phone" lines={[<a key="ph" href={`tel:${SITE.phoneTel}`} className="text-[var(--acc)] hover:underline">{SITE.phone}</a>]} />
            <InfoCard title="Admissions" lines={[<a key="ad" href={`mailto:${SITE.emails.admission}`} className="text-[var(--acc)] hover:underline">{SITE.emails.admission}</a>]} />
            <InfoCard title="Webmaster" lines={[<a key="wm" href={`mailto:${SITE.emails.webmaster}`} className="text-[var(--acc)] hover:underline">{SITE.emails.webmaster}</a>]} />
            <InfoCard title="Address" lines={[SITE.address]} />
            <a href={SITE.mapUrl} target="_blank" rel="noopener" className="btn btn-ghost text-center">Open in Google Maps ↗</a>
          </aside>
        </div>
      </Section>
    </>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  const id = `cc-${name}`;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-2">{label}{required && <span className="text-[var(--acc2)]"> *</span>}</label>
      <input
        id={id} name={name} type={type} required={required}
        className="w-full nm-inset-sm rounded-full bg-transparent px-4 py-3 outline-none text-[var(--tx-primary)]"
      />
    </div>
  );
}

function InfoCard({ title, lines }: { title: string; lines: React.ReactNode[] }) {
  return (
    <div className="nm-surface-sm p-5">
      <div className="text-xs uppercase tracking-wider text-[var(--tx-muted)]">{title}</div>
      <div className="mt-2 text-sm text-[var(--tx-primary)] grid gap-1">
        {lines.map((l, i) => (<div key={i}>{l}</div>))}
      </div>
    </div>
  );
}
