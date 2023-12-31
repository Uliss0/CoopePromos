
import picture from '../assets/Icons/DESCONOCIDO.png'
import React, { useState } from 'react';
import Card from './Card';
import Icons from '../dataIcons';

function ListOfCommerces ({ commerces }) {
  const [selectedCommerce, setSelectedCommerce] = useState(null);
  
  const handleCommerceClick = (commerce) => {
    setSelectedCommerce(commerce);
  };

  const closeDetails = () => {
    setSelectedCommerce(null);
  };
  
  if(commerces[0].provincia===undefined)return
 let ico

  return (
    <div className=''>
    
    <div className='cont   xl:px-[100px] '>
    <ul className='commerces '>
      {
        commerces.map((commerce) => (
          ico=Icons.icon.find(icon => icon.name === commerce.rubro),
          <div className='auto-cols-auto ' key={commerce.id}>
              <li className='commerce gap-12 ' key={commerce.id} value={commerce.id} >
                <div 

              className=" max-w-[325px] xxs:min-w-[360px] md:min-w-[220px] sm:min-w-[220px] max-h-auto  rounded-lg  bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[rgba(7,_65,_210,_0.2)_0px_9px_20px] dark:bg-white
              hover:scale-105 transition-all  duration-400 cursor-pointer flex flex-row md:flex-col sm:flex-col" onClick={() => handleCommerceClick(commerce)}>
              <div className="relative bg-cover bg-no-repeat rounded-t-sm">
              <div className={`${commerce.dto === 10 ? 'bg-red-500' : commerce.dto === 20 ? 'bg-violet-700' : 'bg-blue-700'} text-white absolute w-1/2 text-center top-0 left-1/4 rounded-2xl mt-[-8px] `}>{commerce.dto}% dto</div>

                <img
                  className="  max-h-[175px] max-w-[175px] xxs:max-w-[175px] xxs:min-h-[175px] items-center inline-flex  p-b-0 :rounded-l-lg"
                  //src={Icons.find(icon => icon === commerce.rubro)?.image || picture}
                  src={
                   commerce.img ? commerce.img : (ico) ?  ico.icon : picture}
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
    </div>
    {selectedCommerce && (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center transition-all  duration-400">
       
            <Card commerce={selectedCommerce} onClose={closeDetails} ico={ico} />
        
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
