export const ProductCardSkeleton = ({ compact = false }) => {
  return (
    <article
      className={`animate-pulse flex flex-col rounded-[20px] bg-[#3a1d60] p-3 shadow-lg ring-1 ring-white/10 ${
        compact ? 'min-w-[200px] max-w-[200px]' : 'w-full'
      }`}
    >
      <div className={`w-full rounded-[14px] bg-white/10 ${compact ? 'h-[200px]' : 'h-64'}`} />
      <div className="flex flex-col flex-1 justify-end space-y-2 pt-3">
        <div className="h-5 w-2/3 rounded bg-white/10" />
        <div className="h-4 w-1/3 rounded bg-white/10" />
      </div>
    </article>
  )
}
