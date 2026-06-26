import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiHeart, HiOutlineHeart, HiShoppingBag, HiMinus, HiPlus } from 'react-icons/hi2'
import { getProductById, products } from '@/data/products'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useRecentlyViewed } from '@/context/RecentlyViewedContext'
import { Breadcrumb } from '@/components/common/Breadcrumb'
import { SEO } from '@/components/common/Toast'
import { ProductDetailSkeleton } from '@/components/common/LoadingSkeleton'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { LazyImage } from '@/components/ui/LazyImage'
import { StarRating } from '@/components/ui/StarRating'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ProductCard } from '@/components/product/ProductCard'
import {
  formatCurrency,
  calculateDiscountedPrice,
  getCategoryLabel,
  getStockStatus,
  cn,
} from '@/utils'
import { getRelatedProducts } from '@/utils/productUtils'

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { addRecentlyViewed } = useRecentlyViewed()

  const product = id ? getProductById(id) : undefined

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400)
    return () => clearTimeout(timer)
  }, [id])

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product)
    }
  }, [product?.id, addRecentlyViewed, product])

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <ProductDetailSkeleton />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-text">Product not found</h1>
        <Link to="/shop" className="mt-4 inline-block text-secondary hover:underline">
          Back to shop
        </Link>
      </div>
    )
  }

  const finalPrice = calculateDiscountedPrice(product.price, product.discount)
  const stockStatus = getStockStatus(product.stock)
  const wishlisted = isInWishlist(product.id)
  const related = getRelatedProducts(products, product)

  return (
    <>
      <SEO title={product.name} description={product.description.slice(0, 160)} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: 'Shop', to: '/shop' },
            { label: getCategoryLabel(product.category), to: `/shop?category=${product.category}` },
            { label: product.name },
          ]}
          className="mb-8"
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Gallery */}
          <ScrollReveal direction="left">
            <div className="space-y-4">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl overflow-hidden border border-border"
              >
                <LazyImage
                  src={product.images[selectedImage]}
                  alt={`${product.name} - image ${selectedImage + 1}`}
                  className="rounded-2xl"
                  aspectRatio="aspect-square"
                />
              </motion.div>
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={cn(
                        'w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors',
                        selectedImage === i
                          ? 'border-secondary'
                          : 'border-border hover:border-secondary/50',
                      )}
                      aria-label={`View image ${i + 1}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Details */}
          <ScrollReveal direction="right">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                {product.discount > 0 && <Badge variant="discount">-{product.discount}% OFF</Badge>}
                {product.badge && <Badge variant="accent">{product.badge}</Badge>}
              </div>

              <span className="text-sm font-medium uppercase tracking-wider text-text-muted">
                {getCategoryLabel(product.category)}
              </span>

              <h1 className="text-3xl md:text-4xl font-bold text-text">{product.name}</h1>

              <StarRating
                rating={product.rating}
                reviewCount={product.reviewCount}
                showValue
                size="md"
              />

              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-text">{formatCurrency(finalPrice)}</span>
                {product.discount > 0 && (
                  <span className="text-xl text-text-muted line-through">
                    {formatCurrency(product.price)}
                  </span>
                )}
              </div>

              <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>

              <p className="text-text-muted leading-relaxed">{product.description}</p>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-text">Quantity</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border hover:bg-surface transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <HiMinus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border hover:bg-surface transition-colors disabled:opacity-50"
                    aria-label="Increase quantity"
                  >
                    <HiPlus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  size="lg"
                  fullWidth
                  onClick={() => addToCart(product, quantity)}
                  disabled={product.stock <= 0}
                >
                  <HiShoppingBag className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="outline"
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

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-border/50 px-3 py-1 text-xs font-medium text-text-muted capitalize"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Specifications */}
        <ScrollReveal className="mt-16">
          <h2 className="text-2xl font-bold text-text mb-6">Specifications</h2>
          <div className="rounded-2xl border border-border overflow-hidden">
            {Object.entries(product.specifications).map(([key, value], i) => (
              <div
                key={key}
                className={cn(
                  'flex justify-between px-6 py-4 text-sm',
                  i % 2 === 0 ? 'bg-surface' : 'bg-background',
                )}
              >
                <span className="font-medium text-text">{key}</span>
                <span className="text-text-muted">{value}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Reviews */}
        <ScrollReveal className="mt-16">
          <h2 className="text-2xl font-bold text-text mb-6">
            Customer Reviews ({product.reviewCount})
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {product.reviews.map((review) => (
              <div key={review.id} className="rounded-2xl border border-border bg-surface p-6">
                <div className="flex items-center gap-3 mb-3">
                  <img src={review.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-text text-sm">{review.author}</p>
                    <p className="text-xs text-text-muted">{review.date}</p>
                  </div>
                  <StarRating rating={review.rating} className="ml-auto" />
                </div>
                <p className="text-sm text-text-muted">{review.comment}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Related Products */}
        {related.length > 0 && (
          <ScrollReveal className="mt-16 pb-12">
            <h2 className="text-2xl font-bold text-text mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </ScrollReveal>
        )}
      </div>
    </>
  )
}
