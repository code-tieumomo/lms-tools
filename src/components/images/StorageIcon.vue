<script>

export default {
  name: "StorageIcon",
  props: {
    mimeType: {
      type: String,
      default: "application/vnd.google-apps.file",
      required: true
    }
  },
  computed: {
    imageSrc() {
      switch (this.mimeType) {
        case "application/vnd.google-apps.folder":
          return "https://img.icons8.com/color/100/folder-invoices--v1.png";

        default:
          return "https://img.icons8.com/color/100/file.png";
      }
    }
  }
};
</script>

<template>
  <img :src="imageSrc" alt="Class logo" class="object-cover">
</template>

<style scoped>

</style>