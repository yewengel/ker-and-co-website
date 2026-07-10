# Storage Buckets Setup (For Images)

After running the SQL setup, create storage buckets for images:

## Step 1: Create "articles" Bucket

1. In Supabase dashboard, click **Storage** (left sidebar)
2. Click **"New bucket"** button
3. Fill in:
   - **Name:** `articles`
   - **Public bucket:** ✅ CHECK THIS BOX (important!)
   - **File size limit:** 5 MB
   - **Allowed MIME types:** Leave empty (allows all images)
4. Click **"Create bucket"**

## Step 2: Create "gallery" Bucket

1. Click **"New bucket"** again
2. Fill in:
   - **Name:** `gallery`
   - **Public bucket:** ✅ CHECK THIS BOX (important!)
   - **File size limit:** 5 MB
   - **Allowed MIME types:** Leave empty
3. Click **"Create bucket"**

## Step 3: Verify

You should now see two buckets:
- ✅ articles (public)
- ✅ gallery (public)

---

## What These Buckets Do:

- **articles** → Stores images for blog articles
- **gallery** → Stores images for the gallery page

Both are PUBLIC so visitors can see the images!
