//import commerces from '../mock.json'
//const API_KEY = '4287ad07'

export const searchCommerces = async ({ search, select }) => {
  
  //console.log("search serv:",search, "select", select)
  try {
    //const response = await fetch('/src/mocks/mock.json')
    //console.log(response)
    //const json = await response.json()
    //console.log(json)
    const dataJson = require('..\\src\\mocks\\mock.json');
    //console.log("datajs ", dataJson)
    const arr=Object.values(dataJson)

    if ((search === '')  &&((select === undefined) || (select===''))){
      //console.log(search, arr[0])
    return arr[0]?.map(commerce => ({
      id: commerce.ID,
      nomComercio: commerce.NomComercio,
      localidad: commerce.Localidad,
      rubro: commerce.Rubro,
      direccion: commerce.Direccion,
      
    }))
  }

    const items=[]
    if (((select === undefined)|| (select ==='')) &&(search !== '' )){
      arr[0].forEach((item=>{
        if (item.NomComercio.toLowerCase().includes(search.toLowerCase())) 
         items.push(item) 

          //console.log("nombrecomercio: ", item.NomComercio)
          
      }))
      return items?.map(commerce => ({
        id: commerce.ID,
        nomComercio: commerce.NomComercio,
        localidad: commerce.Localidad,
        rubro: commerce.Rubro,
        direccion: commerce.Direccion,
        
      })) 
      
    }
    
    else{
      const items=[]
      const local=[]
      arr[0].forEach((item=>{
        if (item.NomComercio.toLowerCase().includes(search.toLowerCase()))  items.push(item) 
        //console.log("nombrecomercio: ", item.NomComercio)
      })) 

      items.forEach((item=>{
        if (item.Localidad.toLowerCase().includes(select.toLowerCase()))  local.push(item) 
      })) 
      
      return local?.map(commerce => ({
        id: commerce.ID,
        nomComercio: commerce.NomComercio,
        localidad: commerce.Localidad,
        rubro: commerce.Rubro,
        direccion: commerce.Direccion,
      }))
    }

    
    
    
  } catch (e) {
    throw new Error('Error searching ')
  }
}

