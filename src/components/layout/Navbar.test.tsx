import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Navbar } from '@/components/layout/Navbar'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { renderWithProviders } from '@/test/test-utils'
import { APP_NAME, NAV_LINKS } from '@/constants'

describe('Navbar', () => {
  it('renders the brand logo and name', () => {
    renderWithProviders(<Navbar />)
    expect(screen.getByLabelText(`${APP_NAME} home`)).toBeInTheDocument()
    expect(screen.getByText(APP_NAME)).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    renderWithProviders(<Navbar />)
    NAV_LINKS.forEach((link) => {
      expect(screen.getAllByText(link.label).length).toBeGreaterThan(0)
    })
  })

  it('opens mobile menu when hamburger is clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Navbar />)

    const menuButton = screen.getByLabelText('Open menu')
    await user.click(menuButton)

    expect(screen.getByLabelText('Close menu')).toBeInTheDocument()
  })

  it('opens cart when cart button is clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(
      <>
        <Navbar />
        <CartDrawer />
      </>,
    )

    await user.click(screen.getByLabelText('Cart (0 items)'))
    await waitFor(() => {
      expect(screen.getByRole('dialog', { name: 'Shopping cart' })).toBeInTheDocument()
    })
  })

  it('shows search dropdown when search button is clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Navbar />)

    await user.click(screen.getByLabelText('Search products'))
    expect(screen.getByLabelText('Search products', { selector: 'input' })).toBeInTheDocument()
  })
})
