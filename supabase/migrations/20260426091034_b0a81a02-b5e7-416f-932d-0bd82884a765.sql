-- Allow inserts to chat_messages (no select) so the chatbot can log conversations
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert chat messages" ON public.chat_messages;
CREATE POLICY "Anyone can insert chat messages"
  ON public.chat_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
