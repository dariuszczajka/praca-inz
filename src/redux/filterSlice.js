import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filterCity: '',
    filterCategory: '',
    filterMinPrice: '',
    filterMaxPrice: '',
    q: '',
    filterOnlyLocal: false,
    userMapCoordinates: {},
    isEmpty: true
}

export const filterSlice = createSlice({
    name: 'filterSlice',
    initialState,
    reducers: {
        setFilterCity: (state, action) => {
            state.filterCity = action.payload;
            state.isEmpty = false;
        },
        setFilterCategory: (state, action) => {
            state.filterCategory = action.payload;
            state.isEmpty = false;
        },
        setFilterMinPrice: (state, action) => {
            state.filterMinPrice = action.payload;
            state.isEmpty = false;
        },
        setFilterMaxPrice: (state, action) => {
            state.filterMaxPrice = action.payload;
            state.isEmpty = false;
        },
        setFilterOnlyLocal: (state, action) => {
            state.filterOnlyLocal = action.payload;
            state.isEmpty = false;
        },
        setUserMapCoordinates: (state, action) => {
            state.userMapCoordinates = action.payload;
            state.isEmpty = false;
        },
        setSearchQuery: (state, action) => {
            state.q = action.payload;
            state.isEmpty = false;
        },
        removeActiveFilters: (state) => {
            state.filterCity = '';
            state.filterCategory = '';
            state.filterMinPrice = '';
            state.filterMaxPrice = '';
            state.filterOnlyLocal = false;
            state.isEmpty = true;
        },
    },
})

export const {setFilterCity,setFilterCategory,setFilterMinPrice, setFilterMaxPrice,setFilterOnlyLocal ,setUserMapCoordinates,setSearchQuery , removeActiveFilters} = filterSlice.actions;

export default filterSlice.reducer