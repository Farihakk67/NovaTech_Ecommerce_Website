import { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiHeart, HiOutlineHeart, HiEye, HiShoppingBag } from 'react-icons/hi2'
import type { Product } from '@/types'
import { LazyImage } from '@/components/ui/LazyImage'
import { StarRating } from '@/components/ui/StarRating'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { formatCurrency, calculateDiscountedPrice, getCategoryLabel, cn } from '@/utils'

interface ProductCardProps {
  product: Product
  onQuickView?: (product: Product) => void
  index?: number
}

export const ProductCard = memo(function ProductCard({
  product,
  onQuickView,
  index = 0,
}: ProductCardProps) {
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const wishlisted = isInWishlist(product.id)
  const finalPrice = calculateDiscountedPrice(product.price, product.discount)

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group relative flex flex-col rounded-2xl border border-border bg-surface overflow-hidden shadow-soft hover:shadow-card transition-shadow duration-300"
    >
      <div className="relative">
        <Link to={`/product/${product.id}`} aria-label={`View ${product.name}`}>
          <LazyImage src={product.images[0]} alt={product.name} className="rounded-t-2xl" />
        </Link>

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.discount > 0 && <Badge variant="discount">-{product.discount}%</Badge>}
          {product.badge && (
            <Badge variant={product.badge === 'new' ? 'accent' : 'default'}>{product.badge}</Badge>
          )}
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => toggleWishlist(product)}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-full glass shadow-soft transition-colors',
              wishlisted ? 'text-error' : 'text-text hover:text-error',
            )}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {wishlisted ? <HiHeart className="h-4 w-4" /> : <HiOutlineHeart className="h-4 w-4" />}
          </button>
          {onQuickView && (
            <button
              onClick={() => onQuickView(product)}
              className="flex h-9 w-9 items-center justify-center rounded-full glass shadow-soft text-text hover:text-secondary transition-colors"
              aria-label="Quick view"
            >
              <HiEye className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 gap-2">
        <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
          {getCategoryLabel(product.category)}
        </span>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-text line-clamp-2 hover:text-secondary transition-colors">
            {product.name}
          </h3>
        </Link>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} showValue />
        <div className="mt-auto flex items-center gap-2 pt-2">
          <span className="text-lg font-bold text-text">{formatCurrency(finalPrice)}</span>
          {product.discount > 0 && (
            <span className="text-sm text-text-muted line-through">
              {formatCurrency(product.price)}
            </span>
          )}
        </div>
        <Button
          size="sm"
          fullWidth
          onClick={() => addToCart(product)}
          disabled={product.stock <= 0}
          className="mt-2"
        >
          <HiShoppingBag className="h-4 w-4" />
          {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </motion.article>
  )
})
