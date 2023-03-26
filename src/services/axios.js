import axios from "axios";
import router from "../router";
import { useCounterStore } from "../stores/counter";

const baseurl = "http://api.lms-tools.io";

axios.defaults.withCredentials = true;

// API client with error handling
const apiClient = axios.create({
    baseURL: baseurl,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Access-Control-Allow-Origin": "*",
        crossDomain: true
    }
});
apiClient.interceptors.response.use(
    (response) => response,
    function (error) {
        if (error.response.status === 401 || error.response.status === 419) {
            const store = useCounterStore();
            store.logout().then(() => {
                router.push({ name: "login" });
            });
        }

        return Promise.reject(error.response);
    }
);

// API client without error handling
const apiClientWithoutErrorHandling = axios.create({
    baseURL: baseurl,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Access-Control-Allow-Origin": "*",
        crossDomain: true
    }
});

export { apiClient, apiClientWithoutErrorHandling };