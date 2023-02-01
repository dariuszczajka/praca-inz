import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import tileLayer from '../util/tileLayer';
import {useDispatch, useSelector} from "react-redux";
import {setActiveOffer} from "../redux/activeOfferSlice";
import {setMapCurrentLatLon, setMapCurrentZoomLvl, setUserLocation} from "../redux/mapDataSlice";
import OfferMarker from "./OfferMarker";
import {useEffect} from "react";
import MapController from "./MapController";
import L from 'leaflet';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

let center = [52.22977, 21.01178];

const MapWrapper = () => {
    const allOffers = useSelector(state => state.allOffers);
    const activeOffer = useSelector(state => state.activeOffer);
    const dispatch = useDispatch();

    navigator.geolocation.getCurrentPosition(function(position) {
        dispatch(setUserLocation([position.coords.latitude, position.coords.longitude]))
        center = [position.coords.latitude, position.coords.longitude];
    });

    function customMarkerIcon(color) {
        const svgTemplate = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker">
          <path fill-opacity=".25" d="M16 32s1.427-9.585 3.761-12.025c4.595-4.805 8.685-.99 8.685-.99s4.044 3.964-.526 8.743C25.514 30.245 16 32 16 32z"/>
          <path fill="#${color}" stroke="#fff" d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"/>
        </svg>`;

        return new L.DivIcon({
            className: "test",
            html: svgTemplate,
            iconSize: [40, 40],
            iconAnchor: [12, 24],
            popupAnchor: [7, -16],
        });
    }

    return (
        <MapContainer data-testid="map" className="flex h-[54.5rem] w-1/2 mt-16 fixed right-0" center={center} zoom={18} scrollWheelZoom={false}>
            <TileLayer {...tileLayer} />
            <MapController activeOffer={activeOffer}/>
            <MarkerClusterGroup>
            {allOffers.offers.map(offer => (
                <OfferMarker
                    key={offer.id}
                    offer={offer}
                    position={[
                        offer.lat,
                        offer.lon
                    ]}
                    eventHandlers={{
                        click: (e) => {
                            dispatch(setActiveOffer(offer));
                            dispatch(setMapCurrentLatLon([activeOffer.activeOffer.lat, activeOffer.activeOffer.lon]));
                            dispatch(setMapCurrentZoomLvl(16));
                        },
                    }}
                />
            ))}
           </MarkerClusterGroup>

        </MapContainer>
    )
}

export default MapWrapper;