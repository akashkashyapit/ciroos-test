import { useFilters } from '../context/FilterContext.jsx'
import { STATUS_COLORS, CATEGORY_COLORS } from '../utils/constants.js'

export function FilterChips() {
  const { state, dispatch } = useFilters()
  const hasAny =
    state.selectedStatuses.length > 0 ||
    state.selectedCategories.length > 0 ||
    state.selectedDays.length > 0 ||
    Boolean(state.search)

  if (!hasAny) return null

  function Chip({ label, color, onClick, children }) {
    return (
      <span className="inline-flex items-center rounded-full bg-white border border-slate-200 px-3 py-1 mr-2 mb-2 text-xs font-semibold shadow-sm transition hover:bg-slate-50" style={color ? { color, borderColor: color + '44' } : {}}>
        {children}
        <span>{label}</span>
        <button onClick={onClick} className="ml-2 text-slate-400 hover:text-slate-700 focus:outline-none" tabIndex={0} aria-label='Remove filter'>
          &times;
        </button>
      </span>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-y-2 pb-2 px-0 overflow-x-auto">
      {state.selectedStatuses.map((s) => (
        <Chip key={'st-' + s} label={s} color={STATUS_COLORS[s]} onClick={() => dispatch({ type: 'TOGGLE_STATUS', payload: s })}>
          <span className="mr-2 h-2 w-2 rounded-full inline-block" style={{ backgroundColor: STATUS_COLORS[s] }} />
        </Chip>
      ))}
      {state.selectedCategories.map((c) => (
        <Chip key={'cat-' + c} label={c} color={CATEGORY_COLORS[c]} onClick={() => dispatch({ type: 'TOGGLE_CATEGORY', payload: c })}>
          <span className="mr-2 h-2 w-2 rounded-full inline-block" style={{ backgroundColor: CATEGORY_COLORS[c] }} />
        </Chip>
      ))}
      {state.selectedDays.map((d) => (
        <Chip key={'day-' + d} label={d} color="#818CF8" onClick={() => dispatch({ type: 'TOGGLE_DAY', payload: d })} />
      ))}
      {state.search && (
        <Chip key={'search'} label={state.search} onClick={() => dispatch({ type: 'SET_SEARCH', payload: '' })}>
          <svg className="mr-2 h-3 w-3 text-slate-500 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" x2="16.65" y1="21" y2="16.65"></line></svg>
        </Chip>
      )}
    </div>
  )
}
