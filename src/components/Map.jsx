import { MapContainer, TileLayer, useMap, Marker, Popup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import {useDispatch, useSelector} from "react-redux";
import {setActiveOffer} from "../redux/activeOfferSlice";
import {setMapCurrentLatLon, setMapCurrentZoomLvl, setUserLocation} from "../redux/mapDataSlice";
import OfferMarker from "./OfferMarker";
import MapController from "./MapController";

const Map = (props) => {

    let data = [
        {
            "id": "1",
            "name": "pies",
            "desc": "pies",
            "price": 200,
            "img": "http://www.telekarma.pl/userfiles/images/aktualnosci/305464337-760x500.jpg",
            "lat": 52.230016,
            "lon": 21.011240
        },
        {
            "id": "2",
            "name": "pies2",
            "desc": "pies2",
            "price": 150,
            "img": "https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_3x2.jpg",
            "lat": 52.231902,
            "lon": 21.011970
        },
        {
            "id": "3",
            "name": "daewoo lanos",
            "desc": "super fura polecam",
            "price": 1000,
            "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Daewoo_Lanos_3-door_front.JPG/1200px-Daewoo_Lanos_3-door_front.JPG",
            "lat": 52.232786,
            "lon": 21.007275
        }
    ];
    const activeOffer = useSelector(state => state.activeOffer);
    const mapData = useSelector(state => state.mapData);
    const dispatch = useDispatch();

    //const [position, setPosition] = useState([52.232558, 21.009974]);

    navigator.geolocation.getCurrentPosition(function(position) {
        //setPosition([position.coords.latitude, position.coords.longitude]);
        dispatch(setUserLocation([position.coords.latitude, position.coords.longitude]))
    });


    return(
        <MapContainer id="map" style={{ height: "100vh" }}  center={mapData.mapCurrentLatLon} zoom={mapData.mapCurrentZoomLvl} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapController activeOffer={activeOffer}/>
            {data.map(offer => (
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