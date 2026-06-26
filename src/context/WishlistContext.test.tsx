import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, mockProduct } from '@/test/test-utils'
import { useWishlist } from '@/context/WishlistContext'

function WishlistTestHarness() {
  const { items, count, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist } =
    useWishlist()

  return (
    <div>
      <span data-testid="wishlist-count">{count}</span>
      <span data-testid="is-in-wishlist">{isInWishlist(mockProduct.id) ? 'yes' : 'no'}</span>
      <button onClick={() => addToWishlist(mockProduct)}>Add to Wishlist</button>
      <button onClick={() => removeFromWishlist(mockProduct.id)}>Remove from Wishlist</button>
      <button onClick={() => toggleWishlist(mockProduct)}>Toggle Wishlist</button>
      <ul>
        {items.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  )
}

describe('Wishlist', () => {
  it('starts with empty wishlist', () => {
    renderWithProviders(<WishlistTestHarness />)
    expect(screen.getByTestId('wishlist-count')).toHaveTextContent('0')
  })

  it('adds product to wishlist', async () => {
    const user = userEvent.setup()
    renderWithProviders(<WishlistTestHarness />)

    await user.click(screen.getByText('Add to Wishlist'))
    expect(screen.getByTestId('wishlist-count')).toHaveTextContent('1')
    expect(screen.getByText('NovaTest Pro')).toBeInTheDocument()
  })

  it('removes product from wishlist', async () => {
    const user = userEvent.setup()
    renderWithProviders(<WishlistTestHarness />)

    await user.click(screen.getByText('Add to Wishlist'))
    await user.click(screen.getByText('Remove from Wishlist'))
    expect(screen.getByTestId('wishlist-count')).toHaveTextContent('0')
  })

  it('toggles product in wishlist', async () => {
    const user = userEvent.setup()
    renderWithProviders(<WishlistTestHarness />)

    await user.click(screen.getByText('Toggle Wishlist'))
    expect(screen.getByTestId('is-in-wishlist')).toHaveTextContent('yes')

    await user.click(screen.getByText('Toggle Wishlist'))
    expect(screen.getByTestId('is-in-wishlist')).toHaveTextContent('no')
  })

  it('persists wishlist to localStorage', async () => {
    const user = userEvent.setup()
    renderWithProviders(<WishlistTestHarness />)

    await user.click(screen.getByText('Add to Wishlist'))
    const stored = localStorage.getItem('novatech_wishlist')
    expect(stored).toBeTruthy()
    expect(stored).toContain('NovaTest Pro')
  })
})
