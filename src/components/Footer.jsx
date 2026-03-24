export const Footer = () => {
  return (
    <footer
      id="about"
      className="mt-6 flex gap-3 bg-elnova-purple px-4 py-4 text-xs text-white"
    >
      <div className="w-[36%]">
        <h2 className="font-heading text-2xl font-bold leading-tight">ELNOVA</h2>
      </div>
      <div className="w-px bg-white/30" />
      <div className="flex-1 space-y-2">
        <div>
          <h3 className="font-heading text-sm">About Us:</h3>
          <p>Jersey Store</p>
          <a
            className="underline"
            href="https://www.instagram.com/elnova_co?igsh=MWZyb2M1ZGx2Y3dncA=="
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <p>© ELNOVA 2026</p>
        </div>

        <div>
          <h3 className="font-heading text-sm">Location:</h3>
          <p>Near old jail road, seven wells, old Washermanpet, Chennai - 01</p>
        </div>

        <div>
          <h3 className="font-heading text-sm">Contact:</h3>
          <p>Email: elnovafit07@gmail.com</p>
          <p>WhatsApp: 9626291742</p>
        </div>
      </div>
    </footer>
  )
}
