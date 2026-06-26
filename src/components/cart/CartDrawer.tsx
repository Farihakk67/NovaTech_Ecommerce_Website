import { AnimatePresence, motion } from 'framer-motion'
import { HiXMark, HiMinus, HiPlus, HiTrash } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/Button'
import { LazyImage } from '@/components/ui/LazyImage'
import { formatCurrency, calculateDiscountedPrice } from '@/utils'

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, subtotal, clearCart } =
    useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-surface shadow-card"
            role="dialog"
            aria-label="Shopping cart"
            aria-modal="true"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="text-lg font-bold text-text">Your Cart ({items.length})</h2>
              <button
                onClick={closeCart}
                className="rounded-lg p-2 hover:bg-border/50 transition-colors"
                aria-label="Close cart"
              >
                <HiXMark className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <p className="text-text-muted">Your cart is empty</p>
                  <Link to="/shop" onClick={closeCart}>
                    <Button variant="outline" fullWidth>
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => {
                    const price = calculateDiscountedPrice(
                      item.product.price,
                      item.product.discount,
                    )
                    return (
                      <li
                        key={item.product.id}
                        className="flex gap-4 rounded-xl border border-border p-3"
                      >
                        <LazyImage
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="h-20 w-20 shrink-0 rounded-lg"
                          aspectRatio="aspect-square"
                        />
                        <div className="flex flex-1 flex-col gap-1">
                          <Link
                            to={`/product/${item.product.id}`}
                            onClick={closeCart}
                            className="text-sm font-semibold text-text hover:text-secondary line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm font-bold text-text">{formatCurrency(price)}</p>
                          <div className="flex items-center gap-2 mt-auto">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="flex h-7 w-7 items-center justify-center rounded-lg border border-border hover:bg-border/50"
                              aria-label="Decrease quantity"
                            >
                              <HiMinus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="flex h-7 w-7 items-center justify-center rounded-lg border border-border hover:bg-border/50"
                              aria-label="Increase quantity"
                            >
                              <HiPlus className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="ml-auto text-error hover:text-error/80"
                              aria-label="Remove item"
                            >
                              <HiTrash className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border px-6 py-4 space-y-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <Button fullWidth size="lg">
                  Checkout
                </Button>
                <Button fullWidth variant="ghost" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
