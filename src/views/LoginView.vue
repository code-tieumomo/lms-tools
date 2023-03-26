<template>
    <div class="flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
            <div>
                <img class="w-auto h-12 mx-auto" src="https://img.icons8.com/fluency/48/null/cash-on-delivery.png"
                    alt="Your Company" />
                <h2 class="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
                    Đăng nhập tài khoản LMS
                </h2>
            </div>
            <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
                <input type="hidden" name="remember" value="true" />
                <div class="-space-y-px rounded-md shadow-sm">
                    <div>
                        <label for="email-address" class="sr-only">Email</label>
                        <input id="email-address" v-model="email" type="email" autocomplete="email"
                            class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-600 border border-gray-300 rounded-none appearance-none rounded-t-md focus:z-10 focus:border-green-600 focus:outline-none focus:ring-green-600 focus:ring-1 sm:text-sm"
                            placeholder="Email" />
                    </div>
                    <div>
                        <label for="password" class="sr-only">Mật khẩu</label>
                        <input id="password" v-model="password" type="password" autocomplete="current-password"
                            class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-600 border border-gray-300 rounded-none appearance-none rounded-b-md focus:z-10 focus:border-green-600 focus:outline-none focus:ring-green-600 focus:ring-1 sm:text-sm"
                            placeholder="Mật khẩu" />
                    </div>
                </div>

                <div>
                    <button type="submit" :disabled="loggingIn"
                        class="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md group hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg class="w-5 h-5 text-green-600 group-hover:text-green-400"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                                    clip-rule="evenodd" />
                            </svg>
                        </span>
                        <svg v-if="loggingIn" class="w-5 h-5 animate-spin" fill="currentColor" viewBox="0 0 512 512">
                            <path
                                d="M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7 18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 75 75s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z" />
                        </svg>
                        <span v-else>Đăng nhập</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { apiClient } from "@/services/axios.js";
import { useMessage } from "naive-ui";
import { mapActions, mapState } from "pinia";
import { useCounterStore } from "../stores/counter";

export default {
    name: "LoginView",
    setup() {
        const message = useMessage();

        return {
            message
        };
    },
    data() {
        return {
            email: "",
            password: "",
            loggingIn: false
        };
    },
    methods: {
        ...mapActions(useCounterStore, ["setAuth"]),
        handleSubmit() {
            this.loggingIn = true;

            if (this.email === "" || this.password === "") {
                this.message.error("Vui lòng nhập đầy đủ thông tin");
                this.loggingIn = false;
                return;
            }

            apiClient.get('/sanctum/csrf-cookie').then(response => {
                apiClient.post('/api/login', {
                    email: this.email,
                    password: this.password
                }).then(response => {
                    this.setAuth({
                        user: response.data,
                        isAuthenticated: true
                    });
                    const redirectName = this.$route.query.redirect;
                    this.$router.push({ name: redirectName ?? "home" });
                }).catch(error => {
                    console.log(error);
                    try {
                        switch (error.data.error.split(" ")[0]) {
                            case "INVALID_PASSWORD":
                                this.message.error("Mật khẩu không đúng");
                                break;

                            case "TOO_MANY_ATTEMPTS_TRY_LATER":
                                this.message.error("Bạn đã đăng nhập sai quá nhiều lần. Vui lòng thử lại sau.");
                                break;

                            default:
                                this.message.error("Đã có lỗi xảy ra! Vui lòng thử lại sau.");
                                break;
                        }
                    } catch (error) {
                        this.message.error("Đã có lỗi xảy ra! Vui lòng thử lại sau.");
                    }
                }).finally(() => {
                    this.loggingIn = false;
                });
            });
        }
    }
};
</script>
