import axios from "axios";

// export const ApiUrl = "https://pro.rezraf.com/shenid_api";
export const ApiUrl = window.location.origin.slice(0, -5) + ":5000";


const $api = axios.create({
    withCredentials: true,
    baseURL: ApiUrl,

})


$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    return config;
})
$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    // const originalRequests = error.config;
    // if (error.response.status === 401 && error.config && !error.config._isRetry) {
    //     originalRequests._isRetry = true;
    //     try {
    //         const response = await axios.get(`${ApiUrl}/refresh`, {withCredentials: true});
    //         localStorage.setItem('token', response.data.accessToken)
    //         return $api.request(originalRequests);
    //     }
    //     catch (e) {
    //         console.log("Не авторизован", e)
    //     }
    // }
    throw error;
})

export default $api;