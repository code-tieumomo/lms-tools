<template>
    <n-config-provider>
        <div v-if="isFirstTimeLoading" class="flex items-center justify-center w-screen h-screen bg-white">
            <div aria-label="Loading..." role="status" class="flex items-center space-x-2">
                <svg class="w-6 h-6 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                    <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="24">
                    </line>
                    <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="24"></line>
                    <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="24">
                    </line>
                    <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="24"></line>
                    <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="24">
                    </line>
                    <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="24"></line>
                    <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="24">
                    </line>
                    <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="24"></line>
                </svg>
                <span class="text-xs font-medium text-gray-500">Đang tải...</span>
            </div>
        </div>
        <n-loading-bar-provider v-else>
            <n-message-provider>
                <n-notification-provider>
                    <n-dialog-provider>
                        <component :is="layout" />
                    </n-dialog-provider>
                </n-notification-provider>
            </n-message-provider>
        </n-loading-bar-provider>
    </n-config-provider>
</template>

<script>
import DefaultLayout from "@/components/layouts/DefaultLayout.vue";
import FullLayout from "@/components/layouts/FullLayout.vue";
import { mapState } from "pinia";
import { useCounterStore } from "@/stores/counter";

export default {
    name: "App",
    components: {
        DefaultLayout,
        FullLayout
    },
    computed: {
        ...mapState(useCounterStore, ["isFirstTimeLoading"]),
        layout() {
            return `${this.$route.meta.layout}-layout`;
        }
    }
};
</script>

<style>
/* Routing transitions */
.fade-enter-active,
.fade-leave-active {
    transition: all 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}</style>
