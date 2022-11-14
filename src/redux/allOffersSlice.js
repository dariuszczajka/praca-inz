import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    offers: [],
    isLoading: true
}

export const allOffersSlice = createSlice({
    name: 'allOffersSlice',
    initialState,
    reducers: {
        setOffers: (state, action) => {
            state.offers = action.payload;
            state.isLoading = false;
        },
        removeOffers: (state) => {
            state.offers = [];
            state.isLoading = true;
        },
    },
})

export const {setOffers, removeOffers} = allOffersSlice.actions;

export default allOffersSlice.reducer