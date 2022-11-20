import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    availableSites: {
        AllOffers: 'AllOffers',
        MaximizedOffer: 'MaximizedOffer',
        UserSettings: 'UserSettings',
        AddListing: 'AddListing'
    },
    currentSite: 'AllOffers'
}

export const currentSiteController = createSlice({
    name: 'currentSiteController',
    initialState,
    reducers: {
        setCurrentSite: (state, action) => {
            state.currentSite = action.payload;
        }
    },
})

export const {setCurrentSite} = currentSiteController.actions;

export default currentSiteController.reducer