import { configureStore } from '@reduxjs/toolkit'
import { activeOfferSlice } from "./redux/activeOfferSlice";
import {mapDataSlice} from "./redux/mapDataSlice";
import {allOffersSlice} from "./redux/allOffersSlice";

export const store = configureStore({
    reducer: {
        activeOffer: activeOfferSlice.reducer,
        mapData: mapDataSlice.reducer,
        allOffers: allOffersSlice.reducer
    },
});