import { configureStore } from "@reduxjs/toolkit";
import authReducer from './Slices/authSlice'

const store = configureStore({
    reducer: {
        authReducer,
    }
})

export default store;