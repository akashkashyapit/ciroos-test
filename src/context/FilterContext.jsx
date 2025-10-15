import { createContext, useContext, useMemo, useReducer, useEffect } from 'react'
import { STORAGE_KEYS } from '../utils/constants.js'
import { getFromStorage, saveToStorage } from '../utils/localStorageUtils.js'

const initialState = {
  selectedStatuses: [],
  selectedCategories: [],
  selectedDays: [],
  range: '7d',
  search: '',
}

const FilterContext = createContext()

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return { ...state, ...action.payload }
    case 'TOGGLE_STATUS': {
      const exists = state.selectedStatuses.includes(action.payload)
      const selectedStatuses = exists
        ? state.selectedStatuses.filter(s => s !== action.payload)
        : [...state.selectedStatuses, action.payload]
      return { ...state, selectedStatuses }
    }
    case 'TOGGLE_CATEGORY': {
      const exists = state.selectedCategories.includes(action.payload)
      const selectedCategories = exists
        ? state.selectedCategories.filter(s => s !== action.payload)
        : [...state.selectedCategories, action.payload]
      return { ...state, selectedCategories }
    }
    case 'TOGGLE_DAY': {
      const exists = state.selectedDays.includes(action.payload)
      const selectedDays = exists
        ? state.selectedDays.filter(s => s !== action.payload)
        : [...state.selectedDays, action.payload]
      return { ...state, selectedDays }
    }
    case 'SET_RANGE':
      return { ...state, range: action.payload, selectedDays: [] }
    case 'SET_SEARCH':
      return { ...state, search: action.payload }
    case 'CLEAR_ALL':
      return { ...initialState }
    default:
      return state
  }
}

export function FilterProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const stored = getFromStorage(STORAGE_KEYS.filters, null)
    if (stored) {
      dispatch({ type: 'INIT', payload: stored })
    }
  }, [])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.filters, state)
  }, [state])

  const value = useMemo(() => ({ state, dispatch }), [state])

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  )
}

export function useFilters() {
  const ctx = useContext(FilterContext)
  if (!ctx) throw new Error('useFilters must be used within FilterProvider')
  return ctx
}

