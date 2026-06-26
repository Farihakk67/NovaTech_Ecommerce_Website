import { Link } from 'react-router-dom'
import { HiChevronRight, HiHome } from 'react-icons/hi2'
import { cn } from '@/utils'

interface BreadcrumbItem {
  label: string
  to?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1 text-sm', className)}>
      <Link
        to="/"
        className="flex items-center text-text-muted hover:text-secondary transition-colors"
        aria-label="Home"
      >
        <HiHome className="h-4 w-4" />
      </Link>
      {items.map((item, index) => (
        <span key={item.label} className="flex items-center gap-1">
          <HiChevronRight className="h-3.5 w-3.5 text-text-muted" aria-hidden="true" />
          {item.to && index < items.length - 1 ? (
            <Link to={item.to} className="text-text-muted hover:text-secondary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-text" aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  )
}
