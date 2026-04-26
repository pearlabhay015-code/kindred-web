import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create Account — CUSB Portal" },
      { name: "description", content: "Register for the CUSB student / staff portal." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/" });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setMsg(null);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
        data: { full_name: name },
      },
    });
    setLoading(false);
    if (error) setMsg({ kind: "err", text: error.message });
    else setMsg({ kind: "ok", text: "Check your inbox to verify your email and complete sign-up." });
  }

  return (
    <>
      <PageHero
        eyebrow="Portal"
        title="Create your account"
        subtitle="Free for students, applicants and staff. Track applications, notices and services."
        crumbs={[{ label: "Register" }]}
      />
      <Section>
        <div className="max-w-md mx-auto nm-surface p-8 rounded-[28px]">
          <form onSubmit={onSubmit} className="grid gap-5">
            <Field label="Full name" id="reg-name" value={name} onChange={setName} required />
            <Field label="Email address" id="reg-email" type="email" value={email} onChange={setEmail} required />
            <Field label="Password (min. 8 chars)" id="reg-pw" type="password" value={password} onChange={setPassword} required />
            {msg && (
              <p className={`text-sm ${msg.kind === "ok" ? "text-[var(--acc3)]" : "text-[var(--acc2)]"}`} role="alert">{msg.text}</p>
            )}
            <button type="submit" disabled={loading} className="btn btn-primary disabled:opacity-60">
              {loading ? "Creating…" : "Create account →"}
            </button>
          </form>
          <p className="mt-6 text-sm text-[var(--tx-muted)] text-center">
            Already have an account? <Link to="/login" className="text-[var(--acc)] font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </Section>
    </>
  );
}

function Field({ label, id, type = "text", value, onChange, required }: { label: string; id: string; type?: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-2">{label}{required && <span className="text-[var(--acc2)]"> *</span>}</label>
      <input
        id={id} type={type} value={value} required={required} minLength={type === "password" ? 8 : undefined}
        onChange={(e) => onChange(e.target.value)}
        className="w-full nm-inset-sm rounded-full bg-transparent px-4 py-3 outline-none text-[var(--tx-primary)]"
      />
    </div>
  );
}
