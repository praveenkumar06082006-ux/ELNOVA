
export const Footer = () => {
  return (
    <footer id="about" className="mt-8 flex flex-col gap-6 bg-[#22103a] px-6 py-8 text-white/80 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col items-center text-center space-y-2">
        <h2 className="font-heading text-3xl font-bold tracking-wider text-white">ELNOVA</h2>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-elnova-yellow">Wear the energy within</p>
      </div>
      
      <div className="h-px w-full bg-white/10" />
      
      <div className="grid grid-cols-2 gap-6 text-sm">
        <div className="space-y-3">
          <h3 className="font-heading text-base text-white">About Us</h3>
          <p>Sports And Clothing Store</p>
          <a
            href="https://www.instagram.com/elnova_co?igsh=MWZyb2M1ZGx2Y3dncA=="
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 font-medium text-white hover:bg-white/20 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
            <span>Follow Us</span>
          </a>
        </div>
        
        <div className="space-y-3 leading-relaxed">
          <h3 className="font-heading text-base text-white">Contact & Location</h3>
          <p>Near old jail road, seven wells, old Washermanpet, Chennai - 01</p>
          <div className="pt-1 space-y-1">
             <p>Email: elnovafit07@gmail.com</p>
             <p>WhatsApp: 9626291742</p>
          </div>
        </div>
      </div>
      
      <div className="mt-2 text-center text-xs opacity-50">
        <p>© ELNOVA 2026. All rights reserved.</p>
      </div>
    </footer>
  )
}
