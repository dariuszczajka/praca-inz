import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeOffer: null,
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
            state.activeOffer = null;
            state.isEmpty = true;
        },
    },
})

export const {setActiveOffer, removeActiveOffer} = activeOfferSlice.actions;

export default activeOfferSlice.reducer