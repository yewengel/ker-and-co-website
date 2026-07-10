-- Add status column to articles table for draft/published support
-- Run this in Supabase SQL Editor

ALTER TABLE articles ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published';

-- Update existing articles to be published
UPDATE articles SET status = 'published' WHERE status IS NULL;

-- Only show published articles on the public site (update RLS if needed)
-- The public site queries should filter by status = 'published'
