import React, {useEffect} from "react";
import {useMap } from "react-leaflet";
import {setCreatedOfferLocation} from "../redux/createdOfferSlice";
import {useDispatch, useSelector} from "react-redux";
import * as L from "leaflet";

export default function MapController(props) {
    const activeOffer = useSelector(state => state.activeOffer);
    const createdOffer = useSelector(state => state.createdOffer);
    const currentSiteController = useSelector(state => state.currentSiteController);
    const mapData = useSelector(state => state.mapData);
    const dispatch = useDispatch();
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        map.on('click', (e) => {
            //if(currentSiteController.currentSite === currentSiteController.availableSites.AddListing){
                let location = {
                    lon: e.latlng.lng,
                    lat: e.latlng.lat
                }
                dispatch(setCreatedOfferLocation(location));
                console.log(createdOffer.createdOfferLocation);
            //}
        })
    }, [map])

    useEffect(() => {
        if(!props.activeOffer.isEmpty)
            map.flyTo([props.activeOffer.activeOffer.lat, props.activeOffer.activeOffer.lon]);
    }, [activeOffer.isEmpty]);

    useEffect(() => {
        if(mapData.mapDataUpdated)
            map.setView(mapData.userLocation);
            //L.marker(mapData.userLocation).addTo(map);
    }, [mapData.mapDataUpdated]);
    return (
        <div style={{ display: "none" }}>
        </div>
    );
}
