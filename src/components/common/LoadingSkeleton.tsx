export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 animate-pulse">
      <div className="aspect-square rounded-xl bg-border/50 mb-4" />
      <div className="h-4 w-3/4 rounded bg-border/50 mb-2" />
      <div className="h-3 w-1/2 rounded bg-border/50 mb-3" />
      <div className="h-5 w-1/3 rounded bg-border/50 mb-4" />
      <div className="h-10 w-full rounded-xl bg-border/50" />
    </div>
  )
}

export function ProductGridSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="aspect-square rounded-2xl bg-border/50" />
        <div className="space-y-4">
          <div className="h-4 w-1/4 rounded bg-border/50" />
          <div className="h-8 w-3/4 rounded bg-border/50" />
          <div className="h-6 w-1/3 rounded bg-border/50" />
          <div className="h-20 w-full rounded bg-border/50" />
          <div className="h-12 w-full rounded-xl bg-border/50" />
        </div>
      </div>
    </div>
  )
}
