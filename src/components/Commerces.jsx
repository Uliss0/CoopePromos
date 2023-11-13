import './Commerces.css'
function ListOfCommerces ({ commerces }) {
  
  return (
    <div>
    <ul className='commerces'>
      {
        commerces.map((commerce) => (
          <div className='auto-cols-auto'>
              <li className='commerce' key={commerce.id} value={commerce.id}>
                
                <div
              className="block max-w-[18rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div className="relative overflow-hidden bg-cover bg-no-repeat">
                <img
                  className=""
                  src="https://tecdn.b-cdn.net/img/new/standard/nature/182.jpg"
                  alt="" />
              </div>
              <div className="p-6">
              <h3>{commerce.nomComercio}</h3>
                <p className="text-base text-neutral-600 dark:text-neutral-200">
                  {commerce.localidad}
                </p>
                <p className="text-base text-neutral-600 dark:text-neutral-200">
                  {commerce.rubro}
                </p>
                <p className="text-base text-neutral-600 dark:text-neutral-200">
                  {commerce.direccion}
                </p>
              </div>
              </div>
              </li>
          </div>
       ))
      }
    </ul>
    <div>
       
    </div>
    </div>
  )
}

function NoCommercesResults () {
  return (
    <p>No se encontraron comercios para esta búsqueda</p>
  )
}

export function Commerces ({ commerces }) {
  const hasCommerces = commerces?.length > 0



  return (
    hasCommerces
      ? <ListOfCommerces commerces={commerces} />
      : <NoCommercesResults />
  )
}
