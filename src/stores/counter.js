import { defineStore } from "pinia";
import { apiClient, apiClientWithoutErrorHandling } from "../services/axios";

export const useCounterStore = defineStore("counter", {
    state: () => ({
        auth: {
            user: null,
            isAuthenticated: false
        },
        isFirstTimeLoading: true
    }),
    actions: {
        fetchAuthenticatedUser() {
            return apiClientWithoutErrorHandling
                .get("/api/user")
                .then((response) => {
                    this.auth.user = response.data;
                    this.auth.isAuthenticated = response.data !== null;
                })
                .catch(() => {
                    this.auth.user = null;
                    this.auth.isAuthenticated = false;
                });
        },
        logout() {
            return apiClient.post("/api/logout").then(() => {
                this.auth.user = null;
                this.auth.isAuthenticated = false;
            });
        },
        setAuth(auth) {
            this.auth.user = auth.user;
            this.auth.isAuthenticated = auth.isAuthenticated;
        }
    }
});
