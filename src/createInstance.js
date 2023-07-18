import axios from "axios";
import jwt_decode from "jwt-decode";

const refreshToken = async () => {
    try {
        const res = await axios.post("/api/refresh-token", {
            withCredentials: true,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const createAxios = (currentUser, dispath, stateSuccess) => {
    let axiosJWT = axios.create();
    axiosJWT.interceptors.request.use(
        async (config) => {
            const decodedToken = jwt_decode(currentUser?.accessToken);
            let date = new Date();
            if (decodedToken.exp < date.getTime() / 1000) {
                const newAccessToken = await refreshToken();
                const refreshUser = {
                    ...currentUser,
                    accessToken: newAccessToken.data,
                };
                dispath(stateSuccess(refreshUser));
                config.headers["token"] = "Bearer " + newAccessToken.data;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );
    return axiosJWT;
};
