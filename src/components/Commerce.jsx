import '../App.css'
import './Commerce.css'
import { useState,  useCallback,useRef ,useContext} from 'react'
import { useCommerces } from '../hooks/useCommerces.js'
import { useCheckbox } from '../context/CheckContext.js';
import {useLocalities} from '../hooks/useLocalities.js'
import { Commerces } from './Commerces.jsx'
import Footer from './Footer.jsx';
import debounce from 'just-debounce-it'
import { UbicacionContext } from '../context/UbicacionContext';
import { searchLocalidades } from '../services/localities.js';
//import Dropdown from './Dropdown.jsx';
//import SideBar from './SideBar.js';

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

function useSelectR () {
const [ selectR,  updateSelectR ] = useState('')
return {selectR, updateSelectR}
}

function Commerce () {
  const { setUbicacion } = useContext(UbicacionContext);
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { select,  updateSelect } = useSelect()  
  const { selectR,  updateSelectR } = useSelectR()  
  
  const { commerces, loading, getCommerces } = useCommerces({ search,select,selectR ,sort})
  
  const { localidad, getLocalidades } = useLocalities({select})
  
  let ref = useRef('');
  
  const debouncedGetCommerces = useCallback(
    debounce(search => {
      getCommerces({ search:search,select:ref.current  })
    }, 300)
    , [getCommerces],
  )

//Manejador del submit del formulario
  const handleSubmit = (event) => {
    event.preventDefault()
    handleSelect(ref.current)
    //getLocalidades({ select: ref.current })
    debouncedGetCommerces(search, ref.current)
  }

//Manejador del select -  parte del buscador
  const handleSelect = (event) => {
    const newSelect = event.target.value
    ref.current = newSelect
    updateSelect(newSelect)
    getLocalidades({ select: newSelect })
    getCommerces({ search:search, select: newSelect, selectR: selectR   })
    
    //control muestra el mapa por localidad
    const localidadCentral=searchLocalidades({ select: newSelect })
    const ubicacion={lat:localidadCentral.Latitud, lng:localidadCentral.Longitud,zoom:15}
    setUbicacion(ubicacion);
  }
  
  // ordenar / checkbox
  const handleSort = () => {
    setSort(!sort)
  }
 
  //Manejador del cambio de búsqueda
  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetCommerces(newSearch, ref.current)
  }

  const { isChecked, toggleCheckbox } = useCheckbox();
    const handleCheckboxChange = () => {
      toggleCheckbox();
    };

  //controlando dropdownRubro
  const handleSelectRubro = (event) => {
    const selectR = event.target.value
    updateSelectR(selectR)
    getCommerces({ search:search, select: select, selectR: selectR  })

    
    }
  
  return (
    <div className='page'>
      <header className='   w-full'>
        <div className=' z-50 p-8 m-8   rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.29),0_10px_20px_-2px_rgba(0,0,0,0.04)]'>
          <form className='form flex  md:flex-col sm:flex-col xs:flex-col xxs:flex-col xxs:items-stretch ' onSubmit={handleSubmit} id='formlist' >
             {/* 
            <input
              className=' bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
              m-4 p-4" >'
              onChange={handleChange} value={search} name='query' placeholder='Buscar' autoComplete="off"
            /> */ }
            
            {/* 
            <div className="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" className=" gap-y-4 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              
              onChange={handleSort} checked={sort} 
              />
              
              <label forhtml="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-900">Ordenar</label>
            </div> */ }
            


            <select name="localidad" id="localidad" onChange={handleSelect} value={select} 
            className='bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
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
            {/*input+dropdown rubro */}
            <div className=" relative w-auto">
                <div className="flex ">
                  <select
                    id="rubro" name="rubro" onChange={handleSelectRubro} value={selectR} 
                    className="  inline-flex items-center  text-sm font-normal text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                    >
                    <option value="">Rubro</option>
                    <option value="Indumentaria">Indumentaria</option>
                    <option value="Deportes">Deportes</option>
                    <option value="Comida">Comida</option>
                    <option value="Regaleria">Regaleria</option>
                    <option value="Electrodomesticos">Electrodomesticos</option>
                  </select>
                  <div className="relative w-full">
                            <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Buscar Comercio" 
                             onChange={handleChange} value={search} name='query' autoComplete="off"/>
                            <div type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                                
                            </div>
                        </div>
                </div>

            </div>
              {/*endrubros */}

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
        

      <Footer select={ref.current}/>
      </main>
    </div>

    
  )
}

export default Commerce
