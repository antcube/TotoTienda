interface ProductsSkeletonProps {
  title?: string;
  count?: number;
  showHeader?: boolean;
}

export default function ProductsSkeleton({
  title = "Cargando productos",
  count = 12,
  showHeader = true,
}: ProductsSkeletonProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="text-center mb-12">
            <div className="h-8 w-64 bg-gray-200 rounded-full mx-auto animate-pulse" />
            <div className="h-4 w-80 bg-gray-200 rounded-full mx-auto mt-4 animate-pulse" />
            <p className="sr-only">{title}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
            >
              <div className="aspect-square bg-gray-200 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-3 w-24 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-4 w-40 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-6 w-28 bg-gray-200 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
