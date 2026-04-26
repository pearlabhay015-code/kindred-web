import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — CUSB Portal" },
      { name: "description", content: "Login to the CUSB student / staff portal." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/" });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: "/" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
  }

  return (
    <>
      <PageHero
        eyebrow="Portal"
        title="Welcome back"
        subtitle="Sign in to access notices, applications and student services."
        crumbs={[{ label: "Login" }]}
      />
      <Section>
        <div className="max-w-md mx-auto nm-surface p-8 rounded-[28px]">
          <form onSubmit={onSubmit} className="grid gap-5">
            <Field label="Email address" id="login-email" type="email" value={email} onChange={setEmail} required />
            <Field label="Password" id="login-pw" type="password" value={password} onChange={setPassword} required />
            {error && <p className="text-sm text-[var(--acc2)]" role="alert">{error}</p>}
            <button type="submit" disabled={loading} className="btn btn-primary disabled:opacity-60">
              {loading ? "Signing in…" : "Sign in →"}
            </button>
          </form>
          <p className="mt-6 text-sm text-[var(--tx-muted)] text-center">
            New to CUSB Portal? <Link to="/register" className="text-[var(--acc)] font-semibold hover:underline">Create an account</Link>
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
        id={id} type={type} value={value} required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full nm-inset-sm rounded-full bg-transparent px-4 py-3 outline-none text-[var(--tx-primary)]"
      />
    </div>
  );
}
