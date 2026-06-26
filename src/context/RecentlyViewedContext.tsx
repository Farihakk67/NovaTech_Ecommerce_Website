/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useCallback, type ReactNode } from 'react'
import type { Product } from '@/types'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { STORAGE_KEYS } from '@/constants'

interface RecentlyViewedContextValue {
  items: Product[]
  addRecentlyViewed: (product: Product) => void
  clearRecentlyViewed: () => void
}

const MAX_ITEMS = 8

const RecentlyViewedContext = createContext<RecentlyViewedContextValue | null>(null)

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<Product[]>(STORAGE_KEYS.RECENTLY_VIEWED, [])

  const addRecentlyViewed = useCallback(
    (product: Product) => {
      setItems((prev) => {
        const filtered = prev.filter((p) => p.id !== product.id)
        return [product, ...filtered].slice(0, MAX_ITEMS)
      })
    },
    [setItems],
  )

  const clearRecentlyViewed = useCallback(() => {
    setItems([])
  }, [setItems])

  return (
    <RecentlyViewedContext.Provider value={{ items, addRecentlyViewed, clearRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  )
}

export function useRecentlyViewed(): RecentlyViewedContextValue {
  const context = useContext(RecentlyViewedContext)
  if (!context) throw new Error('useRecentlyViewed must be used within RecentlyViewedProvider')
  return context
}
