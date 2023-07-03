<template>
  <Transition name="slide-right" mode="out-in">
    <div v-if="isFetchingClass">
      <Loading1></Loading1>
    </div>
    <div v-else>
      <div class="flex items-center gap-4">
        <ClassLogo :image="mindXClass.course?.shortName" class="w-12 h-12"></ClassLogo>
        <h1 class="text-4xl">{{ mindXClass.name }}</h1>
        <n-tag
          size="small"
          :bordered="false"
          :type="mindXClass.status === 'FINISHED' ? 'error' : 'success'"
        >
          {{ mindXClass.status === "FINISHED" ? "Đã kết thúc" : "Đang hoạt động" }}
        </n-tag>
      </div>

      <n-tag type="success" :bordered="false" size="large" class="mt-4 font-bold"
      >
        Buổi {{ this.currentSlotIndex + 1 }}
      </n-tag>

      <div class="flex mt-8">
        <div class="w-3/4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, assumenda consequuntur error incidunt sit
          voluptas voluptatibus? Aperiam assumenda cupiditate deleniti facilis ipsa, non officiis possimus quia quidem
          quo, veniam voluptates! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto beatae in labore
          laboriosam officia quaerat ut voluptatibus. Aspernatur atque commodi culpa dolor dolorem eum, natus nihil,
          recusandae, repudiandae rerum suscipit.
        </div>
        <n-divider vertical class="!min-h-full !h-[unset] !mx-6"></n-divider>
        <div class="w-1/4 flex flex-col gap-2 items-start">
          <n-button type="info">
            Điểm danh
          </n-button>

          <n-button type="success">
            Tài liệu
          </n-button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { apiClient } from "@/services/axios";
import ClassLogo from "@/components/images/ClassLogo.vue";
import Loading1 from "@/components/loader/Loading1.vue";

export default {
  name: "SlotView",
  components: {
    Loading1,
    ClassLogo
  },
  props: {
    id: {
      type: String,
      required: true
    },
    slotId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isFetchingClass: true,
      mindXClass: {},
      currentSlotIndex: 0,
      currentSlot: {},
      cacheMoment: null
    };
  },
  methods: {
    async fetchClass() {
      this.isFetchingClass = true;
      try {
        const res = await apiClient.get(`/api/classes/${this.id}`);
        this.mindXClass = res.data;
        console.log(this.mindXClass);
      } catch (err) {
        console.error(err);
      } finally {
        this.isFetchingClass = false;
      }
    }
  },
  created() {
    this.fetchClass().then(() => {
      this.currentSlotIndex = this.mindXClass.slots.findIndex((slot) => slot._id === this.slotId);
      this.currentSlot = this.mindXClass.slots[this.currentSlotIndex];
      document.title = `Buổi học ${this.currentSlotIndex} | ${this.mindXClass.name} - Daily`;
    });
  }
};
</script>
