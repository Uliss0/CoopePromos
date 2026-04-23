import { useState, useMemo, useCallback } from 'react'
import { searchCommerces } from '../services/commercesService.js'

export function useCommerces ({ sort }) {
  const [commerces, setCommerces] = useState([])
  const [loading, setLoading] = useState(false)
  const [, setError] = useState(null)

  const getCommerces = useCallback(async ({ search, select,selectR,filtrar10,filtrar15,filtrar20 }) => {
    try {
      setLoading(true)
      setError(null)

      const newCommerces = await searchCommerces({ search, select, selectR,filtrar10,filtrar15,filtrar20 })
      setCommerces(newCommerces)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])



   const sortedCommerces = useMemo(() => {
    return sort
      ? [...commerces].sort((a, b) => a.nomComercio.localeCompare(b.nomComercio))
      : commerces
  }, [sort, commerces])

  return { commerces: sortedCommerces, getCommerces, loading } 

  
}
