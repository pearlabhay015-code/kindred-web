import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  centered = false,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  centered?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id ? `${id}-h` : undefined}
      className="px-[5vw] py-16 max-w-7xl mx-auto"
    >
      {(eyebrow || title || subtitle) && (
        <div className={centered ? "text-center max-w-2xl mx-auto" : "max-w-3xl"}>
          {eyebrow && <div className="sec-eyebrow">{eyebrow}</div>}
          {title && (
            <h2 id={id ? `${id}-h` : undefined} className="sec-title">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className={`sec-sub ${centered ? "mx-auto" : ""}`}>{subtitle}</p>
          )}
        </div>
      )}
      <div className={eyebrow || title || subtitle ? "mt-10" : ""}>{children}</div>
    </section>
  );
}
