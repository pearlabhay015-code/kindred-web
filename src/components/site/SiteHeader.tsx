import { Link } from "@tanstack/react-router";
import { useState, useEffect, useRef, FormEvent } from "react";
import { useTheme, useFontSize } from "@/hooks/use-theme";
import { searchSite } from "@/server/site.functions";
import { NAV_LINKS, SITE, TICKER_ITEMS } from "@/lib/site";
import logo from "@/assets/cusb-logo.png";

type SearchResults = Awaited<ReturnType<typeof searchSite>> | null;

export function SiteHeader() {
  const { theme, toggle } = useTheme();
  const { size, change } = useFontSize();
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [q, setQ] = useState("");
  const [results, setResults] = useState<SearchResults>(null);
  const [loading, setLoading] = useState(false);
  const [tickerPaused, setTickerPaused] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 50);
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (searchOpen) setSearchOpen(false);
        if (drawer) setDrawer(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [searchOpen, drawer]);

  async function onSearch(e: FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    setLoading(true);
    try {
      const r = await searchSite({ data: { q: q.trim() } });
      setResults(r);
    } catch {
      setResults({ notices: [], departments: [], facilities: [], faqs: [] });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* TICKER */}
      <div
        className="fixed top-0 left-0 right-0 z-[1100] flex items-center text-white"
        style={{
          height: "var(--ticker-h)",
          background: "var(--grad-warm)",
          boxShadow: "0 4px 18px rgba(232,73,106,.35), 0 2px 0 rgba(255,255,255,.25) inset",
        }}
        role="region"
        aria-label="Latest announcements"
      >
        <span className="flex items-center gap-1 px-3 h-full text-[.6rem] font-bold tracking-[.18em] uppercase font-display whitespace-nowrap bg-white/20 border-r border-white/30">
          📢 Latest
        </span>
        <button
          type="button"
          onClick={() => setTickerPaused((p) => !p)}
          aria-pressed={tickerPaused}
          aria-label={tickerPaused ? "Resume announcements" : "Pause announcements"}
          className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 border border-white/40 text-white text-xs flex items-center justify-center mx-2 hover:bg-white/35"
        >
          {tickerPaused ? "▶" : "⏸"}
        </button>
        <div className="flex-1 overflow-hidden">
          <div
            className="flex items-center w-max"
            style={{
              animation: "tickerRoll 50s linear infinite",
              animationPlayState: tickerPaused ? "paused" : "running",
            }}
          >
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((it, i) => (
              <Link
                key={i}
                to={it.href}
                className="inline-flex items-center gap-2 px-6 h-9 text-sm font-medium text-white/95 whitespace-nowrap hover:text-white"
              >
                {it.text}
                {it.isNew && (
                  <span className="px-1.5 py-px text-[.55rem] font-semibold tracking-wider uppercase rounded-md bg-white/30 border border-white/50">
                    NEW
                  </span>
                )}
                <span className="w-1 h-1 rounded-full bg-white/50 ml-2" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* TOPBAR */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center px-[5vw] py-2 text-sm border-b"
        style={{
          marginTop: "var(--ticker-h)",
          background: "var(--nm-bg-alt)",
          color: "var(--tx-secondary)",
          borderColor: "var(--nm-border-b)",
          minHeight: "var(--topbar-h)",
        }}
      >
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 overflow-hidden">
          <a href={`tel:${SITE.phoneTel}`} className="hover:text-[var(--acc)]">{SITE.phone}</a>
          <span className="opacity-30">|</span>
          <a href={`mailto:${SITE.emails.admission}`} className="hover:text-[var(--acc)]">{SITE.emails.admission}</a>
          <span className="opacity-30">|</span>
          <a href={SITE.external.rti} target="_blank" rel="noopener" className="hover:text-[var(--acc)]">RTI</a>
          <span className="opacity-30">|</span>
          <a href={SITE.external.naac} target="_blank" rel="noopener" className="hover:text-[var(--acc)]">NAAC</a>
        </div>
        <div className="flex items-center gap-3 justify-start md:justify-end">
          <div className="flex items-center gap-2" role="group" aria-label="Text size">
            <button
              onClick={() => change(-1)}
              disabled={size === 0}
              className="w-7 h-7 rounded-lg nm-surface-sm text-sm font-bold disabled:opacity-50"
              aria-label="Decrease text size"
            >−</button>
            <span aria-hidden="true" className="text-xs">A</span>
            <button
              onClick={() => change(1)}
              disabled={size === 3}
              className="w-7 h-7 rounded-lg nm-surface-sm text-sm font-bold disabled:opacity-50"
              aria-label="Increase text size"
            >+</button>
          </div>
        </div>
      </div>

      {/* NAV */}
      <div
        className="sticky z-[800] flex justify-center items-center px-[3vw] py-2.5"
        style={{ top: "var(--ticker-h)" }}
      >
        <nav
          aria-label="Main navigation"
          className="flex items-center gap-3 px-4 py-2 nm-surface w-full"
          style={{
            borderRadius: "60px",
            maxWidth: "var(--nav-max-width)",
            minHeight: "var(--nav-h)",
          }}
        >
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0" aria-label="CUSB Homepage">
            <img src={logo} alt="" width={42} height={42} className="rounded-full" />
            <span
              className="text-2xl font-extrabold text-grad font-display tracking-tight"
            >
              CUSB
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-1 mx-auto" role="list">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="block px-3 py-2 text-sm font-medium rounded-full transition-shadow"
                  activeProps={{
                    style: { boxShadow: "var(--nm-in-sm)", color: "var(--acc)" },
                  }}
                  inactiveProps={{ style: { color: "var(--tx-secondary)" } }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 ml-auto lg:ml-0">
            <button
              onClick={() => setSearchOpen((s) => !s)}
              className="w-9 h-9 rounded-full nm-surface-sm flex items-center justify-center hover:text-[var(--acc)]"
              aria-label={searchOpen ? "Close search" : "Open search"}
              aria-expanded={searchOpen}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
            <button
              onClick={toggle}
              className="w-9 h-9 rounded-full nm-surface-sm flex items-center justify-center"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <span aria-hidden="true">{theme === "dark" ? "🌙" : "☀️"}</span>
            </button>
            <Link to="/admissions" className="btn btn-primary btn-sm hidden sm:inline-flex">
              Apply
            </Link>
            <button
              onClick={() => setDrawer(true)}
              className="lg:hidden w-9 h-9 rounded-lg nm-surface-sm flex flex-col items-center justify-center gap-1"
              aria-label="Open menu"
              aria-expanded={drawer}
            >
              <span className="w-4 h-px bg-current" />
              <span className="w-4 h-px bg-current" />
              <span className="w-4 h-px bg-current" />
            </button>
          </div>
        </nav>
      </div>

      {/* SEARCH PANEL */}
      {searchOpen && (
        <div
          className="sticky z-[799] mx-auto px-[3vw] mt-2"
          style={{ top: `calc(var(--ticker-h) + var(--nav-h) + 16px)`, maxWidth: 900 }}
        >
          <div className="nm-surface p-4 rounded-3xl">
            <form onSubmit={onSearch} role="search" className="relative">
              <label htmlFor="site-search" className="sr-only">Search the CUSB site</label>
              <input
                id="site-search"
                ref={searchRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                type="search"
                placeholder="Search notices, departments, facilities…"
                autoComplete="off"
                className="w-full px-5 py-3 pr-14 rounded-full nm-inset-sm bg-transparent text-[var(--tx-primary)] outline-none focus:ring-2 focus:ring-[var(--acc)]"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full nm-surface-sm flex items-center justify-center hover:text-[var(--acc)]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
              </button>
            </form>
            {loading && <p className="mt-4 text-sm text-[var(--tx-muted)]">Searching…</p>}
            {results && !loading && (
              <div className="mt-4 grid gap-3 max-h-[60vh] overflow-y-auto">
                {results.notices.length > 0 && (
                  <ResultGroup title="Notices">
                    {results.notices.map((n) => (
                      <Link key={n.id} to="/notices" onClick={() => setSearchOpen(false)} className="block px-4 py-2 rounded-xl hover:bg-[var(--nm-bg-alt)]">
                        <div className="text-sm font-medium">{n.title}</div>
                        <div className="text-xs text-[var(--tx-muted)]">{n.category} · {n.date_label}</div>
                      </Link>
                    ))}
                  </ResultGroup>
                )}
                {results.departments.length > 0 && (
                  <ResultGroup title="Departments">
                    {results.departments.map((d) => (
                      <Link key={d.slug} to="/courses" onClick={() => setSearchOpen(false)} className="block px-4 py-2 rounded-xl hover:bg-[var(--nm-bg-alt)]">
                        <span className="mr-2">{d.icon}</span>{d.name}
                      </Link>
                    ))}
                  </ResultGroup>
                )}
                {results.facilities.length > 0 && (
                  <ResultGroup title="Campus Facilities">
                    {results.facilities.map((f) => (
                      <Link key={f.slug} to="/campus" onClick={() => setSearchOpen(false)} className="block px-4 py-2 rounded-xl hover:bg-[var(--nm-bg-alt)]">
                        <div className="text-sm font-medium">{f.name}</div>
                        <div className="text-xs text-[var(--tx-muted)]">{f.short_description}</div>
                      </Link>
                    ))}
                  </ResultGroup>
                )}
                {results.faqs.length > 0 && (
                  <ResultGroup title="Quick Answers">
                    {results.faqs.map((f, i) => (
                      <div key={i} className="px-4 py-2">
                        <div className="text-sm font-medium">{f.question}</div>
                        <div className="text-xs text-[var(--tx-muted)] mt-1">{f.answer}</div>
                      </div>
                    ))}
                  </ResultGroup>
                )}
                {results.notices.length === 0 && results.departments.length === 0 &&
                  results.facilities.length === 0 && results.faqs.length === 0 && (
                  <p className="text-sm text-[var(--tx-muted)] px-4 py-2">No results for “{q}”. Try different keywords.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MOBILE DRAWER */}
      {drawer && (
        <>
          <div
            onClick={() => setDrawer(false)}
            className="fixed inset-0 z-[1998] bg-black/55 lg:hidden"
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed top-0 right-0 bottom-0 z-[1999] w-[min(300px,86vw)] bg-[var(--nm-bg)] shadow-2xl border-l border-[var(--nm-border-b)] overflow-y-auto p-6 lg:hidden"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-2xl font-extrabold text-grad font-display">CUSB</span>
              <button
                onClick={() => setDrawer(false)}
                className="w-9 h-9 rounded-lg nm-surface-sm"
                aria-label="Close menu"
              >✕</button>
            </div>
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setDrawer(false)}
                  className="px-3 py-3 rounded-xl text-base font-medium hover:bg-[var(--nm-bg-alt)]"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/admissions"
                onClick={() => setDrawer(false)}
                className="btn btn-primary mt-4"
              >Apply 2026–27 →</Link>
            </nav>
          </div>
        </>
      )}
    </>
  );
}

function ResultGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-bold uppercase tracking-wider text-[var(--acc)] px-2 mb-1">{title}</div>
      <div className="grid gap-1">{children}</div>
    </div>
  );
}
