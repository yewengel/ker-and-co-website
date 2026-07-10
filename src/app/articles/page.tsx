'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, ArrowRight, Gem, Mountain, Briefcase, Users, Newspaper, FileText, BookOpen, Download } from 'lucide-react'
import { supabase, AnnualReport } from '@/lib/supabase'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { brand } from '@/lib/brand'

interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date?: string
  created_at?: string
  readTime?: string
  read_time?: string
  category: string
  image_url?: string
}

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('All News')
  const [visibleCount, setVisibleCount] = useState<number>(6)
  const [annualReports, setAnnualReports] = useState<AnnualReport[]>([])
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false })
          .limit(50)
        
        if (data && data.length > 0) {
          const fetchedArticles: Article[] = data.map(article => ({
            id: article.id,
            title: article.title,
            excerpt: article.excerpt,
            content: article.content,
            author: article.author,
            date: new Date(article.created_at).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }),
            readTime: article.read_time || '5 min read',
            category: article.category,
            image_url: article.image_url
          }))

          // Set the most recent one as featured
          setFeaturedArticle(fetchedArticles[0])
          // Set the rest as the grid
          setArticles(fetchedArticles.slice(1))
        }
      } catch (error) {
        console.log("Using default articles (Supabase offline or empty)", error)
      }
    }

    fetchArticles()

    const fetchAnnualReports = async () => {
      try {
        const { data } = await supabase
          .from('annual_reports')
          .select('*')
          .order('year', { ascending: false })

        if (data) setAnnualReports(data)
      } catch (error) {
        console.log("Annual reports fetch failed", error)
      }
    }
    fetchAnnualReports()
  }, [])

  useEffect(() => {
    setVisibleCount(6)
  }, [activeCategory])

  const openArticle = (id: string) => {
    window.location.href = `/articles/view/?id=${encodeURIComponent(id)}`
  }

  const allArticles = useMemo(() => featuredArticle ? [featuredArticle, ...articles] : articles, [featuredArticle, articles])
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const a of allArticles) {
      counts[a.category] = (counts[a.category] || 0) + 1
    }
    return counts
  }, [allArticles])

  const categories = useMemo(() => {
    const iconByName: Record<string, any> = {
      Mining: Gem,
      Aggregates: Mountain,
      'Trade & Investment': Briefcase,
      Partnerships: Users,
      Operations: Mountain,
      'Company Updates': Newspaper,
      'General News': Newspaper,
      'Annual Reports': BookOpen,
    }

    const unique = Object.keys(categoryCounts).sort((a, b) => a.localeCompare(b))
    return [
      { name: 'All News', icon: Newspaper, count: allArticles.length },
      ...unique.map((name) => ({
        name,
        icon: iconByName[name] || Newspaper,
        count: categoryCounts[name] || 0,
      })),
      { name: 'Annual Reports', icon: BookOpen, count: annualReports.length },
    ]
  }, [allArticles.length, categoryCounts, annualReports.length])

  const filteredArticles = useMemo(() => {
    if (activeCategory === 'All News') return articles
    return allArticles.filter((a) => a.category === activeCategory)
  }, [activeCategory, articles, allArticles])

  const visibleArticles = useMemo(
    () => filteredArticles.slice(0, visibleCount),
    [filteredArticles, visibleCount]
  )

  const hasMore = visibleCount < filteredArticles.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-navbar pb-8 md:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6 md:mb-16"
          >
            <h1 className="text-2xl md:text-6xl font-bold text-gray-900 mb-3 md:mb-6">
              Company <span className="text-gradient">News</span>
            </h1>
            <p className="text-xs md:text-xl text-gray-600 max-w-3xl mx-auto">
              Updates and insights on the ventures, partnerships, milestones, and growth story of {brand.name}.
            </p>
          </motion.div>

          {/* Featured Article — only visible on "All News" and when articles exist */}
          {activeCategory === 'All News' && featuredArticle && <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 md:mb-20"
          >
            <div
              className="relative overflow-hidden rounded-[7px] md:rounded-[8px] shadow-xl md:shadow-2xl border border-gray-100 bg-white cursor-pointer group"
              onClick={() => openArticle(featuredArticle.id)}
            >
              <div className="flex flex-col lg:flex-row">
                {/* Left: Image */}
                <div className="relative lg:w-1/2 aspect-[16/9] lg:aspect-auto overflow-hidden bg-gray-200">
                  {featuredArticle.image_url ? (
                    <>
                      <img
                        src={featuredArticle.image_url}
                        alt={featuredArticle.title}
                        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent lg:bg-gradient-to-l lg:from-white/20 lg:via-transparent lg:to-transparent" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-medical-blue/10 via-gray-100 to-gray-200 flex items-center justify-center">
                      <Newspaper className="w-20 h-20 text-gray-300" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1.5 text-xs font-bold text-white bg-medical-blue rounded-[7px] shadow-lg">
                      Featured Article
                    </span>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="lg:w-1/2 p-4 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-center">
                  <span className="inline-flex items-center px-3 py-1 mb-4 text-xs font-semibold text-medical-blue bg-medical-blue/10 rounded-[7px] w-fit">
                    {featuredArticle.category}
                  </span>
                  <h2 className="text-base md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 md:mb-4 leading-snug group-hover:text-medical-blue transition-colors">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-[10px] md:text-base text-gray-600 mb-3 md:mb-6 leading-relaxed line-clamp-2 md:line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mb-6">
                    <div className="flex items-center space-x-1.5">
                      <Calendar className="w-4 h-4 text-medical-blue/60" />
                      <span>{featuredArticle.date}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Clock className="w-4 h-4 text-medical-blue/60" />
                      <span>{featuredArticle.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <User className="w-4 h-4 text-medical-blue/60" />
                      <span>{featuredArticle.author}</span>
                    </div>
                  </div>
                  <Button className="inline-flex items-center group/btn w-fit" onClick={(e) => { e.stopPropagation(); openArticle(featuredArticle.id) }}>
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-10 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-4 md:gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-[7px] md:rounded-[8px] shadow-lg p-3 md:p-6 sticky top-24"
              >
                <h3 className="text-sm md:text-xl font-bold text-gray-900 mb-3 md:mb-6">Categories</h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5 md:gap-0 md:space-y-3">
                  {categories.map((category, index) => {
                    const IconComponent = category.icon
                    const selected = activeCategory === category.name
                    return (
                      <button
                        key={index}
                        onClick={() => setActiveCategory(category.name)}
                        className={`w-full flex items-center justify-between p-1.5 md:p-3 rounded-[7px] transition-colors text-left group ${
                          selected ? 'bg-medical-blue/10 border border-medical-blue/20' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-1.5 md:space-x-3">
                          <IconComponent className={`w-3.5 h-3.5 md:w-5 md:h-5 ${selected ? 'text-medical-blue' : 'text-medical-blue'}`} />
                          <span className={`text-[10px] md:text-base transition-colors ${selected ? 'text-medical-blue font-semibold' : 'text-gray-700 group-hover:text-medical-blue'}`}>
                            {category.name}
                          </span>
                        </div>
                        <span className="text-[9px] md:text-sm text-gray-400 bg-gray-100 px-1.5 py-0.5 md:px-2 md:py-1 rounded-[7px]">
                          {category.count}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              {activeCategory === 'Annual Reports' ? (
                /* ── Bookshelf-Style Annual Reports Grid ── */
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                      <BookOpen className="w-7 h-7 text-teal-600" />
                      Annual Reports
                    </h2>
                    <p className="text-gray-500 mt-2">Browse our published annual reports. Click to read online or download.</p>
                  </motion.div>

                  {annualReports.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-20"
                    >
                      <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">No annual reports available yet.</p>
                      <p className="text-gray-400 text-sm mt-1">Check back soon for our latest publications.</p>
                    </motion.div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                      {annualReports.map((report, index) => (
                        <motion.div
                          key={report.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="group cursor-pointer"
                          onClick={() => {
                            window.location.href = `/articles/report/?id=${encodeURIComponent(report.id)}`
                          }}
                        >
                          {/* Book Cover */}
                          <div className="relative aspect-[3/4] rounded-[7px] overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                            {report.cover_image_url ? (
                              <img
                                src={report.cover_image_url}
                                alt={report.title}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              /* Default book cover design when no image */
                              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-medical-blue/90 via-medical-blue/80 to-medical-red">
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-[7px] bg-white/10 flex items-center justify-center mb-4">
                                  <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-white" />
                                </div>
                                <span className="text-white/90 text-xs md:text-sm font-medium tracking-widest uppercase mb-2">Annual Report</span>
                                <span className="text-white text-3xl md:text-5xl font-bold">{report.year}</span>
                                <div className="w-12 h-0.5 bg-white/30 mt-4 mb-3" />
                                <span className="text-white/70 text-[10px] md:text-xs text-center leading-relaxed">
                                  {brand.shortName}
                                </span>
                              </div>
                            )}

                            {/* Overlay gradient for covers with images */}
                            {report.cover_image_url && (
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            )}

                            {/* Year badge */}
                            <div className="absolute top-3 right-3 bg-medical-blue text-white text-xs font-bold px-2.5 py-1 rounded-[7px] shadow-lg">
                              {report.year}
                            </div>

                            {/* Bottom info overlay (for covers with images) */}
                            {report.cover_image_url && (
                              <div className="absolute bottom-0 left-0 right-0 p-4">
                                <p className="text-white font-bold text-sm md:text-base leading-tight line-clamp-2">
                                  {report.title}
                                </p>
                                <p className="text-white/60 text-[10px] md:text-xs mt-1">
                                  {brand.shortName}
                                </p>
                              </div>
                            )}

                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-medical-blue/0 group-hover:bg-medical-blue/10 transition-colors duration-300 flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/95 backdrop-blur-sm rounded-[7px] px-5 py-2.5 shadow-xl flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-medical-blue" />
                                <span className="text-sm font-semibold text-gray-900">Read Report</span>
                              </div>
                            </div>

                            {/* Book spine effect (left edge) */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-white/20 via-white/5 to-white/20" />
                          </div>

                          {/* Book info below cover */}
                          <div className="mt-4 px-1">
                            <h3 className="font-bold text-gray-900 text-sm md:text-base leading-tight group-hover:text-medical-blue transition-colors line-clamp-2">
                              {report.title}
                            </h3>
                            {report.description && (
                              <p className="text-gray-500 text-xs md:text-sm mt-1.5 line-clamp-2 leading-relaxed">
                                {report.description}
                              </p>
                            )}
                            <div className="flex items-center gap-3 mt-3">
                              <span className="text-xs text-gray-400 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {report.year}
                              </span>
                              <a
                                href={report.pdf_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-xs text-medical-blue hover:underline flex items-center gap-1"
                              >
                                <Download className="w-3 h-3" />
                                Download PDF
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* ── Normal Articles Grid ── */
                <>
                  {visibleArticles.length === 0 && !featuredArticle && activeCategory === 'All News' ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                      <Newspaper className="w-16 h-16 text-gray-300 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">No articles yet</h3>
                      <p className="text-gray-500 max-w-md">
                        Articles will appear here once they are published from the admin dashboard.
                      </p>
                    </div>
                  ) : visibleArticles.length === 0 && activeCategory !== 'All News' ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                      <p className="text-gray-500">No articles in this category yet.</p>
                    </div>
                  ) : null}
                  <div className="grid grid-cols-2 gap-2.5 md:gap-8">
                    {visibleArticles.map((article, index) => (
                      <motion.article
                        key={article.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        onClick={() => openArticle(article.id)}
                        className="bg-white rounded-[7px] md:rounded-[8px] shadow-md md:shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden flex flex-col"
                      >
                        {/* Image with fixed aspect ratio */}
                        <div className="relative w-full aspect-video overflow-hidden bg-gray-200">
                          {article.image_url ? (
                            <>
                              <img
                                src={article.image_url}
                                alt={article.title}
                                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            </>
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center">
                              <Newspaper className="w-12 h-12 text-gray-400" />
                            </div>
                          )}
                          <div className="absolute top-3 left-3">
                            <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-bold text-white bg-medical-blue rounded-[7px] shadow-md">
                              {article.category}
                            </span>
                          </div>
                          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3 text-[11px] text-white/90">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{article.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{article.readTime}</span>
                            </div>
                          </div>
                        </div>

                        {/* Card body */}
                        <div className="p-2.5 md:p-5 flex flex-col justify-between flex-1">
                          <div>
                            <h3 className="text-[11px] md:text-lg font-bold text-gray-900 mb-1 md:mb-2 leading-tight md:leading-snug group-hover:text-medical-blue transition-colors line-clamp-2">
                              {article.title}
                            </h3>
                            <p className="text-[9px] md:text-sm text-gray-500 leading-snug md:leading-relaxed line-clamp-2">
                              {article.excerpt}
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <div className="w-6 h-6 rounded-[7px] bg-medical-blue/10 flex items-center justify-center">
                                <User className="w-3 h-3 text-medical-blue" />
                              </div>
                              <span className="truncate max-w-[140px]">{article.author}</span>
                            </div>
                            <span className="text-xs font-semibold text-medical-blue flex items-center gap-1 group-hover:gap-2 transition-all">
                              Read More
                              <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>

                  {/* Load More Button — only show when grid has articles */}
                  {filteredArticles.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="text-center mt-12"
                    >
                      {hasMore && (
                        <Button
                          variant="outline"
                          size="lg"
                          className="group"
                          onClick={() => setVisibleCount((prev) => prev + 6)}
                        >
                          Load More Articles
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      )}
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Articles
