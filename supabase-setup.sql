-- =====================================================
-- SUPABASE DATABASE SETUP FOR vanguardx-import-export
-- Run this in Supabase SQL Editor
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. ARTICLES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'vanguardx-import-export',
  category TEXT NOT NULL,
  read_time TEXT DEFAULT '5 min read',
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS articles_created_at_idx ON articles(created_at DESC);
CREATE INDEX IF NOT EXISTS articles_category_idx ON articles(category);

-- =====================================================
-- 2. INQUIRIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  interest TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'seen', 'resolved')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS inquiries_status_idx ON inquiries(status);

-- =====================================================
-- 3. GALLERY IMAGES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  storage_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS gallery_images_created_at_idx ON gallery_images(created_at DESC);
CREATE INDEX IF NOT EXISTS gallery_images_category_idx ON gallery_images(category);

-- =====================================================
-- 4. ENABLE ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 5. CREATE POLICIES (Public Read, Admin Write)
-- =====================================================

-- Articles: Public can read, authenticated users can write
CREATE POLICY "Articles are viewable by everyone" 
  ON articles FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can insert articles" 
  ON articles FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update articles" 
  ON articles FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete articles" 
  ON articles FOR DELETE 
  USING (auth.role() = 'authenticated');

-- Inquiries: Public can insert, authenticated can read/update/delete
CREATE POLICY "Anyone can submit inquiries" 
  ON inquiries FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view inquiries" 
  ON inquiries FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update inquiries" 
  ON inquiries FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete inquiries" 
  ON inquiries FOR DELETE 
  USING (auth.role() = 'authenticated');

-- Gallery: Public can read, authenticated users can write
CREATE POLICY "Gallery images are viewable by everyone" 
  ON gallery_images FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can insert gallery images" 
  ON gallery_images FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update gallery images" 
  ON gallery_images FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete gallery images" 
  ON gallery_images FOR DELETE 
  USING (auth.role() = 'authenticated');

-- =====================================================
-- 6. CREATE UPDATED_AT TRIGGER
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for articles
CREATE TRIGGER update_articles_updated_at 
  BEFORE UPDATE ON articles 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for gallery_images
CREATE TRIGGER update_gallery_images_updated_at 
  BEFORE UPDATE ON gallery_images 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================
