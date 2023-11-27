import '../App.css'

import './Commerce.css'
import { useCommerces } from '../hooks/useCommerces.js'
import { Commerces } from './Commerces.jsx'
import { useState,  useCallback } from 'react'
import debounce from 'just-debounce-it'
import { useCheckbox } from '../context/CheckContext.js';
import Footer from './Footer.jsx';


function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  //const isFirstInput = useRef(true)

  
  
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

function useSelect () {
  const [select, updateSelect] = useState('')
  return {select, updateSelect}
}

function Commerce () {
  //const [sort, setSort] = useState(false)

  const { search, updateSearch, error } = useSearch()
  
  const { select,  updateSelect } = useSelect()  
  const { commerces, loading, getCommerces } = useCommerces({ search,select })
  

  
  const debouncedGetCommerces = useCallback(
    debounce(search => {
      getCommerces({ search,select })
    }, 300)
    , [getCommerces],
    //console.log('search', search, "select:" , select , "debounced")
    
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    
    getCommerces({ search, select })
  }


  const handleSelect = (event) => {
    const newSelect = event.target.value

    updateSearch(search)
    updateSelect(newSelect)
    //debouncedGetCommerces(newSelect)
    getCommerces({ search, select: newSelect })
    
  }
  /* 
  // ordenar
  const handleSort = () => {
    setSort(!sort)
  }
 */
  const handleChange = (event) => {
    const newSearch = event.target.value

    updateSearch(newSearch)
    updateSelect(select)
    debouncedGetCommerces(newSearch, select)
    //console.log("handleChange:" , select)
  }

  const { isChecked, toggleCheckbox } = useCheckbox();

  const handleCheckboxChange = () => {
    toggleCheckbox();
  };


  return (
    <div className='page'>

      <header className='   w-full'>
        <div className=' z-50 p-8 m-8 mt-[10px]  shadow-[0_2px_15px_-3px_rgba(0,0,0,0.29),0_10px_20px_-2px_rgba(0,0,0,0.04)]'>
          <form className='form flex xl:flex-row md:flex-col sm:flex-col xs:flex-col xxs:flex-col' onSubmit={handleSubmit} id='formlist' >
            <input
              className=' bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
              m-4 p-4" >'
              onChange={handleChange} value={search} name='query' placeholder='Buscar' autoComplete="off"
            />
            {/* 
            <div className="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" className=" gap-y-4 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              
              onChange={handleSort} checked={sort}
              />
              
              <label forhtml="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-900">Ordenar</label>
            </div>
            */}
            <select name="localidad" id="localidad" onChange={handleSelect} value={select} 
            className='bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
            <option value="">Localidad</option>
            <optgroup label="Buenos Aires">
            <option value="Bahia Blanca">Bahia Blanca</option>
            <option value="Punta Alta">Punta Alta</option>
            <option value="Mar Del Plata">Mar Del Plata</option>
            <option value="Monte Hermoso">Monte Hermoso</option>
            </optgroup>
            <optgroup label="Cordoba">
            <option value="Villa Maria">Villa Maria</option>
            </optgroup>
            </select>
            <div className='p-2'id='checkMap'>
            <label className="relative inline-flex cursor-pointer items-center ">
            <input id="switch2" type="checkbox" className="peer sr-only" checked={isChecked}
          onChange={handleCheckboxChange}/>
            <label htmlFor="switch2" className="hidden"></label>
            <div className="peer h-4 w-11 rounded-full border bg-blue-400 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-gray-400 peer-checked:after:translate-x-full peer-focus:ring-blue-300 "
                       ></div>
          </label>
              <div>
              <label className='text-xs '>Mapa</label>
              </div>
          </div>
          </form>
       
        {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </header>

      <main className=''>
        {
          loading ? <p>Cargando...</p> : <Commerces commerces={commerces} />
          
        }
        <Footer localidad={select}/>
      
      </main>
    </div>

    
  )
}

export default Commerce
