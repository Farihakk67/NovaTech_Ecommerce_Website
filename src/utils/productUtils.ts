import type { Product, ProductFilters } from '@/types'
import { PAGINATION } from '@/constants'

export function sortProducts(products: Product[], sort: ProductFilters['sort']): Product[] {
  const sorted = [...products]

  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'newest':
      return sorted.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0))
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'featured':
    default:
      return sorted.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1
        return b.rating - a.rating
      })
  }
}

export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  return products.filter((product) => {
    const searchMatch =
      !filters.search ||
      product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.tags.some((tag) => tag.toLowerCase().includes(filters.search.toLowerCase()))

    const categoryMatch =
      filters.categories.length === 0 || filters.categories.includes(product.category)

    const priceMatch = product.price >= filters.minPrice && product.price <= filters.maxPrice

    const ratingMatch = product.rating >= filters.minRating

    return searchMatch && categoryMatch && priceMatch && ratingMatch
  })
}

export function paginateProducts<T>(
  items: T[],
  page: number,
  pageSize: number = PAGINATION.defaultPageSize,
): { items: T[]; totalPages: number; totalItems: number } {
  const totalItems = items.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * pageSize

  return {
    items: items.slice(start, start + pageSize),
    totalPages,
    totalItems,
  }
}

export function getRelatedProducts(
  products: Product[],
  currentProduct: Product,
  limit = 4,
): Product[] {
  return products
    .filter(
      (p) =>
        p.id !== currentProduct.id &&
        (p.category === currentProduct.category ||
          p.tags.some((tag) => currentProduct.tags.includes(tag))),
    )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
}

export function searchProducts(products: Product[], query: string): Product[] {
  if (!query.trim()) return []
  const lower = query.toLowerCase()
  return products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower) ||
        p.tags.some((t) => t.toLowerCase().includes(lower)),
    )
    .slice(0, 8)
}
