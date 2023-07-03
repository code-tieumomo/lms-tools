<template>
  <div
    class="flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8 relative"
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <img
          class="w-auto h-12 mx-auto"
          src="https://img.icons8.com/fluency/48/null/cash-on-delivery.png"
          alt="Your Company"
        />
        <h2
          class="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900"
        >
          Đăng nhập tài khoản
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <input type="hidden" name="remember" value="true"/>
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="email-address" class="sr-only">Email</label>
            <input
              id="email-address"
              v-model="email"
              type="email"
              autocomplete="email"
              class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-600 border border-gray-300 rounded-none appearance-none rounded-t-md focus:z-10 focus:border-green-600 focus:outline-none focus:ring-green-600 focus:ring-1 sm:text-sm"
              placeholder="Email"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Mật khẩu</label>
            <input
              id="password"
              v-model="password"
              type="password"
              autocomplete="current-password"
              class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-600 border border-gray-300 rounded-none appearance-none rounded-b-md focus:z-10 focus:border-green-600 focus:outline-none focus:ring-green-600 focus:ring-1 sm:text-sm"
              placeholder="Mật khẩu"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loggingIn"
            class="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md group hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
          >
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                class="w-5 h-5 text-green-600 group-hover:text-green-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <svg
              v-if="loggingIn"
              class="w-5 h-5 animate-spin"
              fill="currentColor"
              viewBox="0 0 512 512"
            >
              <path
                d="M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7 18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 75 75s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z"
              />
            </svg>
            <span v-else>Đăng nhập</span>
          </button>
        </div>
      </form>
    </div>

    <a
      :href="`${serverUrl}/`"
      target="_blank"
      v-tippy="{ content: 'Hướng dẫn sử dụng', placement: 'left' }"
      class="absolute top-4 right-4 flex items-center justify-center text-gray-400 hover:text-green-600"
    >
      <svg viewBox="0 0 512 512" class="w-4 h-4" fill="currentColor">
        <path
          d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
        />
      </svg>
    </a>
  </div>
</template>

<script>
import { apiClient } from "@/services/axios.js";
import { useMessage } from "naive-ui";
import { mapActions, mapState } from "pinia";
import { useCounterStore } from "../stores/counter";
import { directive } from "vue-tippy";

export default {
  name: "LoginView",
  directives: {
    tippy: directive
  },
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
      loggingIn: false,
      serverUrl: import.meta.env.VITE_SERVER_URL
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

      apiClient.get("/sanctum/csrf-cookie").then((response) => {
        apiClient
          .post("/api/login", {
            email: this.email,
            password: this.password
          })
          .then((response) => {
            this.setAuth({
              user: response.data,
              isAuthenticated: true
            });
            const redirectName = this.$route.query.redirect;
            this.$router.push({ name: redirectName ?? "home" });
          })
          .catch((error) => {
            try {
              switch (error.data.error.split(" ")[0]) {
                case "INVALID_PASSWORD":
                  this.message.error("Mật khẩu không đúng");
                  break;

                case "TOO_MANY_ATTEMPTS_TRY_LATER":
                  this.message.error(
                    "Bạn đã đăng nhập sai quá nhiều lần. Vui lòng thử lại sau."
                  );
                  break;

                default:
                  this.message.error(error.data.error ?? error.data.message);
                  break;
              }
            } catch (error) {
              console.log(error);
              this.message.error("Đã có lỗi xảy ra! Vui lòng thử lại sau.");
            }
          })
          .finally(() => {
            this.loggingIn = false;
          });
      });
    }
  }
};
</script>
