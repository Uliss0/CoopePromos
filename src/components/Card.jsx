
import picture from '../assets/Icons/DESCONOCIDO.png'
import React, { useState } from 'react';
import BigCard from './BigCard';
import Icons from '../dataIcons';

function ListOfCommerces ({ commerces }) {
  const [selectedCommerce, setSelectedCommerce] = useState(null);
  const [visibleCommerces, setVisibleCommerces] = useState(8);

  const handleCommerceClick = (commerce) => {
    setSelectedCommerce(commerce);
  };

  const closeDetails = () => {
    setSelectedCommerce(null);
  };
  
  const loadMoreCommerces = () => {
    setVisibleCommerces(visibleCommerces + 8);
  };
  
  if(commerces[0].provincia===undefined)return
 let ico

  return (
    <div className=''>
    
    <div className='cont   xl:px-[100px]'>
    <ul className='commerces '>
    {commerces.slice(0, visibleCommerces).map((commerce) => (
            // eslint-disable-next-line
            ico = Icons.icon.find((icon) => icon.name === commerce.rubro),
          <div className='auto-cols-auto' key={commerce.id}>
              <li className='commerce gap-12 ' 
              key={commerce.id} 
              value={commerce.id} >
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
              <h3 className='text-base pt-4'><strong>{commerce.nomComercio}</strong></h3>
              <hr className="border-b border-blue-500"/>
                
                <p className="text-sm text-dark dark:text-dark">
                  {commerce.rubro}
                </p>
                <p className="text-sm text-dark  dark:text-dark">
                  {commerce.direccion}
                </p>
                <p className="text-sm text-dark  dark:text-dark">
                  {commerce.localidad}
                </p>
              </div>
              </div>
              </li>
          </div>
       ))
      }
    </ul>
    {visibleCommerces < commerces.length && (
          <button className=' p-2 bg-[#4273b4] text-white rounded-lg'
          onClick={loadMoreCommerces}>Cargar más</button>
        )}
    </div>
    {selectedCommerce && (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center transition-all  duration-400">
       
            <BigCard commerce={selectedCommerce} onClose={closeDetails} ico={ico} />
        
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
