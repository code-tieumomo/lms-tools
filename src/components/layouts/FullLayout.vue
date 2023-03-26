<template>
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script>
import { useLoadingBar } from "naive-ui";
import { loadingBarApiRef } from "@/router";

export default {
    name: "FullLayout",
    setup() {
        const loadingBar = useLoadingBar();

        return {
            loadingBar
        };
    },
    mounted() {
        loadingBarApiRef.value = this.loadingBar;
        this.loadingBar.finish();
    }
};
</script>

<style scoped></style>
