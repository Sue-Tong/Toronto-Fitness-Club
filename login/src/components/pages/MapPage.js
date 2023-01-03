import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import axios from "axios"
import { API_URL } from "../../constants"

function MapPage() {

  const STUDIO_URL = `${API_URL}studio/`; 
  const [studios,setStudios] = useState([]);


  axios.get(STUDIO_URL)

    .then((res) => {
      setStudios(res.data);
    })
    .catch((error) => {
  });

  const markers = [
    {
      position: { lat: 43.67284351906553, lng: -79.38739966980584
      }
    },
    {
      position: { lat: 43.66231988982446, lng: -79.38464846317247
      }
    }
  ];

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };


  const handleOnLoad = (map) => {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };


  return (
    <GoogleMap
      onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ width: "100vw", height: "100vh" }}
    >
      {studios.map((a) => (
        <Marker
          key={a.id}
          position={{lat:a.lat,lng:a.long}}
          onClick={() => handleActiveMarker(a.id)}
        >
          {activeMarker === a.id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>{a.all}</div>
            </InfoWindow>
          ) : null}
        </Marker>
      ))}
    </GoogleMap>
    
  );
}

export default MapPage;
