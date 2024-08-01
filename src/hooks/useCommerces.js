import { useRef, useState, useMemo, useCallback } from 'react'
import { searchCommerces } from '../services/commercesService.js'

export function useCommerces ({ search,select,selectR, sort,filtrar10,filtrar15,filtrar20 }) {
  
  const [commerces, setCommerces] = useState([])
  const [loading, setLoading] = useState(false)
  // el error no se usa pero puedes implementarlo
  // si quieres:
  const [, setError] = useState(null)
  const previousSearch = useRef(search)
  const previousLocal = useRef(select)
  const previousLocalR = useRef(selectR)

  const getCommerces = useCallback(async ({ search, select,selectR,filtrar10,filtrar15,filtrar20 }) => {
    /////console.log("search usecommerces2", search, "select:", select)
    //if ((search === previousSearch.current) && (select === previousLocal.current) && (selectR === previousLocalR.current)) return
    // search es ''
    
    try {
      

      setLoading(true)
      setError(null)
      previousSearch.current = search
      previousLocal.current = select
      previousLocalR.current = selectR

      
      const newCommerces = await searchCommerces({ search, select, selectR,filtrar10,filtrar15,filtrar20 })
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
