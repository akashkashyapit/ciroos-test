import { ChartCard } from '../components/ChartCard.jsx'
import { DonutChart } from '../components/DonutChart.jsx'
import { BarChart } from '../components/BarChart.jsx'
import { DataTable } from '../components/DataTable.jsx'
import { categoryData, itemsByDay, statusData, tableData } from '../data/mockData.js'
import { Legend } from '../components/Legend.jsx'

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ChartCard
          title="Status Distribution"
          subtitle="Click to filter"
        >
          <DonutChart data={statusData} type="status" />
          <div className="mt-4 lg:hidden"><Legend data={statusData} type="status" total={statusData.reduce((s,d)=>s+d.value,0)} /></div>
        </ChartCard>
        <ChartCard title="Category Distribution" subtitle="Click to filter">
          <DonutChart data={categoryData} type="category" />
        </ChartCard>
        <ChartCard title="Items by Day" subtitle="Select bars to filter">
          <BarChart data={itemsByDay} />
        </ChartCard>
      </div>
      <DataTable rows={tableData} />
    </div>
  )
}

