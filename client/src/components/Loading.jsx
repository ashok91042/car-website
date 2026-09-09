export function CardSkeleton() {
  return (
    <div className="card-brutal overflow-hidden">
      <div className="aspect-[4/3] animate-pulse bg-smoke" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-1/3 animate-pulse bg-smoke" />
        <div className="h-6 w-2/3 animate-pulse bg-smoke" />
        <div className="h-4 w-full animate-pulse bg-smoke" />
        <div className="flex justify-between pt-2">
          <div className="h-6 w-24 animate-pulse bg-smoke" />
          <div className="h-4 w-16 animate-pulse bg-smoke" />
        </div>
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="container-site flex min-h-[50vh] items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-ink border-t-transparent" />
    </div>
  );
}
