import { HiStar } from 'react-icons/hi2'
import { cn } from '@/utils'

interface StarRatingProps {
  rating: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  reviewCount?: number
  className?: string
}

const sizes = {
  sm: 'text-sm gap-0.5',
  md: 'text-base gap-0.5',
  lg: 'text-lg gap-1',
}

export function StarRating({
  rating,
  max = 5,
  size = 'sm',
  showValue = false,
  reviewCount,
  className,
}: StarRatingProps) {
  return (
    <div
      className={cn('inline-flex items-center', sizes[size], className)}
      aria-label={`Rating: ${rating} out of ${max} stars`}
    >
      {Array.from({ length: max }, (_, i) => {
        const filled = i < Math.floor(rating)
        const partial = i === Math.floor(rating) && rating % 1 >= 0.3

        return (
          <HiStar
            key={i}
            className={cn(
              filled || partial ? 'text-warning' : 'text-border',
              partial && 'opacity-60',
            )}
            aria-hidden="true"
          />
        )
      })}
      {showValue && (
        <span className="ml-1.5 text-sm font-medium text-text">
          {rating.toFixed(1)}
          {reviewCount !== undefined && (
            <span className="ml-1 font-normal text-text-muted">({reviewCount})</span>
          )}
        </span>
      )}
    </div>
  )
}
