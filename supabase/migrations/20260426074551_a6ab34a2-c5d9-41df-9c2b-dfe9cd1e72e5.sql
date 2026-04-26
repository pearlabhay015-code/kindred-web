
DROP POLICY IF EXISTS "Chat insert own session" ON public.chat_messages;
DROP POLICY IF EXISTS "Chat read own session" ON public.chat_messages;
-- No client-side policies; all chat IO goes through server functions using the service role.
