import { createSlice } from "@reduxjs/toolkit";

const initialState = { loginEmail: '', isLoggedIn: false, toggle: '' }

const authDetailSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        email(state, action) {
            state.loginEmail = action.payload
            console.log(this.loginEmail);

        },

        logIn(state, action) {
            state.isLoggedIn = true;
        },

        // toggleButtons() {

        // }

    }
})

export default authDetailSlice
export const authDetailSliceAction = authDetailSlice.actions