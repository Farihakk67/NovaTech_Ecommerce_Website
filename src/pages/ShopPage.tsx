import { useState, useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { HiAdjustmentsHorizontal, HiXMark } from 'react-icons/hi2'
import type { Product, ProductCategory, SortOption } from '@/types'
import { products } from '@/data/products'
import { ProductCard } from '@/components/product/ProductCard'
import { QuickViewModal } from '@/components/product/QuickViewModal'
import { ProductGridSkeleton } from '@/components/common/LoadingSkeleton'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { SEO } from '@/components/common/Toast'
import { filterProducts, sortProducts, paginateProducts } from '@/utils/productUtils'
import { CATEGORIES, SORT_OPTIONS, PRICE_RANGE, PAGINATION } from '@/constants'
import { getPaginationRange, cn } from '@/utils'

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading] = useState(false)

  const search = searchParams.get('search') ?? ''
  const categoryParam = searchParams.get('category')
  const sort = (searchParams.get('sort') as SortOption) ?? 'featured'
  const page = Number(searchParams.get('page') ?? '1')
  const minPrice = Number(searchParams.get('minPrice') ?? PRICE_RANGE.min)
  const maxPrice = Number(searchParams.get('maxPrice') ?? PRICE_RANGE.max)
  const minRating = Number(searchParams.get('minRating') ?? '0')

  const categories: ProductCategory[] = categoryParam
    ? [categoryParam as ProductCategory]
    : (searchParams.getAll('categories') as ProductCategory[])

  const filters = useMemo(
    () => ({
      search,
      categories,
      minPrice,
      maxPrice,
      minRating,
      sort,
      page,
      pageSize: PAGINATION.defaultPageSize,
    }),
    [search, categories, minPrice, maxPrice, minRating, sort, page],
  )

  const filtered = useMemo(() => {
    const result = filterProducts(products, filters)
    return sortProducts(result, sort)
  }, [filters, sort])

  const { items, totalPages, totalItems } = useMemo(
    () => paginateProducts(filtered, page, PAGINATION.defaultPageSize),
    [filtered, page],
  )

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev)
        Object.entries(updates).forEach(([key, value]) => {
          if (value === null || value === '') next.delete(key)
          else next.set(key, value)
        })
        if (!('page' in updates)) next.delete('page')
        return next
      })
    },
    [setSearchParams],
  )

  const toggleCategory = (catId: ProductCategory) => {
    const current = new Set(categories)
    if (current.has(catId)) current.delete(catId)
    else current.add(catId)
    const arr = Array.from(current)
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.delete('category')
      next.delete('categories')
      next.delete('page')
      arr.forEach((c) => next.append('categories', c))
      return next
    })
  }

  const paginationRange = getPaginationRange(page, totalPages)

  return (
    <>
      <SEO
        title="Shop"
        description="Browse NovaTech's premium collection of consumer electronics."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <ScrollReveal>
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-text">Shop All Products</h1>
            <p className="mt-2 text-text-muted">
              {totalItems} product{totalItems !== 1 ? 's' : ''} available
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside
            className={cn(
              'lg:w-64 shrink-0',
              showFilters
                ? 'fixed inset-0 z-40 bg-black/50 lg:static lg:bg-transparent'
                : 'hidden lg:block',
            )}
          >
            <div
              className={cn(
                'lg:sticky lg:top-24 rounded-2xl border border-border bg-surface p-6',
                showFilters &&
                  'fixed right-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto z-50 rounded-none lg:rounded-2xl lg:relative lg:h-auto lg:w-auto',
              )}
            >
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h2 className="font-bold text-text">Filters</h2>
                <button onClick={() => setShowFilters(false)} aria-label="Close filters">
                  <HiXMark className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="shop-search"
                    className="text-sm font-semibold text-text mb-2 block"
                  >
                    Search
                  </label>
                  <input
                    id="shop-search"
                    type="search"
                    value={search}
                    onChange={(e) => updateParams({ search: e.target.value || null })}
                    placeholder="Search products..."
                    className="w-full h-10 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-secondary"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-text mb-3">Categories</p>
                  <div className="space-y-2">
                    {CATEGORIES.map((cat) => (
                      <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={categories.includes(cat.id)}
                          onChange={() => toggleCategory(cat.id)}
                          className="rounded border-border text-secondary focus:ring-secondary"
                        />
                        <span className="text-sm text-text-muted">{cat.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-text mb-3">
                    Price: ${minPrice} – ${maxPrice}
                  </p>
                  <input
                    type="range"
                    min={PRICE_RANGE.min}
                    max={PRICE_RANGE.max}
                    step={PRICE_RANGE.step}
                    value={maxPrice}
                    onChange={(e) => updateParams({ maxPrice: e.target.value })}
                    className="w-full accent-secondary"
                    aria-label="Maximum price filter"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-text mb-3">Minimum Rating</p>
                  <div className="flex gap-2">
                    {[0, 3, 4, 4.5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() =>
                          updateParams({ minRating: rating === 0 ? null : String(rating) })
                        }
                        className={cn(
                          'px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors',
                          minRating === rating
                            ? 'border-secondary bg-secondary/10 text-secondary'
                            : 'border-border text-text-muted hover:border-secondary/50',
                        )}
                      >
                        {rating === 0 ? 'All' : `${rating}+ ★`}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSearchParams({})}
                  className="w-full text-sm text-secondary hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium"
              >
                <HiAdjustmentsHorizontal className="h-4 w-4" />
                Filters
              </button>

              <select
                value={sort}
                onChange={(e) => updateParams({ sort: e.target.value })}
                className="h-10 rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:border-secondary ml-auto"
                aria-label="Sort products"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {isLoading ? (
              <ProductGridSkeleton />
            ) : items.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-lg font-medium text-text">No products found</p>
                <p className="text-text-muted mt-2">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {items.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <nav className="flex justify-center gap-2 mt-12" aria-label="Pagination">
                <button
                  onClick={() => updateParams({ page: String(page - 1) })}
                  disabled={page <= 1}
                  className="px-4 py-2 rounded-xl border border-border text-sm disabled:opacity-50 hover:bg-surface transition-colors"
                >
                  Previous
                </button>
                {paginationRange.map((p, i) =>
                  p === 'ellipsis' ? (
                    <span key={`e-${i}`} className="px-2 py-2 text-text-muted">
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => updateParams({ page: String(p) })}
                      className={cn(
                        'h-10 w-10 rounded-xl text-sm font-medium transition-colors',
                        page === p
                          ? 'gradient-primary text-white'
                          : 'border border-border hover:bg-surface',
                      )}
                      aria-current={page === p ? 'page' : undefined}
                    >
                      {p}
                    </button>
                  ),
                )}
                <button
                  onClick={() => updateParams({ page: String(page + 1) })}
                  disabled={page >= totalPages}
                  className="px-4 py-2 rounded-xl border border-border text-sm disabled:opacity-50 hover:bg-surface transition-colors"
                >
                  Next
                </button>
              </nav>
            )}
          </div>
        </div>
      </div>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </>
  )
}
