'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Newspaper, Tag } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'

interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  category: string
  image_url?: string
}

export default function ArticleViewPage() {
  const searchParams = useSearchParams()
  const id = useMemo(() => searchParams.get('id') || '', [searchParams])

  const [article, setArticle] = useState<Article | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      setNotFound(false)

      if (!id) {
        setNotFound(true)
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('id', id)
          .single()

        if (data && !error) {
          const mapped: Article = {
            id: data.id,
            title: data.title,
            excerpt: data.excerpt,
            content: data.content,
            author: data.author,
            date: new Date(data.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
            readTime: data.read_time || '5 min read',
            category: data.category,
            image_url: data.image_url,
          }
          setArticle(mapped)

          // Fetch related articles from same category
          const { data: related } = await supabase
            .from('articles')
            .select('*')
            .eq('category', data.category)
            .neq('id', data.id)
            .order('created_at', { ascending: false })
            .limit(3)

          if (related && related.length > 0) {
            setRelatedArticles(
              related.map((r: any) => ({
                id: r.id,
                title: r.title,
                excerpt: r.excerpt,
                content: r.content,
                author: r.author,
                date: new Date(r.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }),
                readTime: r.read_time || '5 min read',
                category: r.category,
                image_url: r.image_url,
              }))
            )
          }
          return
        }

        setNotFound(true)
      } catch {
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    void run()
  }, [id])

  const openArticle = (articleId: string) => {
    window.location.href = `/articles/view/?id=${encodeURIComponent(articleId)}`
  }

  return (
    <main className="relative min-h-screen bg-[#F8F4EF]">
      <Navigation />

      {loading ? (
        <section className="pt-navbar pb-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-sm border border-gray-100 shadow-lg p-10">
              <div className="flex items-center gap-3 text-gray-500">
                <div className="w-5 h-5 border-2 border-[#C9A46A] border-t-transparent rounded-sm animate-spin" />
                Loading article...
              </div>
            </div>
          </div>
        </section>
      ) : notFound || !article ? (
        <section className="pt-navbar pb-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-sm border border-gray-100 shadow-lg p-10 text-center">
              <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900">Article not found</h1>
              <p className="text-gray-600 mt-2">The requested article does not exist or is unavailable.</p>
              <div className="mt-6">
                <Button onClick={() => (window.location.href = '/articles/')}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Return to News
                </Button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Hero Image Section */}
          <section className="relative w-full h-[35vh] md:h-[50vh] min-h-[250px] md:min-h-[350px] max-h-[550px] overflow-hidden bg-gray-900">
            {article.image_url ? (
              <motion.img
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2 }}
                src={article.image_url}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black" />
            )}
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

            {/* Back button */}
            <div className="absolute top-24 left-4 sm:left-6 lg:left-8 z-10">
              <button
                onClick={() => (window.location.href = '/articles/')}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/90 bg-white/10 backdrop-blur-md rounded-sm hover:bg-white/20 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to News
              </button>
            </div>

            {/* Title overlay on hero */}
            <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-5 md:pb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-4xl mx-auto"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center px-3 py-1 text-xs font-bold text-white bg-[#C9A46A] rounded-sm shadow-lg">
                    <Tag className="w-3 h-3 mr-1" />
                    {article.category}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-white/80 bg-white/10 backdrop-blur-sm rounded-sm">
                    <Clock className="w-3 h-3 mr-1" />
                    {article.readTime}
                  </span>
                </div>
                <h1 className="text-xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl">
                  {article.title}
                </h1>
              </motion.div>
            </div>
          </section>

          {/* Author Bar */}
          <section className="relative z-10 px-4 sm:px-6 lg:px-8 -mt-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-sm md:rounded-sm shadow-lg border border-gray-100 px-3 py-2.5 md:px-6 md:py-4 flex flex-wrap items-center justify-between gap-2 md:gap-4">
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="w-8 h-8 md:w-11 md:h-11 rounded-sm bg-gradient-to-br from-[#C9A46A] to-[#C9A46A] flex items-center justify-center shadow-md">
                    <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] md:text-sm font-semibold text-gray-900">{article.author}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Article Content */}
          <section className="px-4 sm:px-6 lg:px-8 py-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="max-w-3xl mx-auto"
            >
              {/* Excerpt / Lead paragraph */}
              {article.excerpt && (
                <p className="text-sm md:text-xl text-gray-600 leading-relaxed mb-4 md:mb-8 font-medium border-l-4 border-[#C9A46A] pl-3 md:pl-5">
                  {article.excerpt}
                </p>
              )}

              {/* Main content */}
              {article.content && article.content.includes('<') ? (
                <div
                  className="prose prose-lg prose-gray max-w-none
                    prose-headings:text-gray-900 prose-headings:font-bold prose-headings:leading-snug
                    prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                    prose-p:text-gray-700 prose-p:leading-relaxed
                    prose-a:text-[#C9A46A] prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-gray-900
                    prose-blockquote:border-l-[#C9A46A] prose-blockquote:bg-[#F8F4EF] prose-blockquote:py-1 prose-blockquote:px-2 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                    prose-img:rounded-sm prose-img:shadow-lg
                    prose-li:text-gray-700
                    prose-ul:list-disc prose-ol:list-decimal"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              ) : (
                <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                  {article.content || article.excerpt}
                </div>
              )}
            </motion.div>
          </section>

          {/* Bottom Navigation */}
          <section className="px-4 sm:px-6 lg:px-8 pb-6">
            <div className="max-w-3xl mx-auto">
              <div className="border-t border-gray-200 pt-6 flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => (window.location.href = '/articles/')}
                  className="text-gray-600 hover:text-[#C9A46A]"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to All News
                </Button>
              </div>
            </div>
          </section>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section className="px-4 sm:px-6 lg:px-8 pb-10 md:pb-20">
              <div className="max-w-5xl mx-auto">
                <div className="border-t border-gray-200 pt-6 md:pt-12">
                  <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-4 md:mb-8">
                    More in <span className="text-[#C9A46A]">{article.category}</span>
                  </h2>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-6">
                    {relatedArticles.map((related, index) => (
                      <motion.article
                        key={related.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        onClick={() => openArticle(related.id)}
                        className="bg-white rounded-sm md:rounded-sm shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
                      >
                        <div className="relative w-full aspect-video overflow-hidden bg-gray-200">
                          {related.image_url ? (
                            <>
                              <img
                                src={related.image_url}
                                alt={related.title}
                                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            </>
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center">
                              <Newspaper className="w-10 h-10 text-gray-400" />
                            </div>
                          )}
                          <div className="absolute bottom-2 left-2 flex items-center gap-2 text-[10px] text-white/90">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-2.5 h-2.5" />
                              {related.date}
                            </span>
                          </div>
                        </div>
                        <div className="p-2.5 md:p-4">
                          <h3 className="font-bold text-gray-900 text-[10px] md:text-sm leading-tight md:leading-snug group-hover:text-[#C9A46A] transition-colors line-clamp-2 mb-1 md:mb-2">
                            {related.title}
                          </h3>
                          <p className="text-gray-500 text-[9px] md:text-xs leading-snug md:leading-relaxed line-clamp-2">
                            {related.excerpt}
                          </p>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#C9A46A] mt-3 group-hover:gap-2 transition-all">
                            Read More
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      <Footer />
    </main>
  )
}
