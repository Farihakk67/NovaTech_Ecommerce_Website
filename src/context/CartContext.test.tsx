import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, mockProduct } from '@/test/test-utils'
import { useCart } from '@/context/CartContext'
import { CartDrawer } from '@/components/cart/CartDrawer'

function CartTestHarness() {
  const { addToCart, itemCount } = useCart()

  return (
    <>
      <button onClick={() => addToCart(mockProduct, 2)}>Add Test Product</button>
      <span data-testid="cart-count">{itemCount}</span>
      <CartDrawer />
    </>
  )
}

describe('Shopping Cart', () => {
  it('adds items to cart and updates count', async () => {
    const user = userEvent.setup()
    renderWithProviders(<CartTestHarness />)

    await user.click(screen.getByText('Add Test Product'))
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2')
  })

  it('displays cart drawer with items', async () => {
    const user = userEvent.setup()
    renderWithProviders(
      <>
        <CartTestHarness />
        <NavbarCartTrigger />
      </>,
    )

    await user.click(screen.getByText('Add Test Product'))
    await user.click(screen.getByLabelText(/cart/i))
    expect(screen.getByRole('dialog', { name: 'Shopping cart' })).toBeInTheDocument()
    expect(screen.getByText('NovaTest Pro')).toBeInTheDocument()
  })

  it('persists cart to localStorage', async () => {
    const user = userEvent.setup()
    renderWithProviders(<CartTestHarness />)

    await user.click(screen.getByText('Add Test Product'))
    const stored = localStorage.getItem('novatech_cart')
    expect(stored).toBeTruthy()
    expect(stored).toContain('NovaTest Pro')
  })

  it('removes item from cart', async () => {
    const user = userEvent.setup()
    renderWithProviders(
      <>
        <CartTestHarness />
        <NavbarCartTrigger />
      </>,
    )

    await user.click(screen.getByText('Add Test Product'))
    await user.click(screen.getByLabelText(/cart/i))
    await user.click(screen.getByLabelText('Remove item'))
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
  })
})

function NavbarCartTrigger() {
  const { openCart } = useCart()
  return (
    <button onClick={openCart} aria-label="Cart (1 items)">
      Open Cart
    </button>
  )
}
