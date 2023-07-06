<template>
  <n-layout has-sider class="min-h-screen">
    <n-layout-header class="flex items-center justify-between p-4" bordered>
      <div class="flex items-center gap-2 font-semibold">
        <img
          src="https://img.icons8.com/fluency/48/null/cash-on-delivery.png"
          class="w-6 h-6"
          alt="Logo"
        />
        quanph
      </div>
      <div class="flex items-center gap-2">
        <div class="flex flex-col items-end">
          <span class="max-w-xs text-sm font-semibold truncate">
            {{ auth.user?.name ?? auth.user?.displayName ?? "---" }}
          </span>
          <span class="max-w-xs text-xs text-left truncate">{{
              auth.user?.email
            }}</span>
        </div>
        <n-dropdown trigger="hover" :options="options" @select="handleSelect">
          <img
            class="w-10 h-10 p-1 rounded-full cursor-pointer pointer-events-none ring-2 ring-gray-300 md:pointer-events-auto"
            :src="`https://source.boringavatars.com/beam/120/${auth.user?.email}?colors=264653,f4a261,16a34a`"
            alt="Bordered avatar"
          />
        </n-dropdown>
      </div>
    </n-layout-header>
    <n-layout position="absolute" style="top: 73px; bottom: 49px" has-sider> <!-- show-trigger="arrow-circle" -->
      <n-layout-sider
        :native-scrollbar="false"
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        bordered
        :collapsed="collapsed"
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <Sidebar :collapsed="collapsed"></Sidebar>
      </n-layout-sider>
      <n-layout content-style="padding: 24px;" :native-scrollbar="false">
        <router-view v-slot="{ Component }">
          <transition name="slide-right" mode="out-in" appear>
            <component :is="Component" class="max-w-7xl mx-auto"/>
          </transition>
        </router-view>
      </n-layout>
    </n-layout>
    <n-layout-footer position="absolute" class="p-4" bordered>
      <div class="flex items-center gap-2 text-xs font-semibold">
        <img
          src="https://img.icons8.com/fluency/48/null/cash-on-delivery.png"
          class="w-4 h-4"
          alt="Logo"
        />
        Daily &copy; 2023
      </div>
    </n-layout-footer>
  </n-layout>
</template>

<script>
import { useLoadingBar } from "naive-ui";
import { loadingBarApiRef } from "@/router";
import { mapActions, mapState } from "pinia";
import { useCounterStore } from "@/stores/counter";
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "DefaultLayout",
  components: {
    Sidebar
  },
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
      collapsed: true
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
