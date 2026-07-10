-- ============================================
-- Annual Reports Table & Storage Setup
-- ============================================

-- 1. Create the annual_reports table
CREATE TABLE IF NOT EXISTS annual_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  year INTEGER NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  cover_storage_path TEXT,
  pdf_url TEXT NOT NULL,
  pdf_storage_path TEXT NOT NULL,
  page_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create index on year for fast sorting
CREATE INDEX IF NOT EXISTS idx_annual_reports_year ON annual_reports(year DESC);

-- 3. Enable RLS (Row Level Security)
ALTER TABLE annual_reports ENABLE ROW LEVEL SECURITY;

-- 4. Policy: Anyone can read annual reports (public)
CREATE POLICY "Anyone can read annual reports"
  ON annual_reports FOR SELECT
  USING (true);

-- 5. Policy: Anyone can insert annual reports (for admin dashboard without auth)
CREATE POLICY "Anyone can insert annual reports"
  ON annual_reports FOR INSERT
  WITH CHECK (true);

-- 6. Policy: Anyone can delete annual reports (for admin dashboard without auth)
CREATE POLICY "Anyone can delete annual reports"
  ON annual_reports FOR DELETE
  USING (true);

-- 7. Policy: Anyone can update annual reports
CREATE POLICY "Anyone can update annual reports"
  ON annual_reports FOR UPDATE
  USING (true);

-- ============================================
-- Storage Bucket for Reports (PDFs + Covers)
-- ============================================
-- Run this in the Supabase Dashboard > Storage > Create Bucket:
--   Bucket name: reports
--   Public: true
--
-- Or via SQL:
INSERT INTO storage.buckets (id, name, public)
VALUES ('reports', 'reports', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: Allow public read access
CREATE POLICY "Public read access for reports"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'reports');

-- Storage policy: Allow uploads to reports bucket
CREATE POLICY "Allow uploads to reports"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'reports');

-- Storage policy: Allow deletes from reports bucket
CREATE POLICY "Allow deletes from reports"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'reports');
