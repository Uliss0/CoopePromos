
import picture from '../assets/picture.jpg'
import React, { useState } from 'react';
import Card from './Card';

function ListOfCommerces ({ commerces }) {
  const [selectedCommerce, setSelectedCommerce] = useState(null);

  const handleCommerceClick = (commerce) => {
    setSelectedCommerce(commerce);
  };

  const closeDetails = () => {
    setSelectedCommerce(null);
  };

  return (
    <div>
    

    <ul className='commerces'>
      {
        commerces.map((commerce) => (
          <div className='auto-cols-auto' key={commerce.id}>
              <li className='commerce' key={commerce.id} value={commerce.id} >
                <div 

              className=" max-w-auto min-w-[220px]  rounded-lg  bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-white
              hover:scale-105 transition-all  duration-400 cursor-pointer flex flex-row md:flex-col sm:flex-col" onClick={() => handleCommerceClick(commerce)}>
              <div className="relative  bg-cover bg-no-repeat rounded-t-sm">
              <div className="bg-red-500 text-white absolute w-1/2 text-center top-0 left-1/4 rounded-2xl mt-[-8px] ">{commerce.dto}% dto</div>
                <img
                  className="  max-h-[190px] max-w-[190px] items-center inline-flex pt-2 p-b-0 "
                  src={picture}
                  alt="" />
              </div>
              <div className="p-6">
              <h3 className='text-base pt-4'>{commerce.nomComercio}</h3>
              <hr className="border-b border-blue-500"/>
                
                <p className="text-sm text-dark dark:text-dark">
                  {commerce.rubro}
                </p>
                <p className="text-sm text-dark  dark:text-dark">
                  {commerce.direccion}
                </p>
                <p className="text-sm text-dark  dark:text-dark">
                  <strong>{commerce.localidad}</strong>
                </p>
              </div>
              </div>
              </li>
          </div>
       ))
      }
    </ul>
    {selectedCommerce && (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center transition-all  duration-400">
       
            <Card commerce={selectedCommerce} onClose={closeDetails} />
        
      </div>
    )}
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
