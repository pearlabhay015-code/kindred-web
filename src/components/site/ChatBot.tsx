import { useEffect, useRef, useState } from "react";
import { chatAsk } from "@/server/site.functions";

type Msg = { role: "user" | "bot"; content: string };

function getSessionId() {
  if (typeof window === "undefined") return "ssr";
  let id = localStorage.getItem("cusb-chat-sid");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("cusb-chat-sid", id);
  }
  return id;
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", content: "Hi! 👋 I'm the CUSB Assistant. Ask me about admissions, programmes, campus, hostels, scholarships — anything about CUSB." },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [msgs]);

  async function send() {
    const m = text.trim();
    if (!m || busy) return;
    setMsgs((p) => [...p, { role: "user", content: m }]);
    setText("");
    setBusy(true);
    try {
      const r = await chatAsk({ data: { sessionId: getSessionId(), message: m } });
      setMsgs((p) => [...p, { role: "bot", content: r.reply }]);
    } catch {
      setMsgs((p) => [...p, { role: "bot", content: "Sorry, I had trouble answering just now. Please try again." }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="CUSB Assistant chat"
          className="fixed bottom-24 right-5 z-[1001] w-[min(360px,92vw)] flex flex-col rounded-3xl overflow-hidden nm-surface"
          style={{ height: "min(520px, 80vh)" }}
        >
          <div className="px-4 py-3 flex items-center justify-between text-white" style={{ background: "var(--grad-warm)" }}>
            <span className="font-display font-bold text-sm">CUSB Assistant 🤖</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white text-lg flex items-center justify-center"
            >×</button>
          </div>
          <div
            ref={logRef}
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
            className="flex-1 overflow-y-auto p-4 flex flex-col gap-3"
            style={{ background: "var(--nm-bg)" }}
          >
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-line ${
                    m.role === "user"
                      ? "text-white"
                      : "text-[var(--tx-primary)] nm-surface-sm"
                  }`}
                  style={m.role === "user" ? { background: "var(--grad-hero-btn)" } : undefined}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {busy && <div className="text-xs text-[var(--tx-muted)]">Typing…</div>}
          </div>
          <div className="p-3 flex gap-2 border-t" style={{ borderColor: "var(--nm-border-b)" }}>
            <label htmlFor="chat-input" className="sr-only">Type your message</label>
            <input
              id="chat-input"
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") send(); }}
              placeholder="Ask anything about CUSB…"
              autoComplete="off"
              maxLength={500}
              className="flex-1 px-4 py-2 rounded-full nm-inset-sm bg-transparent outline-none text-sm"
            />
            <button
              onClick={send}
              disabled={busy}
              aria-label="Send message"
              className="w-10 h-10 rounded-full text-white flex items-center justify-center disabled:opacity-50"
              style={{ background: "var(--grad-hero-btn)" }}
            >→</button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close CUSB Assistant" : "Open CUSB Assistant"}
        aria-expanded={open}
        className="floating-btn"
        style={{ bottom: 20, right: 20, fontSize: "1.5rem" }}
      >
        {open ? "×" : "🤖"}
      </button>
    </>
  );
}
