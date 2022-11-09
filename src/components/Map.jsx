import { MapContainer, TileLayer, useMap, Marker, Popup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import {useDispatch, useSelector} from "react-redux";
import {setActiveOffer} from "../redux/activeOfferSlice";
import {setMapCurrentLatLon, setMapCurrentZoomLvl, setUserLocation} from "../redux/mapDataSlice";
import OfferMarker from "./OfferMarker";
import MapController from "./MapController";
import axios from 'axios'
import {setOffers} from "../redux/allOffersSlice";

const Map = () => {
    const activeOffer = useSelector(state => state.activeOffer);
    const mapData = useSelector(state => state.mapData);
    const allOffers = useSelector(state => state.allOffers);
    const dispatch = useDispatch();

    //const [position, setPosition] = useState([52.232558, 21.009974]);

    navigator.geolocation.getCurrentPosition(function(position) {
        //setPosition([position.coords.latitude, position.coords.longitude]);
        dispatch(setUserLocation([position.coords.latitude, position.coords.longitude]))
    });


    return(
            <MapContainer id="map" className="flex h-[32rem] w-1/2" center={mapData.mapCurrentLatLon} zoom={mapData.mapCurrentZoomLvl} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapController activeOffer={activeOffer}/>
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
                                //map.panTo([activeOffer.activeOffer.lat, activeOffer.activeOffer.lon]);
                            },
                        }}
                    />
                ))}
            </MapContainer>
    )
};
export default Map;