import { GoogleMap, Marker } from '@react-google-maps/api';
import { mapStyle } from './mapStyle';
import './Map.scss'
import { DirectionMarker } from './Marker/DirectionMarker';
import customMarker from '../../../assets/marker.svg';

const containerStyle = {
  width: '100%',
  height: '120px',
};

const center = {
  lat: 43.70805,
  lng: -79.39929,
};

export function Map({markerLocation}) {

  return(
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={markerLocation || center}
      zoom={11}
      options={{
        styles: mapStyle,
        disableDefaultUI: true,
        disableDoubleClickZoom: true,
        draggable: false,
      }}
    >
      {/* {markerLocation && <Marker icon={customMarker} position={markerLocation} />} */}
      {markerLocation && <DirectionMarker location={markerLocation}/>}
    </GoogleMap>
  )
}


{/* <DirectionMarker location={markerLocation}/> */}