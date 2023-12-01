export const searchCommerces = async ({ search, select }) => {
  try {
    const dataJson = require('..\\src\\mocks\\mock.json');
    const arr = Object.values(dataJson)[0]; // Acceder directamente al array de comercios 

    /* //cambiar a fetch para poder utilizar un archivo no compilado
    const response = await fetch('/mocks/localidades.json');
        const data = await response.json();
        const arr = Object.values(data);
 */
    if (search === '' && (select === undefined || select === '')) {
      return arr.map(commerce => ({
        id: commerce.ID,
        nomComercio: commerce.NomComercio,
        localidad: commerce.Localidad,
        rubro: commerce.Rubro,
        direccion: commerce.Direccion,
        dto: commerce.Dto,
        provincia: commerce.Provincia,
        latitud: commerce.Latitud,
        longitud: commerce.Longitud,
        telefono:commerce.NroTel,
        prefijo:commerce.Prefijo
      }));
    }

    let filteredCommerces = arr;

    if (search !== '') {
      filteredCommerces = filteredCommerces.filter(item =>
        item.NomComercio.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (select  !== '') {
      filteredCommerces = filteredCommerces.filter(item =>
        item.Localidad.toLowerCase().includes(select.toLowerCase())
      );
    }

    return filteredCommerces.map(commerce => ({
      id: commerce.ID,
      nomComercio: commerce.NomComercio,
      localidad: commerce.Localidad,
      rubro: commerce.Rubro,
      direccion: commerce.Direccion,
      dto: commerce.Dto,
      provincia: commerce.Provincia,
      latitud: commerce.Latitud,
      longitud: commerce.Longitud,
      telefono:commerce.NroTel,
      prefijo:commerce.Prefijo
    }));
  } catch (e) {
    throw new Error('Error searching');
  }
};
