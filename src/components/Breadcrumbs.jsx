export function Breadcrumbs({ items = [{ label: 'Home' }, { label: 'Dashboard', current: true }] }) {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-600">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <span className={item.current ? 'font-medium text-slate-900' : ''}>{item.label}</span>
          {idx < items.length - 1 && (
            <svg className="h-3.5 w-3.5 text-slate-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707A1 1 0 118.707 5.293l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      ))}
    </div>
  )
}

