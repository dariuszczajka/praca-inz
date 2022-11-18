import { configureStore } from '@reduxjs/toolkit'
import { activeOfferSlice } from "./redux/activeOfferSlice";
import {mapDataSlice} from "./redux/mapDataSlice";
import {allOffersSlice} from "./redux/allOffersSlice";
import {loggedUserSlice} from "./redux/loggedUserSlice";

export const store = configureStore({
    reducer: {
        activeOffer: activeOfferSlice.reducer,
        mapData: mapDataSlice.reducer,
        allOffers: allOffersSlice.reducer,
        loggedUser: loggedUserSlice.reducer
    },
});