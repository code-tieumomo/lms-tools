<template>
  <section>
    <h1 class="text-4xl">Khóa học</h1>

    <Transition name="slide-right" mode="out-in">
      <div v-if="isFetchingCourses" class="mt-4">
        <Loading1></Loading1>
      </div>
    </Transition>
  </section>
</template>

<script>
import Loading1 from "@/components/loader/Loading1.vue";

export default {
  name: "CoursesView",
  components: { Loading1 },
  data() {
    return {
      isFetchingCourses: true,
      courses: []
    };
  }
};
</script>

<style scoped>

</style>