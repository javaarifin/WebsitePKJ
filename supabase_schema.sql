-- ==============================================================================
-- PARJONO KERAMIK JAYA - SUPABASE DATABASE SCHEMA & SEED DATA
-- Jalankan seluruh script ini di: Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLE: company_info (Kontak, Alamat, Info Perusahaan)
CREATE TABLE IF NOT EXISTS public.company_info (
  id INT PRIMARY KEY DEFAULT 1,
  name TEXT NOT NULL DEFAULT 'PARJONO KERAMIK JAYA',
  tagline TEXT DEFAULT 'Produsen Gerabah & Terakota Kasongan, Bantul',
  phone TEXT DEFAULT '+62 812-3456-7890',
  whatsapp TEXT DEFAULT '+62 812-3456-7890',
  email TEXT DEFAULT 'info@parjonokeramikjaya.com',
  address_line1 TEXT DEFAULT 'Klisat, Srihardono, Pundong',
  address_line2 TEXT DEFAULT 'Bantul, D.I. Yogyakarta 55771, Indonesia',
  operating_hours TEXT DEFAULT 'Senin - Sabtu: 08:00 - 17:00 WIB',
  google_maps_url TEXT DEFAULT 'https://maps.google.com/?q=Klisat,+Srihardono,+Pundong,+Bantul,+Yogyakarta',
  instagram TEXT DEFAULT '@parjonokeramikjaya',
  facebook TEXT DEFAULT 'Parjono Keramik Jaya',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed company_info
INSERT INTO public.company_info (id, name, tagline, phone, whatsapp, email, address_line1, address_line2, operating_hours, google_maps_url, instagram, facebook)
VALUES (
  1,
  'PARJONO KERAMIK JAYA',
  'Produsen Gerabah & Terakota Kasongan, Bantul',
  '+62 812-3456-7890',
  '+62 812-3456-7890',
  'info@parjonokeramikjaya.com',
  'Klisat, Srihardono, Pundong',
  'Bantul, D.I. Yogyakarta 55771, Indonesia',
  'Senin - Sabtu: 08:00 - 17:00 WIB',
  'https://maps.google.com/?q=Klisat,+Srihardono,+Pundong,+Bantul,+Yogyakarta',
  '@parjonokeramikjaya',
  'Parjono Keramik Jaya'
)
ON CONFLICT (id) DO NOTHING;

-- 3. TABLE: products (Katalog Produk Gerabah & Terakota)
CREATE TABLE IF NOT EXISTS public.products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Terracotta',
  description TEXT DEFAULT '',
  full_description TEXT DEFAULT '',
  image TEXT NOT NULL,
  material TEXT DEFAULT 'Natural Terracotta Clay',
  size TEXT DEFAULT 'Custom size available',
  weight TEXT DEFAULT 'Varies by size',
  finish TEXT DEFAULT 'Natural / Unglazed',
  moq TEXT DEFAULT '50 pcs',
  price TEXT DEFAULT 'Hubungi Kami',
  status TEXT DEFAULT 'published' CHECK (status IN ('published', 'draft')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABLE: news (Berita & Kegiatan)
CREATE TABLE IF NOT EXISTS public.news (
  id BIGSERIAL PRIMARY KEY,
  category TEXT NOT NULL DEFAULT 'Kegiatan',
  date TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT DEFAULT '',
  image TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABLE: gallery (Galeri Foto Kriya)
CREATE TABLE IF NOT EXISTS public.gallery (
  id BIGSERIAL PRIMARY KEY,
  category TEXT NOT NULL DEFAULT 'Workshop',
  src TEXT NOT NULL,
  alt TEXT DEFAULT '',
  caption TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABLE: awards (Penghargaan & Prestasi)
CREATE TABLE IF NOT EXISTS public.awards (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  year TEXT NOT NULL,
  organization TEXT NOT NULL,
  description TEXT DEFAULT '',
  image TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TABLE: exhibitions (Pameran Kriya)
CREATE TABLE IF NOT EXISTS public.exhibitions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  year TEXT NOT NULL,
  description TEXT DEFAULT '',
  image TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. TABLE: inquiries (Pesan & Permintaan Penawaran dari Pengunjung)
CREATE TABLE IF NOT EXISTS public.inquiries (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  name TEXT NOT NULL,
  company TEXT DEFAULT '',
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  subject TEXT DEFAULT '',
  message TEXT NOT NULL,
  product_name TEXT DEFAULT '',
  country TEXT DEFAULT '',
  quantity TEXT DEFAULT '',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- Aktifkan RLS dan izinkan akses baca untuk semua pengunjung web (Public Read)
-- Serta akses simpan/edit untuk Admin Dashboard

ALTER TABLE public.company_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exhibitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Policy Company Info
CREATE POLICY "Public read company_info" ON public.company_info FOR SELECT USING (true);
CREATE POLICY "Allow all update company_info" ON public.company_info FOR ALL USING (true) WITH CHECK (true);

-- Policy Products
CREATE POLICY "Public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow all manage products" ON public.products FOR ALL USING (true) WITH CHECK (true);

-- Policy News
CREATE POLICY "Public read news" ON public.news FOR SELECT USING (true);
CREATE POLICY "Allow all manage news" ON public.news FOR ALL USING (true) WITH CHECK (true);

-- Policy Gallery
CREATE POLICY "Public read gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Allow all manage gallery" ON public.gallery FOR ALL USING (true) WITH CHECK (true);

-- Policy Awards
CREATE POLICY "Public read awards" ON public.awards FOR SELECT USING (true);
CREATE POLICY "Allow all manage awards" ON public.awards FOR ALL USING (true) WITH CHECK (true);

-- Policy Exhibitions
CREATE POLICY "Public read exhibitions" ON public.exhibitions FOR SELECT USING (true);
CREATE POLICY "Allow all manage exhibitions" ON public.exhibitions FOR ALL USING (true) WITH CHECK (true);

-- Policy Inquiries
CREATE POLICY "Public insert inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all manage inquiries" ON public.inquiries FOR ALL USING (true) WITH CHECK (true);

-- 10. STORAGE BUCKET: pkj-media
-- Membuat storage bucket untuk upload foto produk & galeri
INSERT INTO storage.buckets (id, name, public)
VALUES ('pkj-media', 'pkj-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

CREATE POLICY "Public view pkj-media"
ON storage.objects FOR SELECT
USING (bucket_id = 'pkj-media');

CREATE POLICY "Allow upload pkj-media"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'pkj-media');

CREATE POLICY "Allow update pkj-media"
ON storage.objects FOR UPDATE
USING (bucket_id = 'pkj-media');

CREATE POLICY "Allow delete pkj-media"
ON storage.objects FOR DELETE
USING (bucket_id = 'pkj-media');
