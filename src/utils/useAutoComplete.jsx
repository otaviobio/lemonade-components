import { useMemo } from "react";

export function useAutoComplete() {
  const AutoCompleteService = useMemo(
    () => new window.google.maps.places.AutocompleteService(),
    []
  );

  const Gecoder = useMemo(() => new window.google.maps.Geocoder(), []);

  async function callAutoComplete(query) {
    if (query === '') return;
    const { predictions } = await AutoCompleteService.getPlacePredictions({
      input: query,
      region: 'ca',
    })
    return predictions
  }

  async function createGeoCoordinates(place_id) {
    const { results } = await Gecoder.geocode({
      placeId: place_id,
    })
    return {
      location: results[0].geometry.location,
      address: results[0].formatted_address.split(',')[0]
    }
  }

  return {
    callAutoComplete,
    createGeoCoordinates
  }
}