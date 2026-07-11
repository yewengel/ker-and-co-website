'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, ChevronDown, Phone, Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { brand } from '@/lib/brand'
import { cn } from '@/lib/utils'

const BEIGE = '#F8F4EF'

const Navigation = () => {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  type NavLeafItem = {
    name: string
    href: string
    children?: never
    variant?: 'default' | 'contact'
  }
  type NavGroupItem = {
    name: string
    children: Array<{ name: string; href: string }>
    href?: string
    variant?: never
  }

  const navItems: Array<NavLeafItem | NavGroupItem> = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    {
      name: 'Departments',
      href: '/departments',
      children: [
        { name: 'FMCG & Rural Distribution', href: '/departments#distribution' },
        { name: 'Paper & Sanitary Products', href: '/departments#paper' },
        { name: 'Hospitality & Wellness', href: '/departments#hospitality' },
        { name: 'Real Estate Development', href: '/departments#real-estate' },
      ],
    },
    { name: 'Partners', href: '/partnerships' },
    { name: 'Leadership', href: '/leadership' },
    {
      name: 'More',
      children: [
        { name: 'News & Articles', href: '/articles' },
        { name: 'Events', href: '/events' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Careers', href: '/careers' },
      ],
    },
    { name: 'Location', href: '#contact' },
    { name: 'Contact Us', href: '#contact', variant: 'contact' },
  ]

  const isNavActive = (href: string) => {
    if (href.startsWith('#')) return false
    if (href === '/') return pathname === '/' || pathname === '/index.html'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const isGroupActive = (item: NavGroupItem) => {
    if (item.href && isNavActive(item.href)) return true
    return item.children.some((child) => {
      const childPath = child.href.split('#')[0]
      return childPath ? isNavActive(childPath) : false
    })
  }

  const handleNavigation = (href: string) => {
    if (href.startsWith('#')) {
      if (window.location.pathname !== '/') {
        window.location.href = '/' + href
      } else {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
      setOpenDropdown(null)
      setMobileMenuOpen(false)
    } else {
      window.location.href = href
      setOpenDropdown(null)
      setMobileMenuOpen(false)
    }
  }

  const headerPadding =
    'px-6 sm:px-10 md:px-14 lg:px-[64px] xl:px-[80px] 2xl:px-[96px]'

  const navLinkBase =
    'relative whitespace-nowrap text-[14px] md:text-[15px] lg:text-[16px] font-medium tracking-[0.03em] transition-colors duration-200 py-1'

  const getNavLinkClass = (active: boolean, isHome?: boolean, isTransparent?: boolean) =>
    cn(
      navLinkBase,
      'after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:transition-all after:duration-300',
      active
        ? (isTransparent
            ? 'text-white after:w-full after:bg-white'
            : (isHome ? 'text-black after:w-full after:bg-black' : 'text-[#C9A46A] after:w-full after:bg-[#C9A46A]'))
        : (isTransparent
            ? 'text-white after:w-0 after:bg-white hover:after:w-full'
            : (isHome ? 'text-black after:w-0 after:bg-black hover:after:w-full' : 'text-[#222222] after:w-0 after:bg-[#C9A46A] hover:text-[#C9A46A] hover:after:w-full'))
    )

  const renderNavItem = (item: NavLeafItem | NavGroupItem, isTransparent?: boolean) => {
    if ('variant' in item && item.variant === 'contact') {
      return (
        <button
          key={item.name}
          type="button"
          onClick={() => handleNavigation(item.href)}
          className={cn(
            'shrink-0 inline-flex items-center justify-center rounded-none bg-[#C9A46A] text-white px-4 md:px-5',
            getNavLinkClass(false, undefined, isTransparent),
            'after:hidden' // Hide the underline pseudo-element since we have a solid background
          )}
        >
          {item.name}
        </button>
      )
    }

    if ('children' in item) {
      const isActive = openDropdown === item.name
      const isCurrent = isGroupActive(item as NavGroupItem)
      const hasLandingHref = Boolean(item.href)
      return (
        <div
          key={item.name}
          className="relative shrink-0"
          onMouseEnter={() => setOpenDropdown(item.name)}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <div className="inline-flex items-center gap-0.5">
            <button
              type="button"
              onClick={() => {
                if (hasLandingHref && item.href) {
                  handleNavigation(item.href)
                  return
                }
                setOpenDropdown(isActive ? null : item.name)
              }}
              className={cn('inline-flex items-center', getNavLinkClass(isCurrent, undefined, isTransparent))}
            >
              <span>{item.name}</span>
            </button>

            <button
              type="button"
              aria-label={`Toggle ${item.name} menu`}
              onClick={() => setOpenDropdown(isActive ? null : item.name)}
              className={cn(
                'p-1 rounded-[6px] transition-colors hover:bg-[#F8F4EF]',
                isTransparent ? 'text-white hover:text-[#C9A46A]' : 'text-[#222222] hover:text-[#C9A46A]'
              )}
            >
              <ChevronDown
                className={cn(
                  'w-4 h-4 transition-transform duration-200',
                  isActive ? 'rotate-180 text-[#C9A46A]' : 'rotate-0'
                )}
                strokeWidth={1.75}
              />
            </button>
          </div>

          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 rounded-sm bg-white shadow-[0_20px_48px_rgba(34,34,34,0.08)] border border-[#E7DED2] overflow-hidden z-50"
              >
                <div className="py-2">
                  {item.children?.map((child) => (
                    <button
                      key={child.name}
                      type="button"
                      onClick={() => handleNavigation(child.href)}
                      className="w-full text-left px-5 py-3 text-[14px] text-[#222222] hover:bg-[#F8F4EF] hover:text-[#C9A46A] transition-colors"
                    >
                      {child.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )
    }

    return (
      <button
        key={item.name}
        type="button"
        onClick={() => handleNavigation(item.href)}
        className={cn('shrink-0', getNavLinkClass(isNavActive(item.href), item.name === 'Home', isTransparent))}
      >
        {item.name}
      </button>
    )
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out',
        scrolled && 'shadow-[0_4px_32px_rgba(0,0,0,0.07)]'
      )}
    >
      {/* Top information bar — beige/cream, hidden when transparent */}
      <motion.div
        initial={false}
        animate={{
          height: scrolled ? 'auto' : 0,
          opacity: scrolled ? 1 : 0,
          borderBottomWidth: scrolled ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'w-full overflow-hidden border-b border-[#E8E2DA]',
          headerPadding
        )}
        style={{ backgroundColor: BEIGE }}
      >
        <div className="flex min-h-[52px] h-auto sm:h-[52px] items-center justify-end py-2 sm:py-0 max-w-[1600px] mx-auto">
          <div className="inline-flex flex-wrap justify-end items-center gap-x-6 md:gap-x-8 gap-y-2">
            <a
              href={brand.phoneHref}
              className="inline-flex items-center gap-2.5 text-[13px] md:text-[14px] lg:text-[15px] font-medium text-[#222222] transition-colors hover:text-[#C9A46A] shrink-0"
            >
              <Phone className="w-5 h-5 text-[#C9A46A]" strokeWidth={1.75} />
              <span className="whitespace-nowrap">{brand.phone}</span>
            </a>

            <div className="inline-flex items-center gap-2.5 min-w-0">
              <MapPin className="w-5 h-5 text-[#C9A46A] shrink-0" strokeWidth={1.75} />
              <span className="text-[13px] md:text-[14px] lg:text-[15px] font-medium text-[#222222] truncate">
                {brand.location}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main navigation bar */}
      <nav
        className={cn(
          'w-full transition-all duration-300 ease-in-out border-b',
          scrolled
            ? 'bg-white border-[#E8E2DA]'
            : 'bg-transparent border-transparent',
          headerPadding
        )}
      >
        <div className="grid grid-cols-[auto_1fr] lg:grid-cols-[1fr_auto_1fr] items-center h-[92px] md:h-[100px] lg:h-[108px] gap-4 lg:gap-10 max-w-[1600px] mx-auto">
          {/* Logo + company name */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex shrink-0 items-center cursor-pointer group lg:justify-self-start lg:mr-10"
            onClick={() => handleNavigation('/')}
          >
            <div className="w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] md:w-[80px] md:h-[80px] lg:w-[84px] lg:h-[84px] rounded-sm overflow-hidden bg-white border border-[#E7DED2] flex items-center justify-center shrink-0 transition-shadow duration-300 group-hover:shadow-[0_8px_24px_rgba(210,180,140,0.2)]">
              <img
                src={brand.logoPath}
                alt={`${brand.name} Logo`}
                className="w-[90%] h-[90%] object-contain"
              />
            </div>
            <div className="ml-4 sm:ml-5 md:ml-6 leading-tight">
              <div className={cn(
                'font-heading font-bold text-lg sm:text-xl md:text-2xl lg:text-[1.65rem] whitespace-nowrap tracking-tight transition-colors duration-300',
                scrolled ? 'text-[#222222]' : 'text-white'
              )}>
                Ker &amp; Co.
              </div>
              <div className={cn(
                'text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.26em] whitespace-nowrap mt-1 transition-colors duration-300',
                scrolled ? 'text-[#666666]' : 'text-white/80'
              )}>
                Business Group
              </div>
            </div>
          </motion.div>

          {/* Centered navigation links (desktop only) */}
          <div className="hidden lg:flex items-center justify-center min-w-0 overflow-x-auto scrollbar-none justify-self-center">
            <div className="flex items-center gap-x-6 md:gap-x-8 lg:gap-x-10 xl:gap-x-13 px-2">
              {navItems.map((item) => renderNavItem(item, !scrolled))}
            </div>
          </div>

          {/* Balance column for centered nav on desktop */}
          <div className="hidden lg:block lg:justify-self-end" aria-hidden="true">
            <div className="flex items-center opacity-0 pointer-events-none">
              <div className="w-[84px] h-[84px]" />
              <div className="ml-6 leading-tight">
                <div className="font-heading font-bold text-[1.65rem]">Ker &amp; Co.</div>
                <div className="text-[11px] uppercase tracking-[0.26em]">Business Group</div>
              </div>
            </div>
          </div>

          {/* Hamburger button (mobile/tablet only) */}
          <div className="flex justify-end lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#C9A46A]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden bg-white border-b border-[#E8E2DA] overflow-hidden"
            >
              <div className="px-6 sm:px-10 md:px-14 py-6 space-y-4">
                {navItems.map((item) => {
                  if ('variant' in item && item.variant === 'contact') {
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => handleNavigation(item.href)}
                        className="w-full inline-flex items-center justify-center h-10 md:h-11 px-6 md:px-7 text-[14px] md:text-[15px] font-semibold text-white rounded-sm bg-[#C9A46A] hover:bg-[#C9A46A] transition-colors duration-200 shadow-sm"
                      >
                        {item.name}
                      </button>
                    )
                  }

                  if ('children' in item) {
                    const isActive = openDropdown === item.name
                    const isCurrent = isGroupActive(item as any)
                    return (
                      <div key={item.name} className="space-y-2">
                        <button
                          type="button"
                          onClick={() => setOpenDropdown(isActive ? null : item.name)}
                          className={cn(
                            'w-full flex items-center justify-between text-left',
                            getNavLinkClass(isCurrent)
                          )}
                        >
                          <span>{item.name}</span>
                          <ChevronDown
                            className={cn(
                              'w-5 h-5 transition-transform duration-200',
                              isActive ? 'rotate-180' : ''
                            )}
                            strokeWidth={1.75}
                          />
                        </button>
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4 space-y-2"
                            >
                              {item.children?.map((child) => (
                                <button
                                  key={child.name}
                                  type="button"
                                  onClick={() => handleNavigation(child.href)}
                                  className="w-full text-left py-2 text-[14px] text-[#222222] hover:text-[#C9A46A] transition-colors"
                                >
                                  {child.name}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  }

                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => handleNavigation(item.href)}
                      className={cn('w-full text-left', getNavLinkClass(isNavActive(item.href), item.name === 'Home'))}
                    >
                      {item.name}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

export default Navigation
