import { Dashboard } from './pages/Dashboard.jsx'
import { FilterProvider } from './context/FilterContext.jsx'
import { Navbar } from './components/Navbar.jsx'
import { FilterChips } from './components/FilterChips.jsx'

export default function App() {
  return (
    <FilterProvider>
      <div className="min-h-screen bg-slate-50 text-slate-800">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <FilterChips />
          <div className="mt-4">
            <Dashboard />
          </div>
        </div>
      </div>
    </FilterProvider>
  )
}

