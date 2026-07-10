-- =====================================================
-- FIX STORAGE BUCKET POLICIES
-- Run this in Supabase SQL Editor
-- =====================================================

-- Allow anyone to upload to articles bucket
CREATE POLICY "Anyone can upload articles"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'articles');

-- Allow anyone to read from articles bucket
CREATE POLICY "Anyone can read articles"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'articles');

-- Allow anyone to delete from articles bucket
CREATE POLICY "Anyone can delete articles"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'articles');

-- Allow anyone to upload to gallery bucket
CREATE POLICY "Anyone can upload gallery"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'gallery');

-- Allow anyone to read from gallery bucket
CREATE POLICY "Anyone can read gallery"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'gallery');

-- Allow anyone to delete from gallery bucket
CREATE POLICY "Anyone can delete gallery"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'gallery');
