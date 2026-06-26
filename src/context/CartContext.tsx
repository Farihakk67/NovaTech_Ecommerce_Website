import { createContext, useContext, useCallback, useMemo, type ReactNode } from 'react'
import type { Product, CartItem } from '@/types'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { STORAGE_KEYS } from '@/constants'
import { calculateDiscountedPrice } from '@/utils'
import { useToast } from '@/context/ToastContext'

interface CartContextValue {
  items: CartItem[]
  itemCount: number
  subtotal: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  isInCart: (productId: string) => boolean
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>(STORAGE_KEYS.CART, [])
  const [isOpen, setIsOpen] = useLocalStorage<boolean>('novatech_cart_open', false)
  const { showToast } = useToast()

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum + calculateDiscountedPrice(item.product.price, item.product.discount) * item.quantity,
        0,
      ),
    [items],
  )

  const addToCart = useCallback(
    (product: Product, quantity = 1) => {
      if (product.stock <= 0) {
        showToast('This product is out of stock', 'error')
        return
      }

      setItems((prev) => {
        const existing = prev.find((item) => item.product.id === product.id)
        if (existing) {
          const newQty = Math.min(existing.quantity + quantity, product.stock)
          return prev.map((item) =>
            item.product.id === product.id ? { ...item, quantity: newQty } : item,
          )
        }
        return [...prev, { product, quantity: Math.min(quantity, product.stock) }]
      })

      showToast(`${product.name} added to cart`, 'success')
    },
    [setItems, showToast],
  )

  const removeFromCart = useCallback(
    (productId: string) => {
      setItems((prev) => prev.filter((item) => item.product.id !== productId))
      showToast('Item removed from cart', 'info')
    },
    [setItems, showToast],
  )

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId)
        return
      }
      setItems((prev) =>
        prev.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.min(quantity, item.product.stock) }
            : item,
        ),
      )
    },
    [setItems, removeFromCart],
  )

  const clearCart = useCallback(() => {
    setItems([])
    showToast('Cart cleared', 'info')
  }, [setItems, showToast])

  const isInCart = useCallback(
    (productId: string) => items.some((item) => item.product.id === productId),
    [items],
  )

  const value: CartContextValue = {
    items,
    itemCount,
    subtotal,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    toggleCart: () => setIsOpen((prev) => !prev),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
