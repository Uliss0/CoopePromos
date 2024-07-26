export const searchCommerces = async ({ search, select, selectR, filtrar10,filtrar15,filtrar20 }) => {
  try {
    const dataJson = require("..\\src\\mocks\\mock.json");
    const arr = Object.values(dataJson)[0]; // Acceder directamente al array de comercios

    /* //cambiar a fetch para poder utilizar un archivo no compilado
    const response = await fetch('/mocks/localidades.json');
        const data = await response.json();
        const arr = Object.values(data);
 */

        
    if (
      search === "" &&
      (select === undefined || select === "") &&
      (selectR === undefined || selectR === "")
    ) {
      return arr.map((commerce) => ({
        id: commerce.ID,
        nomComercio: commerce.NomComercio,
        localidad: commerce.Localidad,
        rubro: commerce.Rubro,
        direccion: commerce.Direccion,
        dto: commerce.Dto,
        
        lat: commerce.Latitud,
        lng: commerce.Longitud,
        telefono: commerce.NroTel,
        prefijo: commerce.Prefijo,
        img:commerce.Img,
        key: JSON.stringify({
          id: commerce.ID,
          nomComercio: commerce.NomComercio,
          localidad: commerce.Localidad,
          rubro: commerce.Rubro,
          direccion: commerce.Direccion,
          dto: commerce.Dto,
          lat: commerce.Latitud,
          lng: commerce.Longitud,
          telefono: commerce.NroTel,
          prefijo: commerce.Prefijo
      })
      }));
    }

    let filteredCommerces = arr;
    
   
    
    if (select.current !== "") {
      filteredCommerces = filteredCommerces.filter((item) =>
        item.Localidad.toLowerCase().includes(select.toLowerCase())
      );
    }

    if (selectR.current !== "") {
      filteredCommerces = filteredCommerces.filter((item) =>
        item.Rubro.toLowerCase().includes(selectR.toLowerCase())
      );
    }
    
    if (!filtrar10) {
      filteredCommerces = filteredCommerces.filter((item) => item.Dto !== 10);
    }
    if (!filtrar15) {
      filteredCommerces = filteredCommerces.filter((item) => item.Dto !== 15);
    }
    if (!filtrar20) {
      filteredCommerces = filteredCommerces.filter((item) => item.Dto !== 20);
    }
  
    if (search !== "") {
      filteredCommerces = filteredCommerces.filter((item) =>
        item.NomComercio.toLowerCase().includes(search.toLowerCase()
        )
      );
      
    }
  
    return filteredCommerces.map((commerce) => ({
      id: commerce.ID,
      nomComercio: commerce.NomComercio,
      localidad: commerce.Localidad,
      rubro: commerce.Rubro,
      direccion: commerce.Direccion,
      dto: commerce.Dto,
      provincia: commerce.Provincia,
      lat: commerce.Latitud,
      lng: commerce.Longitud,
      telefono: commerce.NroTel,
      prefijo: commerce.Prefijo,
      img:commerce.Img,
      key: JSON.stringify({
        id: commerce.ID,
        nomComercio: commerce.NomComercio,
        localidad: commerce.Localidad,
        rubro: commerce.Rubro,
        direccion: commerce.Direccion,
        dto: commerce.Dto,
        lat: commerce.Latitud,
        lng: commerce.Longitud,
        telefono: commerce.NroTel,
        prefijo: commerce.Prefijo
    })
    }));
    
  } catch (e) {
    throw new Error("Error searching");
  }
};
