import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

/* ─── SEARCH ─── */
export const searchSite = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({ q: z.string().trim().min(1).max(100) }).parse,
  )
  .handler(async ({ data }) => {
    const q = data.q.toLowerCase();
    const like = `%${q}%`;
    const [notices, depts, facilities, faqs] = await Promise.all([
      supabaseAdmin.from("notices").select("id,title,category,date_label").ilike("title", like).limit(8),
      supabaseAdmin.from("departments").select("slug,name,school_slug,icon").or(`name.ilike.${like},description.ilike.${like}`).limit(8),
      supabaseAdmin.from("facilities").select("slug,name,short_description").or(`name.ilike.${like},short_description.ilike.${like}`).limit(8),
      supabaseAdmin.from("faqs").select("question,answer").or(`question.ilike.${like},answer.ilike.${like}`).limit(5),
    ]);
    return {
      notices: notices.data ?? [],
      departments: depts.data ?? [],
      facilities: facilities.data ?? [],
      faqs: faqs.data ?? [],
    };
  });

/* ─── CHAT ─── */
export const chatAsk = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      sessionId: z.string().min(8).max(64),
      message: z.string().trim().min(1).max(500),
    }).parse,
  )
  .handler(async ({ data }) => {
    const lower = data.message.toLowerCase();

    // Persist user message (best-effort)
    await supabaseAdmin.from("chat_messages").insert({
      session_id: data.sessionId, role: "user", content: data.message,
    });

    // Look up FAQ by keyword overlap
    const { data: faqs } = await supabaseAdmin
      .from("faqs")
      .select("question,answer,keywords")
      .order("sort_order", { ascending: true });

    let best: { score: number; answer: string; question: string } | null = null;
    for (const f of faqs ?? []) {
      const kws = (f.keywords as string[] | null) ?? [];
      let score = 0;
      for (const kw of kws) if (lower.includes(kw.toLowerCase())) score += 2;
      if (f.question.toLowerCase().split(/\W+/).some((w) => w.length > 3 && lower.includes(w))) score += 1;
      if (!best || score > best.score) best = { score, answer: f.answer, question: f.question };
    }

    let reply: string;
    if (best && best.score >= 2) {
      reply = best.answer;
    } else {
      // Try DB search
      const search = await supabaseAdmin
        .from("notices")
        .select("title,date_label")
        .ilike("title", `%${data.message}%`)
        .limit(3);
      if (search.data && search.data.length) {
        reply = `I found these notices that may help:\n\n• ${search.data
          .map((n) => `${n.title}${n.date_label ? ` (${n.date_label})` : ""}`)
          .join("\n• ")}`;
      } else {
        reply =
          "I can help with admissions, programmes, campus, hostels, scholarships, leadership and contact. Try asking, for example, “How do I apply?” or “Where is the campus?”";
      }
    }

    await supabaseAdmin.from("chat_messages").insert({
      session_id: data.sessionId, role: "bot", content: reply,
    });

    return { reply };
  });
