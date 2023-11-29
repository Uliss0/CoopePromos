import { useRef, useState, useMemo, useCallback } from 'react'
import { searchCommerces } from '../services/commerces.js'

export function useCommerces ({ search,select, sort }) {
  
  const [commerces, setCommerces] = useState([])
  const [loading, setLoading] = useState(false)
  // el error no se usa pero puedes implementarlo
  // si quieres:
  const [, setError] = useState(null)
  const previousSearch = useRef(search)
  const previousLocal = useRef(select)

  const getCommerces = useCallback(async ({ search, select }) => {
    /////console.log("search usecommerces2", search, "select:", select)
    if ((search === previousSearch.current) && (select === previousLocal.current)) return
    // search es ''
    
    try {
      

      setLoading(true)
      setError(null)
      previousSearch.current = search
      previousLocal.current = select

      
      const newCommerces = await searchCommerces({ search, select })
     // console.log("newcomerces, hook:",newCommerces)
     
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
