import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiMagnifyingGlass,
  HiShoppingBag,
  HiHeart,
  HiSun,
  HiMoon,
  HiBars3,
  HiXMark,
} from 'react-icons/hi2'
import { APP_NAME, NAV_LINKS } from '@/constants'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useTheme } from '@/context/ThemeContext'
import { useDebounce } from '@/hooks/useDebounce'
import { searchProducts } from '@/utils/productUtils'
import { products } from '@/data/products'
import { cn } from '@/utils'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { itemCount, openCart } = useCart()
  const { count: wishlistCount } = useWishlist()
  const { isDark, toggleTheme } = useTheme()
  const debouncedSearch = useDebounce(searchQuery, 250)
  const searchResults = debouncedSearch ? searchProducts(products, debouncedSearch) : []

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsMenuOpen(false)
      setShowSearch(false)
      setSearchQuery('')
    }, 0)

    return () => window.clearTimeout(timer)
  }, [location.pathname])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchSelect = (productId: string) => {
    navigate(`/product/${productId}`)
    setShowSearch(false)
    setSearchQuery('')
  }

  return (
    <header className="sticky top-0 z-40 glass border-b border-border/50">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label={`${APP_NAME} home`}>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary">
            <span className="text-sm font-bold text-white">N</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-text hidden sm:block">
            {APP_NAME}
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  location.pathname === link.to
                    ? 'text-secondary bg-secondary/10'
                    : 'text-text-muted hover:text-text hover:bg-border/50',
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div ref={searchRef} className="relative">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-border/50 transition-colors"
              aria-label="Search products"
              aria-expanded={showSearch}
            >
              <HiMagnifyingGlass className="h-5 w-5 text-text" />
            </button>

            <AnimatePresence>
              {showSearch && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-border bg-surface shadow-card overflow-hidden"
                >
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full border-b border-border px-4 py-3 text-sm bg-transparent outline-none"
                    autoFocus
                    aria-label="Search products"
                  />
                  {searchResults.length > 0 && (
                    <ul className="max-h-64 overflow-y-auto py-2">
                      {searchResults.map((product) => (
                        <li key={product.id}>
                          <button
                            onClick={() => handleSearchSelect(product.id)}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-border/50 transition-colors"
                          >
                            <img
                              src={product.images[0]}
                              alt=""
                              className="h-10 w-10 rounded-lg object-cover"
                            />
                            <div>
                              <p className="text-sm font-medium text-text line-clamp-1">
                                {product.name}
                              </p>
                              <p className="text-xs text-text-muted capitalize">
                                {product.category.replace('-', ' ')}
                              </p>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {debouncedSearch && searchResults.length === 0 && (
                    <p className="px-4 py-6 text-sm text-text-muted text-center">
                      No products found
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-border/50 transition-colors"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <HiSun className="h-5 w-5" /> : <HiMoon className="h-5 w-5" />}
          </button>

          <Link
            to="/shop"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl hover:bg-border/50 transition-colors"
            aria-label={`Wishlist (${wishlistCount} items)`}
          >
            <HiHeart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full gradient-primary text-[10px] font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          <button
            onClick={openCart}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl hover:bg-border/50 transition-colors"
            aria-label={`Cart (${itemCount} items)`}
          >
            <HiShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full gradient-primary text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-border/50 transition-colors md:hidden"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <HiXMark className="h-5 w-5" /> : <HiBars3 className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border overflow-hidden"
          >
            <ul className="flex flex-col p-4 gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={cn(
                      'block px-4 py-3 rounded-xl text-base font-medium transition-colors',
                      location.pathname === link.to
                        ? 'text-secondary bg-secondary/10'
                        : 'text-text hover:bg-border/50',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
