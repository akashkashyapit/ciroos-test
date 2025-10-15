import { Bar, BarChart as RBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts'
import { useMemo } from 'react'
import { useFilters } from '../context/FilterContext.jsx'

export function BarChart({ data }) {
  const { state, dispatch } = useFilters()

  const filteredByRange = useMemo(() => {
    if (state.range === 'All') return data
    const days = state.range === '30d' ? 30 : 7
    return data.slice(-days)
  }, [data, state.range])

  const handleBarClick = (e) => {
    if (!e?.activeLabel) return
    dispatch({ type: 'TOGGLE_DAY', payload: e.activeLabel })
  }

  return (
    <div className="h-64">
      <div className="mb-3 flex items-center gap-2">
        {['7d', '30d', 'All'].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => dispatch({ type: 'SET_RANGE', payload: r })}
            className={`rounded-full border px-3 py-1 text-xs ${state.range === r ? 'bg-brand-50 border-brand-400 text-brand-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            {r}
          </button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <RBarChart data={filteredByRange} onClick={handleBarClick}>
          <defs>
            <linearGradient id="barGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} tickMargin={8} />
          <Tooltip cursor={{ fill: 'rgba(99,102,241,0.08)' }} formatter={(v) => [v, 'Count']} />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {filteredByRange.map((entry) => {
              const isSelected = state.selectedDays.length === 0 || state.selectedDays.includes(entry.date)
              return (
                <Cell key={entry.date} fill="url(#barGradient)" opacity={isSelected ? 1 : 0.25} cursor="pointer" />
              )
            })}
          </Bar>
        </RBarChart>
      </ResponsiveContainer>
    </div>
  )
}

