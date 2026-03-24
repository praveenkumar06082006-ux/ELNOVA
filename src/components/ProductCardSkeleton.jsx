export const ProductCardSkeleton = ({ compact = false }) => {
  return (
    <article
      className={`animate-pulse rounded-3xl bg-white p-3 shadow-md ring-1 ring-black/5 ${
        compact ? 'min-w-[244px]' : ''
      }`}
    >
      <div className="h-40 w-full rounded-2xl bg-gray-200" />
      <div className="space-y-2 pt-3">
        <div className="h-5 w-2/3 rounded bg-gray-200" />
        <div className="h-4 w-1/3 rounded bg-gray-200" />
        <div className="h-3 w-1/4 rounded bg-gray-200" />
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="h-9 rounded-xl bg-gray-200" />
          <div className="h-9 rounded-xl bg-gray-200" />
          <div className="col-span-2 h-9 rounded-xl bg-gray-200" />
          <div className="col-span-2 h-9 rounded-xl bg-gray-200" />
        </div>
        <div className="h-9 rounded-full bg-gray-200" />
      </div>
    </article>
  )
}
