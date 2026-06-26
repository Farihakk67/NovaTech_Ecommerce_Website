import { AnimatePresence, motion } from 'framer-motion'
import { HiXMark, HiHeart, HiOutlineHeart, HiShoppingBag } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import type { Product } from '@/types'
import { LazyImage } from '@/components/ui/LazyImage'
import { StarRating } from '@/components/ui/StarRating'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { formatCurrency, calculateDiscountedPrice, getCategoryLabel } from '@/utils'

interface QuickViewModalProps {
  product: Product | null
  onClose: () => void
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()

  if (!product) return null

  const finalPrice = calculateDiscountedPrice(product.price, product.discount)
  const wishlisted = isInWishlist(product.id)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Quick view: ${product.name}`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl rounded-2xl bg-surface shadow-card overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full glass"
            aria-label="Close quick view"
          >
            <HiXMark className="h-5 w-5" />
          </button>

          <div className="grid md:grid-cols-2">
            <LazyImage
              src={product.images[0]}
              alt={product.name}
              className="h-full min-h-[300px]"
              aspectRatio="aspect-square md:aspect-auto"
            />
            <div className="p-6 md:p-8 flex flex-col gap-4">
              <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
                {getCategoryLabel(product.category)}
              </span>
              <h2 className="text-2xl font-bold text-text">{product.name}</h2>
              <StarRating rating={product.rating} reviewCount={product.reviewCount} showValue />
              <p className="text-sm text-text-muted line-clamp-3">{product.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-text">{formatCurrency(finalPrice)}</span>
                {product.discount > 0 && (
                  <>
                    <span className="text-lg text-text-muted line-through">
                      {formatCurrency(product.price)}
                    </span>
                    <Badge variant="discount">-{product.discount}%</Badge>
                  </>
                )}
              </div>
              <div className="flex gap-3 mt-auto">
                <Button
                  fullWidth
                  onClick={() => {
                    addToCart(product)
                    onClose()
                  }}
                  disabled={product.stock <= 0}
                >
                  <HiShoppingBag className="h-4 w-4" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => toggleWishlist(product)}
                  aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  {wishlisted ? (
                    <HiHeart className="h-5 w-5 text-error" />
                  ) : (
                    <HiOutlineHeart className="h-5 w-5" />
                  )}
                </Button>
              </div>
              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="text-sm text-secondary hover:underline text-center"
              >
                View full details →
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
