import footerimg from '../assets/Footerimg.svg'


export const searchLocalidades =  ( {select }) => {
  
    console.log("select ", select)
      if (select === undefined){
        
        let localidadDef={
            localidad:'Bahia Blanca',
            img:{footerimg},
            link:'https://www.coopeplus.com.ar',
            latitud:-38.7210667,
            longitud:-62.3387734}
            return localidadDef

        }
        else{
            const searchLocalidadesAsync = async ({ select }) => {
                
                try {
                    const dataJson = require('..\\src\\mocks\\localidades.json');
                    //console.log("datajs ", dataJson)
                    const arr=Object.values(dataJson)

                    return arr.find(item => item.localidad.toLowerCase().includes(select.toLowerCase()))
                    
                  
                }catch (e) {
                      throw new Error('Error searching ')
                   }
                }
            }
   
}

