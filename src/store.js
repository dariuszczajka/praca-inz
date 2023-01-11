import { configureStore } from '@reduxjs/toolkit'
import { activeOfferSlice } from "./redux/activeOfferSlice";
import {mapDataSlice} from "./redux/mapDataSlice";
import {allOffersSlice} from "./redux/allOffersSlice";
import {loggedUserSlice} from "./redux/loggedUserSlice";
import {currentSiteControllerSlice} from "./redux/currentSiteControllerSlice";
import {categoriesSlice} from "./redux/categoriesSlice";
import {createdOfferSlice} from "./redux/createdOfferSlice";
import {filterSlice} from "./redux/filterSlice";

export const store = configureStore({
    reducer: {
        activeOffer: activeOfferSlice.reducer,
        mapData: mapDataSlice.reducer,
        allOffers: allOffersSlice.reducer,
        loggedUser: loggedUserSlice.reducer,
        currentSiteController: currentSiteControllerSlice.reducer,
        categories: categoriesSlice.reducer,
        createdOffer: createdOfferSlice.reducer,
        filters: filterSlice.reducer,
    },
});