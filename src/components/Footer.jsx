import footerimgs from '../assets/Footerimg.svg'
import {searchLocalidades} from '../services/localities'
function Footer ({localidad}) {
  
      const localidadencontrada=searchLocalidades(localidad)
     //console.log({localidadencontrada})
     
      return (
        <div className='pt-10'>
        <a href={localidadencontrada.link} target='_blank' rel='noreferrer'>
      <img className='w-full' src={localidadencontrada.img.footerimg} alt='foto'/>
      </a>

      </div>
      
      )}
  

  



  export default Footer