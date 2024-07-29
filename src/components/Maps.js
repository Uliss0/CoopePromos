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
import logo20 from '../assets/20c.png'
import { useCheckbox } from '../context/CheckContext';
import { UbicacionContext,useUbicacion  } from '../context/UbicacionContext';
import { CommercesContext } from '../context/CommercesContext';


const API_KEY = process.env.REACT_APP_GOOGLEMAPSAPIKEY


const Maps = () => {
  const { isChecked } = useCheckbox();
  const { ubicacion } = useContext(UbicacionContext);
  const { comercios } = useContext(CommercesContext);
  
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
          <Markers points={comercios} />
        </Map>
      </div>
    </APIProvider>
  )
}

const Markers = React.memo(({ points,}) => {
  const map = useMap()
  const [markers, setMarkers] = useState({})
  const clusterer = useRef(null)
  //const [openMarkers, setOpenMarkers] = useState({});
  const { ubicacion } = useContext(UbicacionContext);
  const { isChecked } = useCheckbox();
  const { openMarkers, toggleInfoWindow } = useUbicacion();

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

  const setMarkerRef = (marker, key) => {
    if (marker && markers[key]) return
    if (!marker && !markers[key]) return
    
    
    if(marker===undefined)return
    if((markers[key]==null) ){
      
      return }
    
    setMarkers(prev => {
      if (marker) {
        
        return { ...prev, [key]: marker }
      } else {
        const newMarkers = { ...prev }
        delete newMarkers[key]
        //console.log("markers; ", newMarkers)

        return newMarkers
      }
    })
  }
/*
  const handleMarkerClick = (point) => {
    setOpenMarkers(prev => ({
      ...prev,
      [point.key]: !prev[point.key] // toggle the state for the clicked marker
    }));
  };

 */

  useEffect(() => {
    if (map && ubicacion) {
      // Actualiza el mapa con la nueva ubicación
      map.setCenter(ubicacion);
      map.setZoom(ubicacion.zoom);
    }
  }, [map, ubicacion]);
  let descuento = null;

  if(points[0].provincia === undefined) return

  const handleMarkerClick2 = (point) => {
    
    toggleInfoWindow(point.key);
  };
  
  return (
    <>
      {isChecked ? (
        <div>
          
        </div>
      ) : (
        <section id='Mapcomponent'>
          <div >
            {points.map(point => {
              if (point.dto === 15) {
                descuento = logo15;
              } else if (point.dto === 10) {
                descuento = logo10;
              } else if (point.dto === 20) {
                descuento = logo20;
              }
              return (
                <div key={point.key} >
                  <AdvancedMarker
                    position={point}
                    key={point.key}
                    ref={marker => setMarkerRef(marker, point.key)}
                    onClick={() => handleMarkerClick2(point)}
                  >
                    <span className="tree" ><img  src={descuento}  className=" max-w-[30px] min-h-[30px] max-h-[30px]" alt="logo"/></span>
                    {openMarkers[point.key] && (
                      <InfoWindow position={point} 
                      onCloseClick={() => handleMarkerClick2(point)}>
                       
                        <p className="text-lg"><strong>{point.nomComercio}</strong></p>
                        <p>Direccion: <strong>{point.direccion}</strong></p>
                        <p>Telefono:<strong>{point.prefijo}-{point.telefono}</strong></p>
                        <p>Descuento:<strong>{point.dto}%</strong></p>
                      </InfoWindow>
                    )}
                  </AdvancedMarker>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
},
(prevProps, nextProps) => {
  // Función de comparación de props
  return prevProps.points === nextProps.points;
}
);

export default Maps


