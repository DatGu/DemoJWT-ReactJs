import { createSlice } from "@reduxjs/toolkit";
import { resetMsg } from "./userSlice";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            error: false,
            isFetching: false,
        },
        register: {
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.currentUser = action.payload;
            state.login.isFetching = false;
        },
        loginFail: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.success = true;
        },
        registerFail: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
        },
        logOutStart: (state) => {
            state.login.isFetching = true;
        },
        logOutSuccess: (state, action) => {
            state.login.currentUser = null;
            state.login.isFetching = false;
        },
        logOutFail: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFail,
    registerStart,
    registerSuccess,
    registerFail,
    logOutFail,
    logOutSuccess,
    logOutStart,
} = authSlice.actions;

export default authSlice.reducer;
