import { describe, it, expect, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/test/test-utils'
import { useTheme } from '@/context/ThemeContext'

function ThemeTestHarness() {
  const { theme, isDark, toggleTheme } = useTheme()

  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="is-dark">{isDark ? 'true' : 'false'}</span>
      <button onClick={toggleTheme} aria-label="Toggle theme">
        Toggle Theme
      </button>
    </div>
  )
}

describe('Dark Mode Toggle', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark')
  })

  it('defaults to light theme', () => {
    renderWithProviders(<ThemeTestHarness />)
    expect(screen.getByTestId('theme')).toHaveTextContent('light')
    expect(screen.getByTestId('is-dark')).toHaveTextContent('false')
  })

  it('toggles to dark theme when clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ThemeTestHarness />)

    await user.click(screen.getByLabelText('Toggle theme'))
    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
    expect(screen.getByTestId('is-dark')).toHaveTextContent('true')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('toggles back to light theme', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ThemeTestHarness />)

    await user.click(screen.getByLabelText('Toggle theme'))
    await user.click(screen.getByLabelText('Toggle theme'))
    expect(screen.getByTestId('theme')).toHaveTextContent('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('persists theme preference to localStorage', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ThemeTestHarness />)

    await user.click(screen.getByLabelText('Toggle theme'))
    expect(localStorage.getItem('novatech_theme')).toBe('"dark"')
  })

  it('navbar dark mode button toggles theme', async () => {
    const user = userEvent.setup()
    const { Navbar } = await import('@/components/layout/Navbar')
    renderWithProviders(<Navbar />)

    await user.click(screen.getByLabelText('Switch to dark mode'))
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('novatech_theme')).toBe('"dark"')
  })
})
