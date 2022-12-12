import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    createdOfferLocation: {},
    isEmpty: true
}

export const createdOfferSlice = createSlice({
    name: 'createdOfferSlice',
    initialState,
    reducers: {
        setCreatedOfferLocation: (state, action) => {
            state.createdOfferLocation = action.payload;
            state.isEmpty = false;
        },
        removeCreatedOfferLocation: (state) => {
            state.createdOfferLocation = {};
            state.isEmpty = true;
        },
    },
})

export const {setCreatedOfferLocation, removeCreatedOfferLocation} = createdOfferSlice.actions;

export default createdOfferSlice.reducer