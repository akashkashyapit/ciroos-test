import { useFilters } from '../context/FilterContext.jsx'

export function Legend({ data, type, total }) {
  const { state, dispatch } = useFilters()
  const selected = type === 'status' ? state.selectedStatuses : state.selectedCategories
  const toggleType = type === 'status' ? 'TOGGLE_STATUS' : 'TOGGLE_CATEGORY'

  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
      {data.map((d) => {
        const pct = total ? Math.round((d.value / total) * 1000) / 10 : 0
        const active = selected.length === 0 || selected.includes(d.name)
        return (
          <button
            key={d.name}
            type="button"
            onClick={() => dispatch({ type: toggleType, payload: d.name })}
            className={`flex items-center gap-2 rounded px-2 py-1 text-xs ${active ? 'hover:bg-slate-50' : 'opacity-60'}`}
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
            <span className="truncate">{d.name}</span>
            <span className="ml-auto tabular-nums text-slate-500">{d.value} <span className="text-[10px]">({pct}%)</span></span>
          </button>
        )
      })}
    </div>
  )
}

