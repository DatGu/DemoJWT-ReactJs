import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        allUsers: {
            allUsers: null,
            error: false,
            isFetching: false,
        },
        msg: "",
    },
    reducers: {
        getAllUserStart: (state) => {
            state.allUsers.isFetching = true;
        },
        getAllUserSuccess: (state, action) => {
            state.allUsers.allUsers = action.payload;
            state.allUsers.isFetching = false;
        },
        getAllUserFail: (state) => {
            state.allUsers.isFetching = false;
            state.allUsers.error = true;
        },
        deleteUserStart: (state) => {
            state.allUsers.isFetching = true;
        },
        deleteUserSuccess: (state, action) => {
            state.allUsers.isFetching = false;
            state.msg = action.payload;
        },
        deleteUserFail: (state, action) => {
            state.allUsers.isFetching = false;
            state.allUsers.error = true;
            state.msg = action.payload;
        },
        resetMsg: (state) => {
            state.msg = "";
        },
    },
});

export const {
    getAllUserStart,
    getAllUserSuccess,
    getAllUserFail,
    deleteUserFail,
    deleteUserSuccess,
    deleteUserStart,
    resetMsg,
} = userSlice.actions;

export default userSlice.reducer;
