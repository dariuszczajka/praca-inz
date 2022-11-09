import React, {useEffect} from "react";
import {useMap } from "react-leaflet";
import {useSelector} from "react-redux";

export default function MapController(props) {
    const activeOffer = useSelector(state => state.activeOffer);
    const map = useMap();
    useEffect(() => {
        if(!props.activeOffer.isEmpty)
            map.flyTo([props.activeOffer.activeOffer.lat, props.activeOffer.activeOffer.lon]);
    }, [activeOffer.isEmpty]);
    return (
        <div style={{ display: "none" }}>
        </div>
    );
}