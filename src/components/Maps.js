import React, { useEffect, useState, useRef } from "react"
import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker,
  InfoWindow
} from "@vis.gl/react-google-maps"
import { MarkerClusterer } from "@googlemaps/markerclusterer"
import trees from "../threes"
//import logo15 from '../assets/15c.png'
import logo10 from '../assets/10c.png'
import { useCheckbox } from '../context/CheckContext';

const API_KEY = process.env.REACT_APP_GOOGLEMAPSAPIKEY



 const Maps = () => (
  
  
  <APIProvider apiKey={API_KEY}>
    
    <div style={{ height: "55vh", width: "100%" }} className="" id="map">
    <Map
      mapId={"bf51a910020fa25a"}
      center={{ lat: 43.64, lng: -79.41 }}
      zoom={10}
    >
      <Markers points={trees} />
    </Map>
    
    </div>
  </APIProvider>
) 

const Markers = ({ points }) => {
  const map = useMap()
  const [markers, setMarkers] = useState({})
  const clusterer = useRef(null)
  const [openMarkers, setOpenMarkers] = useState({});

  const { isChecked } = useCheckbox();
 

  // Initialize MarkerClusterer
  useEffect(() => {
    if (!map) return
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map })
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

    setMarkers(prev => {
      if (marker) {
        return { ...prev, [key]: marker }
      } else {
        const newMarkers = { ...prev }
        delete newMarkers[key]
        return newMarkers
      }
    })
  }

  const handleMarkerClick = (point) => {
    setOpenMarkers(prev => ({
      ...prev,
      [point.key]: !prev[point.key] // toggle the state for the clicked marker
    }));
  };


  return (
    <>
      <div>
      {isChecked ? (
        <div>
          <h2>Componente desactivado</h2>
          <p>Este componente está desactivado por el checkbox.</p>
        </div>
      ) : (


      <div >
          {points.map(point => (
            <div key={point.key} >
            <AdvancedMarker
              position={point}
              key={point.key}
              ref={marker => setMarkerRef(marker, point.key)}
              onClick={() => handleMarkerClick(point)}
            >
              <span className="tree" ><img src={logo10 } className=" max-w-[30px] min-h-[30px] max-h-[30px]" alt="logo10"/></span>
              {openMarkers[point.key] && (
                <InfoWindow position={point} 
                onCloseClick={() => handleMarkerClick(point)}>
                  <p>I'm in </p>
                  <p>{point.name}</p>
                  <p>Direccion: Fitz Roy 140</p>
                </InfoWindow>
              )}
            </AdvancedMarker>
            
            </div>
            
          ))}

        </div>
       )}
     </div>   
           
    </>
  )
}

export default Maps


