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
                case "ONL-JSI":
                case "ONL-JSA":
                    return "https://img.icons8.com/color/100/null/javascript--v1.png";

                case "C4K-MB":
                case "C4K-MI":
                case "C4K-MA":
                    return "https://img.icons8.com/fluency/100/null/android-os.png";

                case "C4K-GB":
                    return "https://img.icons8.com/emoji/100/null/video-game-emoji.png";

                case "ONL-CSB":
                    return "https://img.icons8.com/color/48/null/python--v1.png";

                default:
                    return "https://img.icons8.com/color/48/null/source-code.png";
            }
        }
    },
}
</script>