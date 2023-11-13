import { useRef, useState, useMemo, useCallback } from 'react'
import { searchCommerces } from '../services/commerces.js'

export function useCommerces ({ search, sort }) {
  const [commerces, setCommerces] = useState([])
  const [loading, setLoading] = useState(false)
  // el error no se usa pero puedes implementarlo
  // si quieres:
  const [, setError] = useState(null)
  const previousSearch = useRef(search)

  const getCommerces = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return
    // search es ''

    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const newCommerces = await searchCommerces({ search })
     
      setCommerces(newCommerces)
    } catch (e) {
      setError(e.message)
    } finally {
      // tanto en el try como en el catch
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
