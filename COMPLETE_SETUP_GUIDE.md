# 🚀 Complete Supabase Setup Guide

## ✅ What You've Done So Far
1. ✅ Created Supabase account
2. ✅ Installed packages (`@supabase/supabase-js`, `react-quill`)
3. ✅ Environment file created with your credentials

---

## 📋 STEP 1: Create Database Tables

1. **Go to:** https://supabase.com/dashboard/project/xgcstcbyrcudjiwvqobs
2. **Click:** "SQL Editor" (left sidebar, looks like `</>`)
3. **Click:** "New Query" button
4. **Open file:** `supabase-setup.sql` in your project folder
5. **Copy ALL the SQL code** from that file
6. **Paste** into the Supabase SQL Editor
7. **Click:** "Run" button (bottom right)
8. **Expected result:** "Success. No rows returned" ✅

---

## 📋 STEP 2: Create Storage Buckets (For Images)

### Create "articles" Bucket:
1. In Supabase dashboard, **click "Storage"** (left sidebar)
2. **Click "New bucket"** button
3. Fill in:
   - **Name:** `articles`
   - **Public bucket:** ✅ **CHECK THIS BOX!** (Very important!)
   - **File size limit:** 5 MB
4. **Click "Create bucket"**

### Create "gallery" Bucket:
1. **Click "New bucket"** again
2. Fill in:
   - **Name:** `gallery`
   - **Public bucket:** ✅ **CHECK THIS BOX!** (Very important!)
   - **File size limit:** 5 MB
3. **Click "Create bucket"**

### Verify:
You should see two buckets:
- ✅ articles (public)
- ✅ gallery (public)

---

## 📋 STEP 3: Test the New Admin Dashboard

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Go to:** http://localhost:3000/admin/dashboard/new-page

3. **You should see:**
   - Three tabs: Articles, Gallery, Inquiries
   - Forms to upload images
   - Image preview before upload

---

## 📋 STEP 4: What Works Now

### ✅ Articles Tab:
- Write article title, excerpt, content
- Upload a featured image (optional)
- Image preview before publishing
- Automatic read time calculation
- All saved to Supabase database

### ✅ Gallery Tab:
- Upload images with title and category
- View all uploaded images
- Delete images
- All stored in Supabase Storage (FREE!)

### ✅ Inquiries Tab:
- View all contact form submissions
- Mark as seen/new
- Delete inquiries

---

## 🔄 STEP 5: Update Your Frontend (Coming Next)

After you confirm the database and storage are set up, I'll update:
- Articles page to fetch from Supabase
- Gallery page to show uploaded images
- Contact form to save to Supabase

---

## ❓ Troubleshooting

### If SQL fails:
- Make sure you copied ALL the code from `supabase-setup.sql`
- Check for any error messages in red

### If image upload fails:
- Make sure both storage buckets are marked as **PUBLIC**
- Check bucket names are exactly: `articles` and `gallery`

### If you see "Failed to fetch":
- Make sure your `.env.local` file has the correct credentials
- Restart your dev server after creating `.env.local`

---

## 📞 Next Steps

**Reply with:**
1. ✅ "SQL ran successfully" - after Step 1
2. ✅ "Buckets created" - after Step 2
3. ✅ "Dashboard works" - after Step 3

Then I'll update all your frontend pages to use Supabase!
