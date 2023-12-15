import React, { useEffect, useState, useRef,useContext, } from "react"
import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker,
  InfoWindow
} from "@vis.gl/react-google-maps"
import { MarkerClusterer,SuperClusterAlgorithm } from "@googlemaps/markerclusterer"

import logo15 from '../assets/15c.png'
import logo10 from '../assets/10c.png'
import { useCheckbox } from '../context/CheckContext';
import { UbicacionContext } from '../context/UbicacionContext';
import { CommercesContext } from '../context/CommercesContext';

const API_KEY = process.env.REACT_APP_GOOGLEMAPSAPIKEY


const Maps = () => {

  const { isChecked } = useCheckbox();
  const { ubicacion } = useContext(UbicacionContext);
  const { comercios } = useContext(CommercesContext);


console.log("comercios",comercios)

  /* useEffect(() => {
    
    if (map) {
      mapRef.current = map;
    }
  }, []);


  useEffect(() => {
    if ((mapRef.current && ubicacion && ubicacion.Latitud && ubicacion.Longitud)|| (done)){
      mapRef.current.setCenter(ubicacion);
      console.log(mapRef)
    }
    console.log("no",mapRef)
  }, [mapRef,ubicacion]); */


  /* useEffect(() => {
    if (map && ubicacion) {
      // Actualiza el mapa con la nueva ubicación
      console.log("ln: ",ubicacion.lat,"lg: ", ubicacion.lng);
      map.setCenter(parseFloat(ubicacion.lat), parseFloat(ubicacion.lng));
    }
    console.log(map)
    
  }, [map, ubicacion]);map id anterior bf51a910020fa25a
 */

  
  if (isChecked) {
    return (
      <div>
      
      </div>
    )
  }

  return (
    <APIProvider apiKey={API_KEY}>  
      <div style={{ height: "55vh", width: "100%" }}  id="map">
        <Map
          mapId={"cfb9cbd5c58ced25"}
          zoom={14}
          center={{lat:ubicacion.lat ,lng:ubicacion.lng }}//|| { lat: 43.64, lng: -79.41 }}
        >
          <Markers points={comercios } />
        </Map>
      </div>
    </APIProvider>
  )
}

const Markers = React.memo(({ points }) => {
  const map = useMap()
  const [markers, setMarkers] = useState({})
  const clusterer = useRef(null)
  const [openMarkers, setOpenMarkers] = useState({});
  const { ubicacion } = useContext(UbicacionContext);
  const { isChecked } = useCheckbox();
  

  // Initialize MarkerClusterer
  useEffect(() => {
    if (!map) return
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({
        
        map,
        algorithm: new SuperClusterAlgorithm({ radius: 80 }),
      })
    }
  }, [map])

  // Update markers
  useEffect(() => {
    clusterer.current?.clearMarkers()
    clusterer.current?.addMarkers(Object.values(markers))
  }, [markers])

  const setMarkerRef = (marker, id) => {
    if (marker && markers[id]) return
    if (!marker && !markers[id]) return

    setMarkers(prev => {
      if (marker) {
        return { ...prev, [id]: marker }
      } else {
        const newMarkers = { ...prev }
        delete newMarkers[id]
        return newMarkers
      }
    })
  }

  const handleMarkerClick = (point) => {
    setOpenMarkers(prev => ({
      ...prev,
      [point.id]: !prev[point.id] // toggle the state for the clicked marker
    }));
  };

 

  useEffect(() => {
    if (map && ubicacion) {
      // Actualiza el mapa con la nueva ubicación
      map.setCenter(ubicacion);
      map.setZoom(ubicacion.zoom);
    }
  }, [map, ubicacion]);
  let descuento=null;

  if(points[0].provincia===undefined)return
  return (
    <>
      
      {isChecked ? (
        <div>
          
        </div>
      ) : (

        <section id='Mapcomponent'>
      <div >
          {points.map(point => (
            descuento=point.dto===15?logo15:logo10,
            <div key={point.id} >
            <AdvancedMarker
              position={point}
              key={point.id}
              ref={marker => setMarkerRef(marker, point.id)}
              onClick={() => handleMarkerClick(point)}
            >
              <span className="tree" ><img  src={descuento}  className=" max-w-[30px] min-h-[30px] max-h-[30px]" alt="logo"/></span>
              {openMarkers[point.id] && (
                <InfoWindow position={point} 
                onCloseClick={() => handleMarkerClick(point)}>
                 
                  <p className="text-lg"><strong>{point.nomComercio}</strong></p>
                  <p>Direccion: <strong>{point.direccion}</strong></p>
                  <p>Telefono:<strong>{point.prefijo}-{point.telefono}</strong></p>
                  <p>Descuento:<strong>{point.dto}%</strong></p>
                </InfoWindow>
              )}
            </AdvancedMarker>
            
            </div>
            
          ))}

        </div>
        </section>
       )}
      
           
    </>
  )
})

export default Maps


