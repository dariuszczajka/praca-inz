import React, {useEffect} from "react";
import {useMap } from "react-leaflet";
import {setCreatedOfferLocation} from "../redux/createdOfferSlice";
import {useDispatch, useSelector} from "react-redux";
import * as L from "leaflet";
import {setActiveFilters, setUserMapCoordinates} from "../redux/filterSlice";

export default function MapController(props) {
    const activeOffer = useSelector(state => state.activeOffer);
    const createdOffer = useSelector(state => state.createdOffer);
    const currentSiteController = useSelector(state => state.currentSiteController);
    const filters = useSelector(state => state.filters);
    const mapData = useSelector(state => state.mapData);
    const dispatch = useDispatch();
    const map = useMap();

    map.scrollWheelZoom.enable();

    useEffect(() => {
        if (!map) return;

        map.on("dragend", setRentacle);

        map.on("zoomend", setRentacle);

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

    document.addEventListener("DOMContentLoaded", function () {
        const bounds = map.getBounds();
        updateInfo(bounds._northEast, bounds._southWest);
    });

    function updateInfo(north, south) {
            dispatch(setUserMapCoordinates({
                southwest: north.lat + ',' +north.lng,
                northeast: south.lat + ',' +south.lng
            }))
    }

// set rentacle function
    function setRentacle() {
        const bounds = map.getBounds();
        updateInfo(bounds._northEast, bounds._southWest);
        map.fitBounds(bounds);
    }

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
