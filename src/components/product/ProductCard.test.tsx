import { describe, it, expect, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProductCard } from '@/components/product/ProductCard'
import { renderWithProviders, mockProduct } from '@/test/test-utils'

describe('ProductCard', () => {
  it('renders product name, category, and price', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)

    expect(screen.getByText('NovaTest Pro')).toBeInTheDocument()
    expect(screen.getByText('Laptops')).toBeInTheDocument()
    expect(screen.getByText('PKR 999')).toBeInTheDocument()
  })

  it('shows discount badge when product has a discount', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    expect(screen.getByText('-10%')).toBeInTheDocument()
  })

  it('shows out of stock when stock is zero', () => {
    const outOfStock = { ...mockProduct, stock: 0 }
    renderWithProviders(<ProductCard product={outOfStock} />)
    expect(screen.getByText('Out of Stock')).toBeInTheDocument()
  })

  it('adds product to cart when Add to Cart is clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ProductCard product={mockProduct} />)

    await user.click(screen.getByRole('button', { name: /add to cart/i }))
    await waitFor(() => {
      expect(screen.getByText(/added to cart/i)).toBeInTheDocument()
    })
  })

  it('calls onQuickView when quick view button is clicked', async () => {
    const user = userEvent.setup()
    const onQuickView = vi.fn()
    renderWithProviders(<ProductCard product={mockProduct} onQuickView={onQuickView} />)

    await user.click(screen.getByLabelText('Quick view'))
    expect(onQuickView).toHaveBeenCalledWith(mockProduct)
  })

  it('toggles wishlist when wishlist button is clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ProductCard product={mockProduct} />)

    const wishlistBtn = screen.getByLabelText('Add to wishlist')
    await user.click(wishlistBtn)
    expect(screen.getByLabelText('Remove from wishlist')).toBeInTheDocument()
  })
})
