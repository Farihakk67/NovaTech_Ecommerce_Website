import { describe, it, expect } from 'vitest'
import { searchProducts } from '@/utils/productUtils'
import { products } from '@/data/products'

describe('Product Search', () => {
  it('returns empty array for empty query', () => {
    expect(searchProducts(products, '')).toEqual([])
    expect(searchProducts(products, '   ')).toEqual([])
  })

  it('finds products by name', () => {
    const results = searchProducts(products, 'NovaBook')
    expect(results.length).toBeGreaterThan(0)
    results.forEach((p) => {
      expect(p.name.toLowerCase()).toContain('novabook')
    })
  })

  it('finds products by category', () => {
    const results = searchProducts(products, 'laptops')
    expect(results.length).toBeGreaterThan(0)
  })

  it('finds products by tag', () => {
    const results = searchProducts(products, 'gaming')
    expect(results.length).toBeGreaterThan(0)
  })

  it('is case insensitive', () => {
    const lower = searchProducts(products, 'novaphone')
    const upper = searchProducts(products, 'NOVAPHONE')
    expect(lower.length).toBe(upper.length)
  })

  it('limits results to 8 items', () => {
    const results = searchProducts(products, 'nova')
    expect(results.length).toBeLessThanOrEqual(8)
  })

  it('returns no results for non-existent query', () => {
    const results = searchProducts(products, 'xyznonexistent123')
    expect(results).toEqual([])
  })
})
