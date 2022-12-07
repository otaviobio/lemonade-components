import { GoogleMap, Marker } from '@react-google-maps/api';
import { mapStyle } from './mapStyle';
import './Map.scss'

const containerStyle = {
  width: '580px',
  height: '120px'
};

const center = {
  lat: 43.70805,
  lng: -79.39929,
};

export function Map({markerLocation}) {

  return(
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      options={{
        styles: mapStyle,
        disableDefaultUI: true,
      }}
    >
      {markerLocation && <Marker position={markerLocation} />}
    </GoogleMap>
  )
}