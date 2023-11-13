import '../App.css'
import './Commerces.css'
import './Commerce.css'
import { useCommerces } from '../hooks/useCommerces.js'
import { Commerces } from './Commerces.jsx'
import { useState, useEffect, useRef, useCallback } from 'react'
import debounce from 'just-debounce-it'



function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)
  
/*
  
  useEffect(() => {
    
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      
      return
    } 

    if (search === '') {
      setError('No se puede buscar  vacía')
      return
    }

  

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])  
*/
  return { search, updateSearch, error }
}

function Commerce () {
  const [sort, setSort] = useState(false)

  const { search, updateSearch, error } = useSearch()
  const { commerces, loading, getCommerces } = useCommerces({ search, sort })
  
  const debouncedGetCommerces = useCallback(
    debounce(search => {
      console.log('search', search)
      getCommerces({ search })
    }, 300)
    , [getCommerces]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getCommerces({ search })
  }
  const handleSelect = (event) => {
    
    getCommerces({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetCommerces(newSearch)
  }

  return (
    <div className='page'>

      <header>
        <h1>Buscador </h1>
        <form className='form' onSubmit={handleSubmit} id='formlist' >
          <input
            className=' bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " >'
            onChange={handleChange} value={search} name='query' placeholder='Buscar' autoComplete="off"
          />
           <div class="flex items-center mb-4">
            <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
             className=' gap-y-4'
            onChange={handleSort} checked={sort}
            />
            <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ordenar</label>
          </div>

          <select name="localidad" id="localidad" onSelect={handleSelect} 
          className='bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
          <option value="localidad">Localidad</option>
          <option value="bahiaBlanca">Bahia Blanca</option>
          <option value="puntaAlta">Punta Alta</option>
          <option value="marDelPlata">Mar Del Plata</option>
          <option value="monteHermoso">Monte Hermoso</option>
        </select>
          <button type='submit' 
          className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg  px-5 py-2.5 text-center 
          '>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main className=''>
        {
          loading ? <p>Cargando...</p> : <Commerces commerces={commerces} />
        }
      
      </main>
    </div>
  )
}

export default Commerce
