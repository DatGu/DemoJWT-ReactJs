import axios from "axios";
import {
    logOutFail,
    logOutStart,
    logOutSuccess,
    loginFail,
    loginStart,
    loginSuccess,
    registerFail,
    registerStart,
    registerSuccess,
} from "./authSlice";
import {
    getAllUserFail,
    getAllUserStart,
    getAllUserSuccess,
    deleteUserFail,
    deleteUserSuccess,
    deleteUserStart,
    resetMsg,
} from "./userSlice";

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("/api/login", user);
        dispatch(loginSuccess(res.data));
        dispatch(resetMsg());
        navigate("/");
    } catch (err) {
        dispatch(loginFail());
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const res = await axios.post("/api/register", user);
        dispatch(registerSuccess());
        navigate("/login");
    } catch (err) {
        dispatch(registerFail());
    }
};

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getAllUserStart());
    try {
        const res = await axiosJWT.get("/api/get-all-user", {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(getAllUserSuccess(res.data));
    } catch (err) {
        dispatch(getAllUserFail());
    }
};

export const deleteUser = async (id, accessToken, dispatch, axiosJWT) => {
    dispatch(deleteUserStart());
    try {
        const res = await axiosJWT.delete("/api/detete-fake-user?id=" + id, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(deleteUserSuccess(res.data));
    } catch (err) {
        dispatch(deleteUserFail(err.response?.data));
    }
};

export const logOutUser = async (accessToken, dispatch, navigate, axiosJWT) => {
    dispatch(logOutStart());
    try {
        let token = `Bearer ${accessToken}`;
        await axiosJWT.post(
            "/api/logout",
            {},
            {
                headers: { token: token },
            }
        );
        dispatch(logOutSuccess());
        navigate("/login");
    } catch (err) {
        dispatch(logOutFail());
    }
};
