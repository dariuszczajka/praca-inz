import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loggedUser: {},
    isLoggedIn: false
}

export const loggedUserSlice = createSlice({
    name: 'loggedUserSlice',
    initialState,
    reducers: {
        logUser: (state, action) => {
            state.loggedUser = action.payload;
            //TODO: implement avatar feature
            state.isLoggedIn = true;
        },
        logoutUser: (state) => {
            state.loggedUser = {};
            state.isLoggedIn = false;
        },
    },
})

export const {logUser, logoutUser} = loggedUserSlice.actions;

export default loggedUserSlice.reducer