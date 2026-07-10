'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { supabase, uploadImage, uploadFile, Article, Inquiry, GalleryImage, AnnualReport } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Activity, Save, CheckCircle, AlertCircle, Upload, Image as ImageIcon, Trash2, Eye, FileText, Download, BookOpen, Edit2, Send, Newspaper } from 'lucide-react'
import Image from 'next/image'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

type TabType = 'articles' | 'gallery' | 'reports' | 'inquiries'

export default function NewDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('articles')

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage VanguardX Import & Export articles, gallery, annual reports, and inquiries</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-2xl shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8 pt-6">
              <button
                onClick={() => setActiveTab('articles')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'articles'
                    ? 'border-teal-600 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Articles
              </button>
              <button
                onClick={() => setActiveTab('gallery')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'gallery'
                    ? 'border-teal-600 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Gallery
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'reports'
                    ? 'border-teal-600 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Annual Reports
              </button>
              <button
                onClick={() => setActiveTab('inquiries')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'inquiries'
                    ? 'border-teal-600 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Inquiries
              </button>
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'articles' && <ArticlesTab />}
            {activeTab === 'gallery' && <GalleryTab />}
            {activeTab === 'reports' && <AnnualReportsTab />}
            {activeTab === 'inquiries' && <InquiriesTab />}
          </div>
        </div>
      </div>
    </div>
  )
}

