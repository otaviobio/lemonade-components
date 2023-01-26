import { OverlayView } from '@react-google-maps/api';
import './DirectionMarker.scss';
import customMarker from '../../../../assets/marker.svg';

export function DirectionMarker({ location }) {
  return (
    <OverlayView
      position={location}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={(width, height) => ({
        x: -(width / 2),
        y: -(height / 1),
      })}
    >
      <div className="direction-marker">
        <img src={customMarker} alt="marker" />
      </div>
    </OverlayView>
  );
}
