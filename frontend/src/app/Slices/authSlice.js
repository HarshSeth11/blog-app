import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: {
        isLogin: false,
        userData: null
    }
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLogin = action.payload.isLogin;
            state.userData = action.payload.userData;
        },
        signup: (state, action) => {},
        logout: (state, action) => {
            state.isLogin = false;
            state.userData = null;
        }
    }
})

export const {login, signup, logout} = authSlice.actions;

export default authSlice.reducer;
