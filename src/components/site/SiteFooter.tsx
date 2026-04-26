import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer
      role="contentinfo"
      className="mt-20 px-[5vw] py-14 border-t"
      style={{
        background: "var(--nm-bg-sec)",
        borderColor: "var(--nm-border-b)",
        color: "var(--tx-secondary)",
      }}
    >
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="text-xl font-extrabold font-display text-[var(--tx-primary)]">{SITE.name}</div>
          <p className="mt-3 text-sm leading-relaxed max-w-md">
            An institution of higher learning under the Ministry of Education, Government of India —
            committed to excellence, equity, and national development.
          </p>
          <div className="mt-5 flex flex-col gap-1.5 text-sm">
            <a href={`tel:${SITE.phoneTel}`} className="hover:text-[var(--acc)]">☎ {SITE.phone}</a>
            <a href={`mailto:${SITE.emails.admission}`} className="hover:text-[var(--acc)]">✉ {SITE.emails.admission}</a>
            <a href={`mailto:${SITE.emails.webmaster}`} className="hover:text-[var(--acc)]">✉ {SITE.emails.webmaster}</a>
            <span>📍 {SITE.address}</span>
          </div>
        </div>

        <FooterCol title="About" links={[
          { l: "The University", to: "/about" },
          { l: "Vision & Mission", to: "/about" },
          { l: "Administration", to: "/administration" },
        ]} />
        <FooterCol title="Academics" links={[
          { l: "All Departments", to: "/courses" },
          { l: "Notices", to: "/notices" },
          { l: "Campus", to: "/campus" },
        ]} />
        <FooterCol title="Students" links={[
          { l: "Admissions 2026–27", to: "/admissions" },
          { l: "Quick Links", to: "/students" },
          { l: "Login", to: "/login" },
          { l: "Register", to: "/register" },
        ]} />
      </div>

      <div
        className="max-w-7xl mx-auto mt-10 pt-6 border-t flex flex-col sm:flex-row gap-3 justify-between items-center text-xs"
        style={{ borderColor: "var(--nm-border-b)" }}
      >
        <span>© {new Date().getFullYear()} {SITE.name}, Gaya, India. All rights reserved.</span>
        <div className="flex gap-2" role="list" aria-label="Accreditations">
          {["NAAC", "NEP 2020", "Viksit Bharat"].map((b) => (
            <span key={b} className="px-3 py-1 rounded-full nm-inset-sm text-[.7rem] font-semibold">{b}</span>
          ))}
        </div>
        <div className="flex gap-3">
          <a href={SITE.social.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="hover:text-[var(--acc)]">FB</a>
          <a href={SITE.social.twitter} target="_blank" rel="noopener" aria-label="X (Twitter)" className="hover:text-[var(--acc)]">X</a>
          <a href={SITE.social.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="hover:text-[var(--acc)]">IG</a>
          <a href={SITE.social.youtube} target="_blank" rel="noopener" aria-label="YouTube" className="hover:text-[var(--acc)]">YT</a>
          <a href={SITE.social.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" className="hover:text-[var(--acc)]">in</a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { l: string; to: string }[] }) {
  return (
    <div>
      <div className="text-sm font-bold text-[var(--tx-primary)] mb-3 font-display tracking-wide">{title}</div>
      <ul className="flex flex-col gap-2 text-sm">
        {links.map((x) => (
          <li key={x.to + x.l}>
            <Link to={x.to} className="hover:text-[var(--acc)]">{x.l}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
