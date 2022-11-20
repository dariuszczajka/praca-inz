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

export const currentSiteControllerSlice = createSlice({
    name: 'currentSiteController',
    initialState,
    reducers: {
        setCurrentSite: (state, action) => {
            state.currentSite = action.payload;
        }
    },
})

export const {setCurrentSite} = currentSiteControllerSlice.actions;

export default currentSiteControllerSlice.reducer