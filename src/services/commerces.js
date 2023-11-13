import commerces from '../mock.json'
const API_KEY = '4287ad07'

export const searchCommerces = async ({ search }) => {
  
  try {
    const response = await fetch('/src/mocks/mock.json')
    console.log(response)
    const dataJson = require('..\\src\\mocks\\mock.json');
    console.log("datajs ", dataJson)
    //const json = await response.json()
    //console.log(json)
    const arr=Object.values(dataJson)

    if (search === '')  return arr[0]?.map(commerce => ({
      id: commerce.ID,
      nomComercio: commerce.NomComercio,
      localidad: commerce.Localidad,
      rubro: commerce.Rubro,
      direccion: commerce.Direccion,
    }))

    
    const items=[]
    arr[0].forEach((item=>{
      if (item.NomComercio.toLowerCase().includes(search.toLowerCase()))  items.push(item) 
      //console.log("nombrecomercio: ", item.NomComercio)
    })) 
    
    return items?.map(commerce => ({
      id: commerce.ID,
      nomComercio: commerce.NomComercio,
      localidad: commerce.Localidad,
      rubro: commerce.Rubro,
      direccion: commerce.Direccion,
    }))
  } catch (e) {
    throw new Error('Error searching ')
  }
}

