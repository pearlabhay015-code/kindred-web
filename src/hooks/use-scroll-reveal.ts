import { useEffect } from "react";

/** Reveal-on-scroll: any element with class "rev" gets "vis" added when in viewport. */
export function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rev:not(.vis)"));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("vis");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 5) * 0.07}s`;
      io.observe(el);
    });
    return () => io.disconnect();
  });
}
