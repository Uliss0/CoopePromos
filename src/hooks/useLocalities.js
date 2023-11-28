import { useRef, useState,useCallback } from 'react'
import {searchLocalidades} from '../services/localities.js'

export function useLocalities ({select}) {
  
  const [localidades, setLocalidades] = useState([])
  const previousLocal = useRef(select)
  const getLocalidades = useCallback(async ({ select }) => {

    try {
      previousLocal.current = select
      
      const newLocalidades = searchLocalidades({  select })
     
     setLocalidades(newLocalidades)
    } catch (e) {
        throw new Error('Error searching ')
                   }
    
  }, [])

  return { localidades: localidades, getLocalidades  }
}


