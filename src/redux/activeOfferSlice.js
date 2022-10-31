import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeOffer: {},
    isEmpty: true
}

export const activeOfferSlice = createSlice({
    name: 'activeOfferSlice',
    initialState,
    reducers: {
        setActiveOffer: (state, action) => {
            state.activeOffer = action.payload;
            state.isEmpty = false;
        },
        removeActiveOffer: (state) => {
            state.activeOffer = {};
            state.isEmpty = true;
        },
    },
})

export const {setActiveOffer, removeActiveOffer} = activeOfferSlice.actions;

export default activeOfferSlice.reducer