import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeFilters: {},
    isEmpty: true
}

export const filterSlice = createSlice({
    name: 'filterSlice',
    initialState,
    reducers: {
        setActiveFilters: (state, action) => {
            state.activeFilters = action.payload;
            state.isEmpty = false;
        },
        removeActiveFilters: (state) => {
            state.activeFilters = {};
            state.isEmpty = true;
        },
    },
})

export const {setActiveFilters, removeActiveFilters} = filterSlice.actions;

export default filterSlice.reducer