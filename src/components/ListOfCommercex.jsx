function ListOfCommerces ({ comercios }) {
    return (
      <ul className='commerce'>
        {
          comercios.map(commerce => (
            <li className='commerce' key={commerce.ID} value={commerce.ID}>
              <h3>{commerce.NomComercio}</h3>
              <p>{commerce.Localidad}</p>
              <p>{commerce.Rubro}</p>
            </li>
          ))
        }
      </ul>
    )
  }
  
  function NoCommerceResults ({comercios}) {
    console.log(comercios);
    return (
      <p>No se encontraron para esta búsqueda</p>
      
    )
  }
  
  export function Commerces ({ comercios }) {
    const hasCommerce = comercios?.length > 0
  
    return (
      hasCommerce
        ? <ListOfCommerces commerces={comercios} />
        : <NoCommerceResults />
    )
  }
  