function ArticlesTab() {
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('Company Updates')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [draftLoading, setDraftLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [publishedArticles, setPublishedArticles] = useState<any[]>([])
  const [draftArticles, setDraftArticles] = useState<any[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null)
  const [activeView, setActiveView] = useState<'form' | 'published' | 'drafts'>('form')

  const categories = [
    "Import & Export",
    "Trade & Investment",
    "Partnerships",
    "Logistics",
    "Market Updates",
    "Company Updates",
    "General News"
  ]

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    const { data: published } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(50)
    if (published) setPublishedArticles(published)

    const { data: drafts } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'draft')
      .order('created_at', { ascending: false })
      .limit(50)
    if (drafts) setDraftArticles(drafts)
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const resetForm = () => {
    setTitle('')
    setExcerpt('')
    setContent('')
    setCategory('Import & Export')
    setImageFile(null)
    setImagePreview(null)
    setEditingId(null)
    setExistingImageUrl(null)
    setError('')
    setSuccess('')
  }

  const handleSave = async (status: 'published' | 'draft') => {
    if (!title.trim()) {
      setError('Please enter a title')
      return
    }
    if (status === 'published' && !excerpt.trim()) {
      setError('Please enter an excerpt before publishing')
      return
    }

    const isPublishing = status === 'published'
    if (isPublishing) setLoading(true)
    else setDraftLoading(true)
    setError('')
    setSuccess('')

    try {
      let imageUrl = existingImageUrl

      if (imageFile) {
        const uploadResult = await uploadImage(imageFile, 'articles')
        if (uploadResult) {
          imageUrl = uploadResult.url
        }
      }

      const wordCount = content.split(/\s+/).length
      const readTime = Math.ceil(wordCount / 200)

      const articleData = {
        title,
        excerpt,
        content,
        category,
        author: "VanguardX Import & Export",
        read_time: `${readTime} min read`,
        image_url: imageUrl,
        status,
      }

      if (editingId) {
        const { error: updateError } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', editingId)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase
          .from('articles')
          .insert(articleData)
        if (insertError) throw insertError
      }

      const action = editingId ? 'updated' : 'created'
      setSuccess(
        status === 'published'
          ? `Article ${action} and published successfully!`
          : `Draft ${action} successfully!`
      )
      resetForm()
      fetchArticles()
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Failed to save article. Please try again.')
    } finally {
      setLoading(false)
      setDraftLoading(false)
    }
  }

  const handleDelete = async (article: any) => {
    const label = article.status === 'draft' ? 'draft' : 'article'
    if (!confirm(`Delete this ${label}: "${article.title}"? This cannot be undone.`)) return

    try {
      const { error: deleteError } = await supabase
        .from('articles')
        .delete()
        .eq('id', article.id)
      if (deleteError) throw deleteError
      fetchArticles()
    } catch (err) {
      console.error(err)
      alert('Failed to delete article')
    }
  }

  const handleEdit = (article: any) => {
    setEditingId(article.id)
    setTitle(article.title || '')
    setExcerpt(article.excerpt || '')
    setContent(article.content || '')
    setCategory(article.category || 'Import & Export')
    setExistingImageUrl(article.image_url || null)
    setImagePreview(article.image_url || null)
    setImageFile(null)
    setActiveView('form')
    setError('')
    setSuccess('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePublishDraft = async (article: any) => {
    if (!article.excerpt?.trim()) {
      alert('Please edit this draft and add an excerpt before publishing.')
      handleEdit(article)
      return
    }
    if (!confirm(`Publish "${article.title}"?`)) return

    try {
      const { error: updateError } = await supabase
        .from('articles')
        .update({ status: 'published' })
        .eq('id', article.id)
      if (updateError) throw updateError
      fetchArticles()
    } catch (err) {
      console.error(err)
      alert('Failed to publish article')
    }
  }

  return (
    <div className="space-y-8">
      {/* Sub-navigation */}
      <div className="flex gap-2 border-b border-gray-200 pb-4">
        <button
          onClick={() => { resetForm(); setActiveView('form') }}
          className={`px-4 py-2 rounded-[7px] text-sm font-medium transition-colors ${
            activeView === 'form'
              ? 'bg-teal-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Edit2 className="w-4 h-4 inline mr-1.5" />
          {editingId ? 'Edit Article' : 'New Article'}
        </button>
        <button
          onClick={() => setActiveView('published')}
          className={`px-4 py-2 rounded-[7px] text-sm font-medium transition-colors ${
            activeView === 'published'
              ? 'bg-teal-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Newspaper className="w-4 h-4 inline mr-1.5" />
          Published ({publishedArticles.length})
        </button>
        <button
          onClick={() => setActiveView('drafts')}
          className={`px-4 py-2 rounded-[7px] text-sm font-medium transition-colors ${
            activeView === 'drafts'
              ? 'bg-teal-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <FileText className="w-4 h-4 inline mr-1.5" />
          Drafts ({draftArticles.length})
        </button>
      </div>

      {/* ── Write / Edit Form ── */}
      {activeView === 'form' && (
        <div className="space-y-6">
          {editingId && (
            <div className="bg-blue-50 text-blue-700 p-4 rounded-[7px] flex items-center justify-between">
              <span className="flex items-center">
                <Edit2 className="w-4 h-4 mr-2" />
                Editing article: <strong className="ml-1">{title || '(untitled)'}</strong>
              </span>
              <button onClick={resetForm} className="text-blue-500 hover:text-blue-700 text-sm underline">
                Cancel editing
              </button>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Article Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-[7px] focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition-all"
              placeholder="e.g., Operations Update: New Capacity and Delivery Improvements"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-[7px] focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition-all"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image (Optional)</label>
            <div className="mt-2">
              <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" id="article-image" />
              <label
                htmlFor="article-image"
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-[7px] shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose Image
              </label>
              {imagePreview && (
                <div className="mt-4 relative w-full max-w-md">
                  <img src={imagePreview} alt="Preview" className="rounded-[7px] shadow-md" />
                  <button
                    type="button"
                    onClick={() => { setImageFile(null); setImagePreview(null); setExistingImageUrl(null) }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-[7px] hover:bg-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Short Summary (Excerpt)</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-[7px] focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition-all"
              placeholder="A brief description that appears on the main list..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Content</label>
            <div className="bg-white rounded-[7px] border border-gray-300 overflow-hidden">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                placeholder="Write your full article here..."
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'align': [] }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    ['blockquote'],
                    ['link', 'image'],
                    ['clean'],
                  ],
                }}
                formats={[
                  'header',
                  'bold', 'italic', 'underline', 'strike',
                  'color', 'background',
                  'align',
                  'list', 'bullet',
                  'blockquote',
                  'link', 'image',
                ]}
                style={{ minHeight: '300px' }}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-[7px] flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-600 p-4 rounded-[7px] flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              {success}
            </div>
          )}

          <div className="pt-4 flex flex-wrap gap-3">
            <Button
              type="button"
              onClick={() => handleSave('published')}
              disabled={loading || draftLoading}
              className="px-6"
            >
              {loading ? (
                <><Activity className="w-4 h-4 mr-2 animate-spin" />Publishing...</>
              ) : (
                <><Send className="w-4 h-4 mr-2" />{editingId ? 'Update & Publish' : 'Publish Article'}</>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSave('draft')}
              disabled={loading || draftLoading}
              className="px-6"
            >
              {draftLoading ? (
                <><Activity className="w-4 h-4 mr-2 animate-spin" />Saving...</>
              ) : (
                <><Save className="w-4 h-4 mr-2" />{editingId ? 'Update Draft' : 'Save as Draft'}</>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* ── Published Articles List ── */}
      {activeView === 'published' && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Published Articles ({publishedArticles.length})</h3>
          {publishedArticles.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Newspaper className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No published articles yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {publishedArticles.map((article) => (
                <div key={article.id} className="flex items-center gap-4 bg-white border border-gray-200 rounded-[7px] p-4 hover:shadow-md transition-shadow group">
                  {article.image_url ? (
                    <img src={article.image_url} alt="" className="w-16 h-16 rounded-[7px] object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-16 h-16 rounded-[7px] bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <Newspaper className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm truncate">{article.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                      <span className="inline-flex items-center px-2 py-0.5 bg-green-50 text-green-700 rounded-[7px] font-medium">Published</span>
                      <span>{article.category}</span>
                      <span>{new Date(article.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleEdit(article)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-[7px] transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => window.open(`/articles/view/?id=${article.id}`, '_blank')}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-[7px] transition-colors"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(article)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-[7px] transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Drafts List ── */}
      {activeView === 'drafts' && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Draft Articles ({draftArticles.length})</h3>
          {draftArticles.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No drafts saved yet.</p>
              <p className="text-sm mt-1">Write an article and click &quot;Save as Draft&quot; to save it here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {draftArticles.map((article) => (
                <div key={article.id} className="flex items-center gap-4 bg-white border border-gray-200 rounded-[7px] p-4 hover:shadow-md transition-shadow group">
                  {article.image_url ? (
                    <img src={article.image_url} alt="" className="w-16 h-16 rounded-[7px] object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-16 h-16 rounded-[7px] bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm truncate">{article.title || '(Untitled draft)'}</h4>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                      <span className="inline-flex items-center px-2 py-0.5 bg-yellow-50 text-yellow-700 rounded-[7px] font-medium">Draft</span>
                      <span>{article.category}</span>
                      <span>Last saved: {new Date(article.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleEdit(article)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-[7px] transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handlePublishDraft(article)}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-[7px] transition-colors"
                      title="Publish"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(article)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-[7px] transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function GalleryTab() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Import & Export')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])

  const categories = [
    "Import & Export",
    "Logistics & Shipping",
    "Trade & Investment",
    "Awards & Certificates",
    "Team & Partnerships",
    "Brand Assets",
    "Other"
  ]

  useEffect(() => {
    fetchGalleryImages()
  }, [])

  const fetchGalleryImages = async () => {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)

    if (data) setGalleryImages(data)
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!imageFile) {
      setError('Please select an image')
      return
    }

    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const uploadResult = await uploadImage(imageFile, 'gallery')
      if (!uploadResult) throw new Error('Failed to upload image')

      const { error: insertError } = await supabase
        .from('gallery_images')
        .insert({
          title,
          description,
          category,
          image_url: uploadResult.url,
          storage_path: uploadResult.path
        })

      if (insertError) throw insertError

      setSuccess(true)
      setTitle('')
      setDescription('')
      setCategory('Import & Export')
      setImageFile(null)
      setImagePreview(null)
      fetchGalleryImages()
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Failed to upload image. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, storagePath: string) => {
    if (!confirm('Delete this image? This cannot be undone.')) return

    try {
      const { error: deleteError } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      await supabase.storage.from('gallery').remove([storagePath])
      fetchGalleryImages()
    } catch (err) {
      console.error(err)
      alert('Failed to delete image')
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6 pb-8 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Upload New Image</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-[7px] focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none"
            placeholder="e.g., Gold Mining Site 2024"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-[7px] focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-[7px] focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none"
            placeholder="Brief description..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image *
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
            id="gallery-image"
          />
          <label
            htmlFor="gallery-image"
            className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-[7px] shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Choose Image
          </label>
          {imagePreview && (
            <div className="mt-4 relative w-full max-w-md">
              <img src={imagePreview} alt="Preview" className="rounded-[7px] shadow-md" />
              <button
                type="button"
                onClick={() => {
                  setImageFile(null)
                  setImagePreview(null)
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-[7px] hover:bg-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-[7px] flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-600 p-4 rounded-[7px] flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Image uploaded successfully!
          </div>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Activity className="w-4 h-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Upload Image
            </>
          )}
        </Button>
      </form>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Gallery Images ({galleryImages.length})</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((img) => (
            <div key={img.id} className="relative group">
              <div className="aspect-square relative rounded-[7px] overflow-hidden bg-gray-100">
                <Image
                  src={img.image_url}
                  alt={img.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-900 truncate">{img.title}</p>
                <p className="text-xs text-gray-500">{img.category}</p>
              </div>
              <button
                onClick={() => handleDelete(img.id, img.storage_path)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-[7px] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AnnualReportsTab() {
  const [title, setTitle] = useState('')
  const [year, setYear] = useState(new Date().getFullYear())
  const [description, setDescription] = useState('')
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [reports, setReports] = useState<AnnualReport[]>([])

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    const { data } = await supabase
      .from('annual_reports')
      .select('*')
      .order('year', { ascending: false })
      .limit(50)

    if (data) setReports(data)
  }

  const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePdfSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Please select a PDF file')
        return
      }
      setPdfFile(file)
      setError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!pdfFile) {
      setError('Please select a PDF file')
      return
    }

    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const pdfResult = await uploadFile(pdfFile, 'reports', 'pdfs')
      if (!pdfResult) throw new Error('Failed to upload PDF')

      let coverImageUrl = null
      let coverStoragePath = null

      if (coverFile) {
        const coverResult = await uploadFile(coverFile, 'reports', 'covers')
        if (coverResult) {
          coverImageUrl = coverResult.url
          coverStoragePath = coverResult.path
        }
      }

      const { error: insertError } = await supabase
        .from('annual_reports')
        .insert({
          title,
          year,
          description: description || null,
          cover_image_url: coverImageUrl,
          cover_storage_path: coverStoragePath,
          pdf_url: pdfResult.url,
          pdf_storage_path: pdfResult.path,
        })

      if (insertError) throw insertError

      setSuccess(true)
      setTitle('')
      setYear(new Date().getFullYear())
      setDescription('')
      setPdfFile(null)
      setCoverFile(null)
      setCoverPreview(null)
      fetchReports()
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Failed to upload report. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (report: AnnualReport) => {
    if (!confirm(`Delete "${report.title}" (${report.year})? This cannot be undone.`)) return

    try {
      const { error: deleteError } = await supabase
        .from('annual_reports')
        .delete()
        .eq('id', report.id)

      if (deleteError) throw deleteError

      await supabase.storage.from('reports').remove([report.pdf_storage_path])
      if (report.cover_storage_path) {
        await supabase.storage.from('reports').remove([report.cover_storage_path])
      }

      fetchReports()
    } catch (err) {
      console.error(err)
      alert('Failed to delete report')
    }
  }

  const currentYear = new Date().getFullYear()
  const yearOptions = Array.from({ length: 30 }, (_, i) => currentYear - i)

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6 pb-8 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-teal-600" />
          Upload New Annual Report
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-[7px] focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none"
              placeholder="e.g., Annual Report 2024"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year *
            </label>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-[7px] focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none"
            >
              {yearOptions.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-[7px] focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none"
            placeholder="Brief summary of the annual report..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PDF File *
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handlePdfSelect}
              className="hidden"
              id="report-pdf"
            />
            <label
              htmlFor="report-pdf"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-[7px] shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <FileText className="w-4 h-4 mr-2" />
              Choose PDF
            </label>
            {pdfFile && (
              <div className="mt-3 flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-[7px]">
                <FileText className="w-4 h-4 text-teal-600" />
                <span className="truncate">{pdfFile.name}</span>
                <span className="text-gray-400">({(pdfFile.size / 1024 / 1024).toFixed(1)} MB)</span>
                <button
                  type="button"
                  onClick={() => setPdfFile(null)}
                  className="ml-auto text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverSelect}
              className="hidden"
              id="report-cover"
            />
            <label
              htmlFor="report-cover"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-[7px] shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Choose Cover
            </label>
            {coverPreview && (
              <div className="mt-3 relative w-32">
                <img src={coverPreview} alt="Cover Preview" className="rounded-[7px] shadow-md aspect-[3/4] object-cover w-full" />
                <button
                  type="button"
                  onClick={() => {
                    setCoverFile(null)
                    setCoverPreview(null)
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-[7px] hover:bg-red-600"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-[7px] flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-600 p-4 rounded-[7px] flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Annual report uploaded successfully!
          </div>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Activity className="w-4 h-4 mr-2 animate-spin" />
              Uploading Report...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Publish Annual Report
            </>
          )}
        </Button>
      </form>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Published Reports ({reports.length})
        </h3>
        {reports.length === 0 ? (
          <p className="text-gray-500">No annual reports uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <div
                key={report.id}
                className="relative group bg-white border border-gray-200 rounded-[7px] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-[3/4] relative bg-gradient-to-br from-teal-600/10 to-teal-600/5">
                  {report.cover_image_url ? (
                    <Image
                      src={report.cover_image_url}
                      alt={report.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-teal-600/40">
                      <BookOpen className="w-16 h-16 mb-2" />
                      <span className="text-4xl font-bold">{report.year}</span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-teal-600 text-white text-xs font-bold px-2 py-1 rounded-[7px]">
                    {report.year}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 text-sm truncate">{report.title}</h4>
                  {report.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{report.description}</p>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <a
                      href={report.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-teal-600 hover:underline flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      View PDF
                    </a>
                    <button
                      onClick={() => handleDelete(report)}
                      className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function InquiriesTab() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)

    if (data) setInquiries(data)
    setLoading(false)
  }

  const handleMarkSeen = async (id: string) => {
    const { error } = await supabase
      .from('inquiries')
      .update({ status: 'seen' })
      .eq('id', id)

    if (!error) {
      setInquiries(prev => prev.map(item => item.id === id ? { ...item, status: 'seen' } : item))
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this inquiry? This cannot be undone.')) return

    const { error } = await supabase
      .from('inquiries')
      .delete()
      .eq('id', id)

    if (!error) {
      setInquiries(prev => prev.filter(item => item.id !== id))
    }
  }

  if (loading) {
    return <p className="text-gray-500">Loading inquiries...</p>
  }

  if (inquiries.length === 0) {
    return <p className="text-gray-500">No inquiries yet.</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-gray-600 font-semibold">Name</th>
            <th className="px-4 py-3 text-left text-gray-600 font-semibold">Contact</th>
            <th className="px-4 py-3 text-left text-gray-600 font-semibold">Interest</th>
            <th className="px-4 py-3 text-left text-gray-600 font-semibold">Message</th>
            <th className="px-4 py-3 text-left text-gray-600 font-semibold">Date</th>
            <th className="px-4 py-3 text-left text-gray-600 font-semibold">Status</th>
            <th className="px-4 py-3 text-left text-gray-600 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {inquiries.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-900">{item.name}</td>
              <td className="px-4 py-3 text-gray-700">
                <div>{item.email || '-'}</div>
                <div className="text-xs text-gray-500">{item.phone || '-'}</div>
              </td>
              <td className="px-4 py-3 text-gray-700">{item.interest || '-'}</td>
              <td className="px-4 py-3 text-gray-700 max-w-xs truncate">{item.message}</td>
              <td className="px-4 py-3 text-gray-500 text-xs">
                {new Date(item.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-[7px] text-xs font-semibold ${
                    item.status === 'seen'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-yellow-50 text-yellow-700'
                  }`}
                >
                  {item.status === 'seen' ? 'Seen' : 'New'}
                </span>
              </td>
              <td className="px-4 py-3 space-x-2 whitespace-nowrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleMarkSeen(item.id)}
                  disabled={item.status === 'seen'}
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Mark Seen
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
