import React, { useEffect, useState, useRef } from "react"
import { createRoot } from "react-dom/client"

import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker
} from "@vis.gl/react-google-maps"
import { MarkerClusterer } from "@googlemaps/markerclusterer"
import trees from "../threes"

const API_KEY = process.env.REACT_APP_GOOGLEMAPSAPIKEY

const Maps = () => (
  <APIProvider apiKey={API_KEY}>
    <div style={{ height: "50vh", width: "100%" }}>
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

  return (
    <>
      {points.map(point => (
        <AdvancedMarker
          position={point}
          key={point.key}
          ref={marker => setMarkerRef(marker, point.key)}
        >
          <span className="tree">🌳</span>
        </AdvancedMarker>
      ))}
    </>
  )
}

export default Maps


