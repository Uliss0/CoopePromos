
import { useCommerce } from '../hooks/useCommerce.js';
import { Commerces } from './ListOfCommerce.jsx';
import { useState, useEffect, useRef, useCallback } from 'react';
import debounce from 'just-debounce-it';

function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar vacío')
      return
    }


    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

function Commerce () {
  const [sort, setSort] = useState(false)

  const { search, updateSearch, error } = useSearch()
  const { commerces, loading, getCommerces } = useCommerce({ search, sort })

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
        <h1>Buscador de Comercios</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }} onChange={handleChange} value={search} name='query' placeholder='Ingrese nombre del comercio'
          />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {
          loading ? <p>Cargando...</p> : <Commerces commerces={commerces} />
        }
      </main>
    </div>
  )
}

export default Commerce
