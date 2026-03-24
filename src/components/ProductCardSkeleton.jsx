export const ProductCardSkeleton = ({ layout = 'list' }) => {
  const layoutClasses = 
    layout === 'scroll' ? 'min-w-[180px] max-w-[180px]' : 
    layout === 'grid' ? 'w-full' : 'w-full'
    
  const imgHeight = layout === 'list' ? 'h-64' : 'h-[180px]'

  return (
    <article
      className={`animate-pulse flex flex-col rounded-[20px] bg-[#3a1d60] p-3 shadow-lg ring-1 ring-white/10 ${layoutClasses}`}
    >
      <div className={`w-full rounded-[14px] bg-white/10 ${imgHeight}`} />
      <div className="flex flex-col flex-1 justify-end space-y-2 pt-3">
        <div className="h-5 w-2/3 rounded bg-white/10" />
        <div className="h-4 w-1/3 rounded bg-white/10" />
      </div>
    </article>
  )
}
