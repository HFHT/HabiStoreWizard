import { geocodeAddressComponentsTypesType, geocodeType } from "../../services";
// Takes a Google Geocode object and a Geocode address component type, 
// returns the address component long_name associated with the address component type
export function getAddressComponent(geocode: geocodeType, type: geocodeAddressComponentsTypesType, long_name = true) {
    let retValue = ''
    geocode.results.length > 0 && geocode.results[0].address_components.forEach((geo) => {
        if (geo.types.includes(type)) retValue = long_name ? geo.long_name : geo.short_name
    })
    return retValue

}
