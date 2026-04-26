
-- ============ SCHOOLS ============
CREATE TABLE public.schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  icon TEXT,
  short_name TEXT,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Schools public read" ON public.schools FOR SELECT USING (true);

-- ============ DEPARTMENTS ============
CREATE TABLE public.departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  school_slug TEXT NOT NULL REFERENCES public.schools(slug) ON DELETE CASCADE,
  name TEXT NOT NULL,
  icon TEXT,
  description TEXT,
  programmes TEXT[],
  hod TEXT,
  contact_email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Departments public read" ON public.departments FOR SELECT USING (true);

-- ============ NOTICES ============
CREATE TABLE public.notices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL CHECK (category IN ('admission','academic','event','circular','recruitment','exam')),
  title TEXT NOT NULL,
  body TEXT,
  notice_date DATE,
  date_label TEXT,
  is_new BOOLEAN DEFAULT false,
  url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Notices public read" ON public.notices FOR SELECT USING (true);

-- ============ FACILITIES ============
CREATE TABLE public.facilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  image_url TEXT,
  short_description TEXT,
  long_description TEXT,
  highlights TEXT[],
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Facilities public read" ON public.facilities FOR SELECT USING (true);

-- ============ LEADERS ============
CREATE TABLE public.leaders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  short_note TEXT,
  bio TEXT,
  photo_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.leaders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Leaders public read" ON public.leaders FOR SELECT USING (true);

-- ============ QUICK LINKS ============
CREATE TABLE public.quick_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  external BOOLEAN DEFAULT false,
  icon TEXT,
  category TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.quick_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Quick links public read" ON public.quick_links FOR SELECT USING (true);

-- ============ FAQS ============
CREATE TABLE public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  keywords TEXT[] NOT NULL DEFAULT '{}',
  category TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "FAQs public read" ON public.faqs FOR SELECT USING (true);

-- ============ CHAT MESSAGES ============
CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user','bot')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX chat_messages_session_idx ON public.chat_messages(session_id, created_at);
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Chat read own session" ON public.chat_messages FOR SELECT USING (true);
CREATE POLICY "Chat insert own session" ON public.chat_messages FOR INSERT WITH CHECK (true);

-- Indexes for search
CREATE INDEX notices_title_idx ON public.notices USING gin (to_tsvector('english', title || ' ' || COALESCE(body,'')));
CREATE INDEX departments_search_idx ON public.departments USING gin (to_tsvector('english', name || ' ' || COALESCE(description,'')));
CREATE INDEX facilities_search_idx ON public.facilities USING gin (to_tsvector('english', name || ' ' || COALESCE(short_description,'')));
