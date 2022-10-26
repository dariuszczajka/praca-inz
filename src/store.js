import { configureStore } from '@reduxjs/toolkit'
import { activeOfferSlice } from "./redux/activeOfferSlice";
import {mapDataSlice} from "./redux/mapDataSlice";

export const store = configureStore({
    reducer: {
        activeOffer: activeOfferSlice.reducer,
        mapData: mapDataSlice.reducer
    },
});