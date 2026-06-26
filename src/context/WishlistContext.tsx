import { createContext, useContext, useCallback, type ReactNode } from 'react'
import type { Product } from '@/types'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { STORAGE_KEYS } from '@/constants'
import { useToast } from '@/context/ToastContext'

interface WishlistContextValue {
  items: Product[]
  count: number
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  toggleWishlist: (product: Product) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<Product[]>(STORAGE_KEYS.WISHLIST, [])
  const { showToast } = useToast()

  const addToWishlist = useCallback(
    (product: Product) => {
      setItems((prev) => {
        if (prev.some((p) => p.id === product.id)) return prev
        return [...prev, product]
      })
      showToast(`${product.name} added to wishlist`, 'success')
    },
    [setItems, showToast],
  )

  const removeFromWishlist = useCallback(
    (productId: string) => {
      setItems((prev) => prev.filter((p) => p.id !== productId))
      showToast('Removed from wishlist', 'info')
    },
    [setItems, showToast],
  )

  const toggleWishlist = useCallback(
    (product: Product) => {
      if (items.some((p) => p.id === product.id)) {
        removeFromWishlist(product.id)
      } else {
        addToWishlist(product)
      }
    },
    [items, addToWishlist, removeFromWishlist],
  )

  const isInWishlist = useCallback(
    (productId: string) => items.some((p) => p.id === productId),
    [items],
  )

  const clearWishlist = useCallback(() => {
    setItems([])
    showToast('Wishlist cleared', 'info')
  }, [setItems, showToast])

  return (
    <WishlistContext.Provider
      value={{
        items,
        count: items.length,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist(): WishlistContextValue {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used within WishlistProvider')
  return context
}
