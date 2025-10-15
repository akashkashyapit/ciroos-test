export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-200/70 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-pink-400 via-fuchsia-500 to-violet-500 text-white shadow">
              {/* logo icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M4 16h4v4H4v-4Zm0-6h4v4H4v-4ZM4 4h4v4H4V4Zm6 0h10v4H10V4Zm0 6h10v4H10v-4Zm0 6h10v4H10v-4Z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight text-slate-900">Interactive Dashboard</div>
              <div className="hidden text-xs text-slate-600 sm:block">
                Click chart segments or bars to filter the data table. Multiple selections within the same chart use OR logic; selections across different charts use AND logic.
              </div>
            </div>
          </div>
          <div className="text-[11px] sm:hidden max-w-[220px] text-right text-slate-600">
            Click chart segments or bars to filter. OR within, AND across.
          </div>
        </div>
      </div>
    </nav>
  )
}

