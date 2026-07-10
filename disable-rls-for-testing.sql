-- =====================================================
-- TEMPORARY: DISABLE RLS FOR TESTING
-- This allows anyone to insert/update without authentication
-- Run this in Supabase SQL Editor
-- =====================================================

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can insert articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can update articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can delete articles" ON articles;

DROP POLICY IF EXISTS "Authenticated users can insert gallery_images" ON gallery_images;
DROP POLICY IF EXISTS "Authenticated users can update gallery_images" ON gallery_images;
DROP POLICY IF EXISTS "Authenticated users can delete gallery_images" ON gallery_images;

DROP POLICY IF EXISTS "Authenticated users can update inquiries" ON inquiries;
DROP POLICY IF EXISTS "Authenticated users can delete inquiries" ON inquiries;

-- Create new policies that allow anyone to write (for testing)
CREATE POLICY "Anyone can insert articles"
ON articles FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Anyone can update articles"
ON articles FOR UPDATE
TO public
USING (true);

CREATE POLICY "Anyone can delete articles"
ON articles FOR DELETE
TO public
USING (true);

CREATE POLICY "Anyone can insert gallery_images"
ON gallery_images FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Anyone can update gallery_images"
ON gallery_images FOR UPDATE
TO public
USING (true);

CREATE POLICY "Anyone can delete gallery_images"
ON gallery_images FOR DELETE
TO public
USING (true);

CREATE POLICY "Anyone can insert inquiries"
ON inquiries FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Anyone can update inquiries"
ON inquiries FOR UPDATE
TO public
USING (true);

CREATE POLICY "Anyone can delete inquiries"
ON inquiries FOR DELETE
TO public
USING (true);

-- =====================================================
-- NOTE: This is for testing only!
-- In production, you should add proper authentication
-- =====================================================
