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
            state.isLogin = true;
            state.userData = action.payload;
        },
        signup: (state, action) => {
            state.isLogin = true;
            state.userData = action.payload;
        },
        logout: (state, action) => {
            state.isLogin = false;
            state.userData = null;
        }
    }
})

export const {login, signup, logout} = authSlice.actions;

export default authSlice.reducer;
