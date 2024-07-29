import picture from '../assets/picture.png'
import { useUbicacion } from '../context/UbicacionContext';
import { FaPhone } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import Icons from '../dataIcons';
import CardButton from './buttons/CardButton'



export function Card({ commerce, onClose }) {

  const { setUbicacion, toggleInfoWindow } = useUbicacion();
  /*
  const { setUbicacion  } = useContext(UbicacionContext);
  const {  toggleInfoWindow } = useUbicacion(); */
  const handleClose = () => {
    onClose(null);
  };

  const handleClick = () => {
    const ubicacion = {lat: commerce.lat, lng: commerce.lng, zoom: 17};
    setUbicacion(ubicacion);
    toggleInfoWindow(commerce.key);
    const checkbox = document.querySelector("#switch3");
    const mapComponent = document.getElementById("map");
    if (!mapComponent) {
      checkbox.click();

    }

    handleClose();
  };

  let ico = Icons.icon.find(icon => icon.name === commerce.rubro);  

    return(
      
        <div className="items-center grid place-content-center"  >
        <div className=" card flex items-center min-w-[400px] min-h-[400px] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.18),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            <div className=" ">
            <div className="relative  bg-cover bg-no-repeat rounded-t-sm">
            <div className={`${commerce.dto === 10 ? 'bg-red-500' : commerce.dto === 20 ? 'bg-violet-700' : 'bg-blue-700'} text-white absolute w-1/2 text-center top-0 left-1/4 rounded-2xl mt-[-8px] `}>{commerce.dto}% dto</div>

                <img
                  className="  max-h-[200px] max-w-[200px] items-center inline-flex pt-2 p-b-0 "
                  src={
                    commerce.img ? commerce.img : (ico) ?  ico.icon : picture}
                  alt="" />
              </div></div>
                        <span className="bg-white rounded-tr-lg rounded-br-lg "><div className="justify-end flex mr-4"><button onClick={handleClose} > ✖ </button></div>  <div className="border-b-[2px] border-blue-500 font-bold mt-6"><div className="flex flex-row justify-center"><h1 className="text-2xl bold items-center">{commerce.nomComercio}</h1></div></div>
                          
                                            <div className="max-w-[350px] ">
                                                
                                            <h2 className="text-center text-lg mt-2">{commerce.rubro}</h2>   
                                            
                                            
                                            <p className="text-sm text-left mx-4 mt-4"> ////// En este espacio el comercio podria poner una descripcion de su negocio. La descripcion tiene que estar en el csv//////</p>
                                            <br></br>
                                            <div className='flex justify-around text-sm'><MdLocationPin/><p>{commerce.direccion} </p> |<FaPhone/><p>{commerce.prefijo}-{commerce.telefono} </p></div>
                                            <p>{commerce.localidad}</p>
                                            
                                            
                                            <div>
      <CardButton onClick={handleClick}  />
      
    </div>
 
            </div></span>
        </div>
        </div>
    )
    }

export default Card