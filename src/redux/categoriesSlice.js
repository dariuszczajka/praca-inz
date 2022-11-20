import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categories: [],
    isFetched: false
}

export const categoriesSlice = createSlice({
    name: 'categoriesSlice',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
            state.isFetched = true;
        },
        resetCategories: (state) => {
            state.offers = [];
            state.isLoading = false;
        }
    }
})

export const {setCategories, resetCategories} = categoriesSlice.actions;

export default categoriesSlice.reducer