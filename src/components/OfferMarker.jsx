import React from "react";
import { Marker, useMap } from "react-leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import {setActiveOffer} from "../redux/activeOfferSlice";
import {setMapCurrentLatLon, setMapCurrentZoomLvl} from "../redux/mapDataSlice";
import {useDispatch, useSelector} from "react-redux";
import L from "leaflet";

export default function OfferMarker(props) {
    const map = useMap();

    const activeOffer = useSelector(state => state.activeOffer);
    const mapData = useSelector(state => state.mapData);
    const dispatch = useDispatch();

    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });
    L.Marker.prototype.options.icon = DefaultIcon;
    return (
        <div>
            <Marker
                position={props.position}
                eventHandlers={{
                    click: (e) => {
                        dispatch(setActiveOffer(props.offer));
                        dispatch(setMapCurrentLatLon([activeOffer.activeOffer.lat, activeOffer.activeOffer.lon]));
                        dispatch(setMapCurrentZoomLvl(16));
                        map.flyTo(props.position);
                    },
                }}
            ></Marker>
        </div>
    );
}