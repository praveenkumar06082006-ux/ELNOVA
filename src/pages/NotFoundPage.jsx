export const NotFoundPage = () => {
  return (
    <section className="flex w-full flex-col items-center justify-center px-4 pb-8 min-h-[70vh]">
      <div className="flex flex-col items-center justify-center p-8 text-center bg-[#3a1d60] rounded-3xl ring-1 ring-white/10 shadow-lg max-w-md">
        <div className="mb-4">
          <div className="w-16 h-16 rounded-full bg-elnova-yellow/20 flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-elnova-yellow">404</span>
          </div>
        </div>
        
        <h1 className="font-heading text-2xl text-white mb-4">Page Not Found</h1>
        <p className="text-white/80 mb-6">The page you're looking for doesn't exist.</p>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={() => window.location.href = '/'}
            className="w-full rounded-xl bg-elnova-yellow py-3 text-center text-sm font-bold uppercase tracking-wide text-black shadow-md transition-transform hover:scale-105 active:scale-95"
          >
            Go to Homepage
          </button>
          
          <button
            onClick={() => window.history.back()}
            className="w-full rounded-xl border border-white/20 bg-white/10 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white shadow-md transition-transform hover:bg-white/20 active:scale-95"
          >
            Go Back
          </button>
        </div>
      </div>
    </section>
  )
}
