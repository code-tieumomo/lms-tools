<template>
  <div>
    <h1 class="text-4xl">Lớp học</h1>

    <Transition name="slide-right" mode="out-in">
      <div v-if="isFetchingClasses" class="mt-4">
        <Loading1></Loading1>
      </div>
      <div v-else class="flex flex-col gap-4 mt-8">
        <n-grid
          v-if="classes.length > 0"
          :x-gap="12"
          :y-gap="8"
          cols="1 400:2 600:3 800:4 1200:5 1400:6"
        >
          <n-grid-item v-for="item in classes" :key="item.id">
            <component
              is="router-link"
              :to="{ name: 'class', params: { id: item.id }, title: item.name }"
            >
              <n-card
                :class="item.status === 'FINISHED' ? 'opacity-70' : ''"
                hoverable
              >
                <template #header>
                  <div class="flex items-center gap-2">
                    <ClassLogo
                      :image="item.course.shortName"
                      class="w-5 h-5"
                    ></ClassLogo>
                    <span class="text-sm">{{ item.name }}</span>
                  </div>
                </template>
                <ul>
                  <li>
                    <n-tag
                      size="small"
                      :bordered="false"
                      :type="item.status === 'FINISHED' ? 'error' : 'success'"
                    >
                      {{
                        item.status === "FINISHED"
                          ? "Đã kết thúc"
                          : "Đang hoạt động"
                      }}
                    </n-tag>
                  </li>
                  <li class="mt-4 truncate">{{ item.course.name }}</li>
                  <li
                    class="flex items-center gap-1 font-semibold text-gray-600"
                  >
                    <svg
                      class="w-4 h-4 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 384 512"
                    >
                      <path
                        d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                      />
                    </svg>
                    <div class="truncate">{{ item.centre.name }}</div>
                  </li>
                </ul>
              </n-card>
            </component>
          </n-grid-item>
        </n-grid>
        <n-empty
          size="large"
          description="Hiện không có lớp học nào"
          v-else
        ></n-empty>
      </div>
    </Transition>
  </div>
</template>

<script>
import ClassLogo from "../components/images/ClassLogo.vue";
import Loading1 from "../components/loader/Loading1.vue";
import { apiClient } from "../services/axios";
import { useMessage } from "naive-ui";

export default {
  name: "ClassesView",
  components: {
    Loading1,
    ClassLogo,
  },
  data() {
    return {
      isFetchingClasses: true,
      classes: [],
    };
  },
  created() {
    this.fetchClasses();
  },
  methods: {
    async fetchClasses() {
      this.isFetchingClasses = true;
      apiClient
        .get("/api/classes?page=1&number=100")
        .then((res) => {
          this.classes = res.data;
        })
        .catch((err) => {
          this.messageRef.warning(err.data.error, {duration: 1000});
        })
        .finally(() => {
          this.isFetchingClasses = false;
        });
    },
  },
  setup() {
    const messageRef = useMessage();

    return {
      messageRef,
    };
  },
};
</script>

<style scoped>
.n-card {
  --n-title-font-size: 0.875rem;
}
</style>
