<template>
  <img :src="imageSrc" alt="Class logo" class="object-cover">
</template>

<script>
export default {
  name: "ClassLogo",
  props: {
    image: {
      type: String,
      required: true,
      default: 'JS'
    }
  },
  computed: {
    imageSrc() {
      switch (this.image) {
        case "JSB":
        case "JSA":
        case "JSI":
        case "1:1 JSA":
        case "1:1 JSB":
        case "ONL-JSI":
        case "ONL-JSA":
          return "https://cdn-icons-png.flaticon.com/512/5968/5968292.png";

        case "C4K-MB":
        case "C4K-MI":
        case "C4K-MA":
          return "https://cdn-icons-png.flaticon.com/512/2504/2504881.png";

        case "C4K-GB":
        case "C4K-GA":
        case "ONL-C4K-GB":
        case "C4K-GI":
        case "ONL-C4K-GI":
          return "https://cdn-icons-png.flaticon.com/512/141/141073.png";

        case "ONL-CSB":
        case "PTB":
          return "https://cdn-icons-png.flaticon.com/512/5968/5968350.png";

        default:
          return "https://cdn-icons-png.flaticon.com/512/4248/4248402.png";
      }
    }
  },
}
</script>