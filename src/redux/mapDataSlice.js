import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userLocation : [null, null],
    mapCurrentLatLon : [52.232558, 21.009974], // warszawa centralna
    mapCurrentZoomLvl: 13,
    mapDataUpdated: false
}

export const mapDataSlice = createSlice({
    name: 'mapDataSlice',
    initialState,
    reducers: {
        setUserLocation: (state, action) => {
            state.userLocation = action.payload;
            state.mapDataUpdated = true;
        },
        setMapCurrentLatLon: (state, action) => {
            state.mapCurrentLatLon = action.payload;
        },
        setMapCurrentZoomLvl: (state, action) => {
            state.mapCurrentZoomLvl = action.payload;
        },
    },
})

export const {setUserLocation, setMapCurrentLatLon, setMapCurrentZoomLvl} = mapDataSlice.actions;

export default mapDataSlice.reducer