import { useRef, useState, useMemo, useCallback } from 'react'

import comercios from '../mock.json'

export function useCommerce ({ search, sort }) {
  const [commerces, setCommerce] = useState([])
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
      const newCommerce = comercios
      setCommerce(newCommerce)
    } catch (e) {
      setError(e.message)
    } finally {
      // tanto en el try como en el catch
      setLoading(false)
    }
  }, [])

  const sortedCommerces = useMemo(() => {
    return sort
      ? [...commerces].sort((a, b) => a.NomComercio.localeCompare(b.NomComercio))
      : commerces
  }, [sort, commerces])

  return { commerces: sortedCommerces, getCommerces, loading }
}
