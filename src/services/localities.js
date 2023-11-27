import footerimg from '../assets/Footerimg.svg'


export const searchLocalidades =  ({ select }) => {
  
    try {

      if (select === undefined){
        
        let localidadDef={
            localidad:'Bahia Blanca',
            img:{footerimg},
            link:'https://www.coopeplus.com.ar',
            latitud:-38.7210667,
            longitud:-62.3387734}

            console.log(localidadDef)
            return localidadDef

        }
        else{
            const searchLocalidadesAsync = async ({ select }) => {
                
                try {
                    const dataJson = require('..\\src\\mocks\\localidades.json');
                    //console.log("datajs ", dataJson)
                    const arr=Object.values(dataJson)

                  
                }catch (e) {
                      throw new Error('Error searching ')
                    
                  }
                }
            }
    }catch(e){
        throw new Error('Error searching ')
    }
}

