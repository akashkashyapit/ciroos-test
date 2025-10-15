import { useEffect, useState } from 'react'

export function SearchInput({ value, onChange, placeholder = 'Search by ID or Title' }) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 pr-9 text-sm outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
      />
      <svg className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
        <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z" clipRule="evenodd" />
      </svg>
    </div>
  )
}

