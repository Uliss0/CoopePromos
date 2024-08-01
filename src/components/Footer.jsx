import {searchLocalidades} from '../services/localitiesService'
import { useEffect, useState } from 'react';
function Footer ({select}) {
  const [localidadencontrada, setLocalidadEncontrada] = useState({})

  useEffect(() => {
    const fetchSlides = async () => {
      const data = await searchLocalidades({select});
      setLocalidadEncontrada(data);
    };
    fetchSlides();
  }, [select]);
     
      return (
        <div className='pt-10'>
        <a href={localidadencontrada.Link} target='_blank' rel='noreferrer'>
      <img className='w-full' src={localidadencontrada.Img} alt=''/>
      </a>

      </div>
      
      )}
  


  export default Footer