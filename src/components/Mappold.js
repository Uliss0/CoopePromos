
import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

export default function Intro() {
  const position = { lat: -38.72, lng:  -62.27 };
  const [open, setOpen] = useState(false);

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLEMAPSAPIKEY}>
      <div style={{ height: "50vh", width: "100%" }}>
        <Map zoom={14} center={position} mapId='satellite'>
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin
              background={"red"}
              borderColor={"blue"}
              glyphColor={"blue"}
            />
          </AdvancedMarker>

          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <p>I'm in Bahia Blanca</p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}