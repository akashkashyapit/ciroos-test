import { useEffect, useMemo, useState } from 'react'
import { useFilters } from '../context/FilterContext.jsx'
import { CATEGORY_COLORS, STATUS_COLORS } from '../utils/constants.js'
import { SearchInput } from './SearchInput.jsx'

function Pill({ label, type }) {
  const color = type === 'status' ? STATUS_COLORS[label] : CATEGORY_COLORS[label]
  return (
    <span className="pill" style={{ backgroundColor: `${color}22`, color }}>
      <span className="mr-1 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  )
}

export function DataTable({ rows }) {
  const { state, dispatch } = useFilters()
  const [sortBy, setSortBy] = useState('date')
  const [sortDir, setSortDir] = useState('desc')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    let data = [...rows]
    if (state.search) {
      const q = state.search.trim().toLowerCase()
      data = data.filter(r =>
        r.id.toLowerCase() === q || r.title.toLowerCase() === q
      )
    }
    if (state.selectedStatuses.length > 0) {
      data = data.filter(r => state.selectedStatuses.includes(r.status))
    }
    if (state.selectedCategories.length > 0) {
      data = data.filter(r => state.selectedCategories.includes(r.category))
    }
    if (state.selectedDays.length > 0) {
      data = data.filter(r => state.selectedDays.some(d => r.date.includes(d)))
    }
    data.sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1
      if (sortBy === 'amount') return (a.amount - b.amount) * dir
      if (sortBy === 'id') return (a.id.localeCompare(b.id)) * dir
      if (sortBy === 'title') return (a.title.localeCompare(b.title)) * dir
      if (sortBy === 'category') return (a.category.localeCompare(b.category)) * dir
      if (sortBy === 'status') return (a.status.localeCompare(b.status)) * dir
      return (a.date.localeCompare(b.date)) * dir
    })
    return data
  }, [rows, state, sortBy, sortDir])

  function header(label, key) {
    const active = sortBy === key
    const arrow = active ? (sortDir === 'asc' ? '▲' : '▼') : ''
    return (
      <th
        key={key}
        scope="col"
        className="cursor-pointer whitespace-nowrap px-3 py-2 text-left text-xs font-semibold text-slate-600"
        onClick={() => {
          if (active) setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
          else { setSortBy(key); setSortDir('asc') }
        }}
      >
        {label} <span className="ml-1 text-[10px] text-slate-400">{arrow}</span>
      </th>
    )
  }

  return (
    <section className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 p-3">
        <div className="text-sm font-medium text-slate-700 flex items-center gap-2">
          <span className="inline-block h-[20px] w-[4px] rounded-full bg-purple-400"></span>
          Data Items
        </div>
        <div className="flex items-center gap-2">
          <SearchInput value={state.search} onChange={v => dispatch({ type: 'SET_SEARCH', payload: v })} />
        </div>
      </div>
      {loading ? (
        <div className="p-4">
          <div className="h-6 w-40 skeleton mb-3" />
          <div className="h-10 w-full skeleton mb-2" />
          <div className="h-10 w-full skeleton mb-2" />
          <div className="h-10 w-full skeleton" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr>
                {header('ID', 'id')}
                {header('Title', 'title')}
                {header('Category', 'category')}
                {header('Status', 'status')}
                {header('Date', 'date')}
                {header('Amount', 'amount')}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60">
                  <td className="whitespace-nowrap px-3 py-2 text-sm font-medium text-slate-800">{r.id}</td>
                  <td className="px-3 py-2 text-sm text-slate-700">{r.title}</td>
                  <td className="px-3 py-2 text-sm"><Pill label={r.category} type="category" /></td>
                  <td className="px-3 py-2 text-sm"><Pill label={r.status} type="status" /></td>
                  <td className="whitespace-nowrap px-3 py-2 text-sm text-slate-600">{r.date}</td>
                  <td className="whitespace-nowrap px-3 py-2 text-sm tabular-nums text-slate-800">${r.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-6 text-center text-sm text-slate-500">No results. Try adjusting filters.</div>
          )}
        </div>
      )}
    </section>
  )
}

