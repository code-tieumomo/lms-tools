<script>
import Loading1 from "@/components/loader/Loading1.vue";
import { apiClient } from "@/services/axios.js";
import { useMessage } from "naive-ui";
import StorageIcon from "@/components/images/StorageIcon.vue";

export default {
  name: "StoragesView",
  components: { StorageIcon, Loading1 },
  data() {
    return {
      isFetchingStorages: true,
      files: [],
      singleFiles: [],
      folders: []
    };
  },
  setup() {
    const messageRef = useMessage();

    return {
      messageRef
    };
  },
  created() {
    this.fetchStorages();
  },
  methods: {
    fetchStorages() {
      this.isFetchingStorages = true;
      apiClient.get("/api/storages")
        .then((res) => {
          this.files = res.data.data[0];
          this.handleFiles(this.files);
        })
        .catch((err) => {
          this.messageRef.warning(err.data.error ?? err.data.message, { duration: 5000 });
        })
        .finally(() => {
          this.isFetchingStorages = false;
        });
    },
    handleFiles(files) {
      files.forEach((file) => {
        if (file.mimeType === "application/vnd.google-apps.folder") {
          this.folders.push(file);
        } else {
          this.singleFiles.push(file);
        }
      });
    },
    handleErrorImage($event) {
      $event.target.src = "https://ouch-cdn2.icons8.com/NcYZVRt92jVgk6H6GX3K0_-oMDYK-Gfg7PqStpTwTIk/rs:fit:256:256/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMjkz/LzVmNGU2MTNiLTdh/YTEtNDNlZC05MWNi/LTAyZjc1YjBlZDFh/OC5zdmc.png";
      $event.target.classList.remove("object-cover");
      $event.target.classList.add("object-contain");
    }
  }
};
</script>

<template>
  <div>
    <h1 class="text-4xl">Kho lưu trữ</h1>

    <n-alert title="Lưu ý" type="warning" class="mt-4">
      Chưa có nhiều storage để lưu trữ nhiều loại file khác nhau (không muốn thêm kinh phí), các thao tác cũng chưa được
      kiểm tra authorization (không có thời gian làm) nên khi thao tác cần cẩn thận tránh nhầm file, mất file ngoài ý
      muốn.
    </n-alert>

    <div class="mt-8 flex gap-2 items-center">
      <img src="https://img.icons8.com/fluency/100/google-drive--v2.png" class="w-8 h-8" alt="google-drive--v2"/>
      <span class="text-xl">Google Drive</span>
    </div>

    <div class="mt-4">
      <Transition name="slide-right" mode="out-in">
        <div v-if="isFetchingStorages">
          <Loading1></Loading1>
        </div>
        <div v-else>
          <n-empty description="Không có file nào được tìm thấy trong kho lưu trữ" v-if="files.length === 0">
            <template #extra>
              <n-button size="small" @click="this.$router.go()">
                Tải lại
              </n-button>
            </template>
          </n-empty>
          <div v-else>
            <h3 class="font-bold">Folders</h3>
            <n-grid
              v-if="folders.length > 0"
              :x-gap="12"
              :y-gap="8"
              cols="1 400:2 600:3 800:4 1200:5 1400:6"
              class="mt-1"
            >
              <n-gi v-for="folder in folders" :key="folder.id">
                <a
                  :href="folder.webViewLink"
                  target="_blank"
                  class="flex items-center gap-2 border border-gray-200 rounded px-3 py-2 font-semibold hover:border-emerald-600 hover:text-emerald-700"
                >
                  <StorageIcon :mime-type="folder.mimeType" class="w-6 h-6"></StorageIcon>
                  <span class="max-w-[calc(100%-1.75rem)] truncate">{{ folder.name }}</span>
                </a>
              </n-gi>
            </n-grid>

            <h3 class="font-bold mt-4">Files</h3>
            <n-grid
              v-if="singleFiles.length > 0"
              :x-gap="12"
              :y-gap="8"
              cols="1 400:2 600:3 800:4 1200:5 1400:6"
              class="mt-1"
            >
              <n-gi v-for="file in singleFiles" :key="file.id">
                <a
                  :href="file.webViewLink"
                  target="_blank"
                  class="flex flex-col border border-gray-200 rounded px-3 py-2 "
                >
                  <div class="flex items-center gap-2 font-semibold hover:border-emerald-600 hover:text-emerald-700">
                    <StorageIcon :mime-type="file.mimeType" class="w-6 h-6"></StorageIcon>
                    <span class="max-w-[calc(100%-1.75rem)] truncate shrink-0">{{ file.name }}</span>
                  </div>
                  <img v-lazy="`https://drive.google.com/thumbnail?sz=w200&id=${file.id}`"
                       class="h-64 object-cover mt-4" alt="..." @error="handleErrorImage">
                </a>
              </n-gi>
            </n-grid>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>

</style>