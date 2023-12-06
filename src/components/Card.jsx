import picture from '../assets/picture.jpg'
import React, { useContext } from 'react';
import { UbicacionContext } from '../context/UbicacionContext';
import { FaPhone } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";

export function Card({ commerce, onClose }){
  const { setUbicacion } = useContext(UbicacionContext);
    const handleClose = () => {
        
        onClose(null);
      };

      const handleClick = () => {
       const ubicacion={lat:commerce.latitud, lng:commerce.longitud,zoom:15}

        setUbicacion(ubicacion);
        handleClose();
      };
    
    return(
        <div className="items-center grid place-content-center "  >
        <div className="card flex items-center min-w-[400px] min-h-[400px] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.18),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            <div className="bg-white ">
            <div className="relative  bg-cover bg-no-repeat rounded-t-sm">
              <div className={`${commerce.dto===10? 'bg-red-500' :'bg-blue-700'} text-white absolute w-1/2 text-center top-0 left-1/4 rounded-2xl mt-[-8px] `}>{commerce.dto}% dto</div>
                <img
                  className="  max-h-[200px] max-w-[200px] items-center inline-flex pt-2 p-b-0 "
                  src={picture}
                  alt="" />
              </div></div>
                        <span className="bg-white rounded-tr-lg rounded-br-lg"><div className="justify-end flex mr-4"><button onClick={handleClose} > ✖ </button></div>  <div className="border-b-[2px] border-blue-500 font-bold mt-6"><div className="flex flex-row justify-center"><h1 className="text-2xl bold items-center">{commerce.nomComercio}</h1></div></div>
                          
                                            <div className="max-w-[350px] ">
                                                <br></br>
                                            <h2 className="text-left text-lg">{commerce.rubro}</h2>   
                                            <br></br> 
                                            
                                            <p className="text-sm text-left">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et rem, est architecto dolorum accusamus culpa incidunt, porro vitae aliquam nulla voluptatibus! Ratione natus, quam obcaecati ducimus nemo necessitatibus numquam provident.</p>
                                            <br></br>
                                            <div className='flex justify-around text-sm'><MdLocationPin/><p>{commerce.direccion} </p> |<FaPhone/><p>{commerce.prefijo}-{commerce.telefono} </p></div>
                                            <p>{commerce.localidad}</p>
                                            
                                           <a href='#Mapcomponent'> <button type='submit' onClick={handleClick}
            className='  m-4 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg  px-5 py-2.5 text-center 
            '>Mostrar en Mapa</button></a>
            </div></span>
        </div>
        </div>
    )
    }

export default Card