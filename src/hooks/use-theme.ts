import { useEffect, useState } from "react";

const KEY = "cusb-theme";
const FS_KEY = "cusb-fs";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem(KEY)) as
      | "light"
      | "dark"
      | null;
    const initial =
      saved ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    apply(initial);
    setTheme(initial);
  }, []);

  function apply(next: "light" | "dark") {
    const root = document.documentElement;
    root.classList.add("theme-switching");
    if (next === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    root.setAttribute("data-theme", next);
    void root.offsetWidth;
    requestAnimationFrame(() => root.classList.remove("theme-switching"));
  }

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    apply(next);
    try { localStorage.setItem(KEY, next); } catch {}
  }

  return { theme, toggle };
}

export function useFontSize() {
  const [size, setSize] = useState(0);

  useEffect(() => {
    const saved = Number(localStorage.getItem(FS_KEY) ?? "0") || 0;
    setSize(saved);
    document.documentElement.setAttribute("data-fs", String(saved));
  }, []);

  function change(delta: number) {
    const next = Math.max(0, Math.min(3, size + delta));
    setSize(next);
    document.documentElement.setAttribute("data-fs", String(next));
    try { localStorage.setItem(FS_KEY, String(next)); } catch {}
  }

  return { size, change };
}
