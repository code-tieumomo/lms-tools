<template>
    <n-layout has-sider class="min-h-screen">
        <n-layout-header class="flex items-center justify-between p-4" bordered>
            <div class="flex items-center gap-2 font-semibold">
                <img src="https://img.icons8.com/fluency/48/null/cash-on-delivery.png" class="w-6 h-6" alt="Logo">
                quanph
            </div>
            <div class="flex items-center gap-2">
                <div class="flex flex-col items-start md:items-end">
                    <span class="max-w-xs text-sm font-semibold truncate">
                        {{ auth.user?.name ?? auth.user?.displayName ?? "---" }}
                    </span>
                    <span class="max-w-xs text-xs text-left truncate">{{ auth.user?.email }}</span>
                </div>
                <n-dropdown trigger="hover" :options="options" @select="handleSelect">
                    <img class="w-10 h-10 p-1 rounded-full cursor-pointer pointer-events-none ring-2 ring-gray-300 md:pointer-events-auto"
                        :src="`https://source.boringavatars.com/beam/120/${auth.user?.email}?colors=264653,f4a261,16a34a`"
                        alt="Bordered avatar">
                </n-dropdown>
            </div>
        </n-layout-header>
        <n-layout position="absolute" style="top:73px; bottom: 49px" has-sider>
            <n-layout-sider :native-scrollbar="false" collapse-mode="transform" :collapsed-width="20" :width="240"
                show-trigger="arrow-circle" content-style="padding: 24px;" bordered>
                <ul>
                    <li class="py-2">
                        <router-link to="/" class="flex items-center gap-2">
                            <svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                                <path
                                    d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                                <path
                                    d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                            </svg>
                            Trang chủ
                        </router-link>
                    </li>
                    <li class="py-2">
                        <router-link to="/classes" class="flex items-center gap-2">
                            <svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                                <path
                                    d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                                <path
                                    d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                                <path
                                    d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                            </svg>
                            Lớp học
                        </router-link>
                    </li>
                </ul>
            </n-layout-sider>
            <n-layout content-style="padding: 24px;" :native-scrollbar="false">
                <router-view v-slot="{ Component }">
                    <transition name="fade" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </n-layout>
        </n-layout>
        <n-layout-footer position="absolute" class="p-4" bordered>
            <div class="flex items-center gap-2 text-xs font-semibold">
                <img src="https://img.icons8.com/fluency/48/null/cash-on-delivery.png" class="w-4 h-4" alt="Logo">
                LMS Tools &copy; 2023
            </div>
        </n-layout-footer>
    </n-layout>
</template>

<script>
import { useLoadingBar } from "naive-ui";
import { loadingBarApiRef } from "@/router";
import { mapActions, mapState } from "pinia";
import { useCounterStore } from "@/stores/counter";

export default {
    name: "DefaultLayout",
    setup() {
        const loadingBar = useLoadingBar();
        return {
            loadingBar
        };
    },
    data() {
        return {
            options: [
                {
                    label: "Cá nhân",
                    key: "profile",
                    disabled: true
                },
                {
                    label: "Đăng xuất",
                    key: "logout"
                }
            ],
        };
    },
    computed: {
        ...mapState(useCounterStore, ["auth"])
    },
    methods: {
        ...mapActions(useCounterStore, ["logout"]),
        handleSelect(key) {
            if (key === "logout") {
                this.logout().then(() => {
                    this.$router.push({ name: "login" });
                });
            }
        }
    },
    mounted() {
        loadingBarApiRef.value = this.loadingBar;
        this.loadingBar.finish();
    }
};
</script>

<style scoped></style>
