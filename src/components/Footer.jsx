import {searchLocalidades} from '../services/localities'

function Footer ({select}) {
  
    //console.log("entra al footer",localidad) ok
      const localidadencontrada=searchLocalidades({select})
     
     
      return (
        <div className='pt-10'>
        <a href={localidadencontrada.Link} target='_blank' rel='noreferrer'>
      <img className='w-full' src={localidadencontrada.Img} alt='foto'/>
      </a>

      </div>
      
      )}
  


  export default Footer