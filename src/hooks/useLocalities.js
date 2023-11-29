import { useRef, useState,useCallback } from 'react'
import {searchLocalidades} from '../services/localities.js'

export function useLocalities ({select}) {
  

  const [localidades, setLocalidades] = useState(select)
  const previousLocal = useRef(select)
  const getLocalidades = useCallback(async ({ select }) => {


    if ( (select === previousLocal.current)) return
    try {
      previousLocal.current = select
      
      const newLocalidades = searchLocalidades({ select })
     
      setLocalidades(newLocalidades)
    } catch (e) {
        throw new Error('Error searching ')
                   }
    
  }, [])

  return { localidades: localidades, getLocalidades  }
}

