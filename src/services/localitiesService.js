import footerimg from '../assets/Footerimgs.svg'
//import { useState } from 'react';   

/*
const searchLocalidadesAsync =  ({ select }) => { //version dentro del codigo
    try {

        const dataJson =  require('..\\src\\mocks\\localidades.json');
     
         const arr = Object.values(dataJson);
     
      return arr[0].find(
        (item) => item.Localidad.toLowerCase().includes(select.toLowerCase())
      );
      
    } catch (e) {
      throw new Error('Error searching');
    }
  };

*/

const searchLocalidadesAsync = async ({ select }) => { //version con fetch a archivo pubic
    try {
      //const response = await fetch('https://www.coopeplus.com.ar/contenidos/LandingPage/lp_map/mocks/localidades.json');
        const response = await fetch('/mocks/localidades.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const arr = Object.values(data)[0];
       
        return arr.find(
            (item) => item.Localidad.toLowerCase().includes(select.toLowerCase())
        );
    } catch (e) {
        throw new Error('Error searching: ' + e.message);
    }
};


  /*
  export const searchLocalidades =  ( {select} ) => {
  
  
    if ((select === undefined)||(select==='')) {
        
        return ({
          Localidad: 'Bahia Blanca',
          Img:  footerimg ,
          Link: 'https://www.coopeplus.com.ar',
          Latitud: -38.7153823,
          Longitud: -62.2657772,
        });
         
    } else {
      try {
        const result =  searchLocalidadesAsync({ select });
        if (result) {
          return result;
        } else {
          // Si la búsqueda no devuelve ningún resultado, puedes devolver un valor por defecto o manejarlo de otra manera
          return {
            localidad: 'Valor por defecto si no se encuentra',
            // ...otras propiedades por defecto
          };
        }
      } catch (error) {
        // Manejar el error de búsqueda asincrónica aquí
        console.error('Error en búsqueda asincrónica: ', error);
        // Devolver un valor por defecto o lanzar el error según sea necesario
        return {
          localidad: 'Valor por defecto debido a un error',
          // ...otras propiedades por defecto
        };
      }
    }
  };
  */
  export const searchLocalidades = async ({ select }) => {
    if ((select === undefined) || (select === '')) {
        return {
            Localidad: 'Bahia Blanca',
            Img: footerimg,
            Link: 'https://www.coopeplus.com.ar',
            Latitud: -38.7153823,
            Longitud: -62.2657772,
        };
    } else {
        try {
            const result = await searchLocalidadesAsync({ select });
            if (result) {
                return result;
            } else {
                // Si la búsqueda no devuelve ningún resultado, puedes devolver un valor por defecto o manejarlo de otra manera
                return {
                    Localidad: 'Valor por defecto si no se encuentra',
                    // ...otras propiedades por defecto
                };
            }
        } catch (error) {
            // Manejar el error de búsqueda asincrónica aquí
            console.error('Error en búsqueda asincrónica: ', error);
            // Devolver un valor por defecto o lanzar el error según sea necesario
            return {
                Localidad: 'Valor por defecto debido a un error',
                // ...otras propiedades por defecto
            };
        }
    }
};