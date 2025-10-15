import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from 'recharts'
import { useFilters } from '../context/FilterContext.jsx'

export function DonutChart({ data, type }) {
  const { state, dispatch } = useFilters()
  const selected = type === 'status' ? state.selectedStatuses : state.selectedCategories
  const toggleType = type === 'status' ? 'TOGGLE_STATUS' : 'TOGGLE_CATEGORY'

  const total = data.reduce((sum, d) => sum + d.value, 0)
  const centerLabel = selected.length > 0 ? `${selected.length} selected` : `${total}`

  return (
    <div className="h-[360px]">
      <ResponsiveContainer width="100%" height="70%">
        <PieChart>
          <defs>
            {data.map((d, i) => (
              <linearGradient id={`grad-${type}-${i}`} x1="0" x2="0" y1="0" y2="1" key={i}>
                <stop offset="0%" stopColor={d.color} stopOpacity="0.85" />
                <stop offset="100%" stopColor={d.color} stopOpacity="0.55" />
              </linearGradient>
            ))}
          </defs>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={52}
            outerRadius={80}
            paddingAngle={2}
            stroke="#fff"
            strokeWidth={1}
            isAnimationActive
            onClick={(e) => {
              if (!e?.name) return
              dispatch({ type: toggleType, payload: e.name })
            }}
          >
            {data.map((entry, i) => {
              const isSelected = selected.length === 0 || selected.includes(entry.name)
              return (
                <Cell
                  key={`cell-${i}`}
                  fill={`url(#grad-${type}-${i})`}
                  opacity={isSelected ? 1 : 0.25}
                  cursor="pointer"
                />
              )
            })}
          </Pie>
          <Tooltip cursor={{ fill: 'transparent' }} formatter={(v, n) => [v, n]} className="bg-brand-50 border-r border-b border-l border-slate-200 rounded-lg p-2" />
        </PieChart>
      </ResponsiveContainer>
      {/* <div className="pointer-events-none -mt-40 flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold text-slate-800">{centerLabel}</div>
          <div className="text-xs text-slate-500">Total</div>
        </div>
      </div> */}
      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
        {data.map((d) => {
          const pct = total ? Math.round((d.value / total) * 1000) / 10 : 0
          const active = selected.length === 0 || selected.includes(d.name)
          return (
            <button
              key={d.name}
              type="button"
              onClick={() => dispatch({ type: toggleType, payload: d.name })}
              className={`flex items-center gap-2 rounded-md px-2 py-1 text-left transition ${active ? 'bg-white hover:bg-slate-50' : 'opacity-60'}`}
            >
              <span className="h-5 w-5 rounded-full" style={{ backgroundColor: d.color }} />
              <span className="truncate">{d.name}</span>
             
              <span className="ml-auto flex items-center gap-2 tabular-nums text-slate-500">
                <span>{d.value}</span>
                <span className="text-[10px]">({pct}%)</span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

