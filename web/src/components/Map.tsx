"use client";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from "react-leaflet";


// @ts-ignore
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x.src,
//   iconUrl: marketIcon.src,
//   shadowUrl: markerShadow.src,
// });

interface MapProps {
  center?: number[];
  // position: () => void;
}

const Map: React.FC<MapProps> = ({ center }) => {
  
  function LocationMarker() {
    const [selectedPosition, setSelectedPosition] = useState<L.LatLngExpression>()
    const map = useMapEvents({
      click(e) {
        setSelectedPosition([e.latlng.lat, e.latlng.lng])
      },
    })

    useEffect(() => {
      console.log(selectedPosition)
    }, [selectedPosition])
    
  
    return selectedPosition ? (
      <Marker position={selectedPosition}>
        <Popup>You are here</Popup>
      </Marker>
    ) : null
  }
    
  return (
    <MapContainer
      center={(center as L.LatLngExpression) || [-12.04318, -77.02824]}
      zoom={center ? 13 : 4}
      // scrollWheelZoom={false}
      className="h-full rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* {center && <Marker position={center as L.LatLngExpression} />} */}
      <LocationMarker />
    </MapContainer>
  );
};

export default Map;