<template>
  <n-menu
    :options="menuOptions"
    :root-indent="16"
    :indent="0"
    :value="selectedKey"
    @update:value="setSelectedKey"
    :collapsed="collapsed"
    :collapsed-width="64"
  ></n-menu>
</template>

<script>
import { h } from "vue";
import { RouterLink } from "vue-router";

function renderIcon(path, viewBox = "0 0 576 512") {
  return () =>
    h("svg", {
      innerHTML: path,
      class: "w-4 h-4 text-gray-600",
      fill: "currentColor",
      viewBox
    });
}

export default {
  name: "Sidebar",
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      menuOptions: [
        {
          type: "group",
          label: "LMS",
          key: "lms",
          children: [
            {
              label: () =>
                h(
                  RouterLink,
                  {
                    to: {
                      name: "home"
                    }
                  },
                  { default: () => "Trang chủ" }
                ),
              key: "home",
              icon: renderIcon(
                `<path d="M543.8 287.6c17 0 32-14 32-32.1c1-9-3-17-11-24L309.5 7c-6-5-14-7-21-7s-15 1-22 8L10 231.5c-7 7-10 15-10 24c0 18 14 32.1 32 32.1h32V448c0 35.3 28.7 64 64 64H230.4l-31.3-52.2c-4.1-6.8-2.6-15.5 3.5-20.5L288 368l-60.2-82.8c-10.9-15 8.2-33.5 22.8-22l117.9 92.6c8 6.3 8.2 18.4 .4 24.9L288 448l38.4 64H448.5c35.5 0 64.2-28.8 64-64.3l-.7-160.2h32z"/>`
              )
            },
            {
              label: () =>
                h(
                  RouterLink,
                  {
                    to: {
                      name: "classes"
                    }
                  },
                  { default: () => "Lớp học" }
                ),
              key: "classes",
              icon: renderIcon(
                `<path d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9v28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5V291.9c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z"/>`,
                "0 0 640 512"
              )
            },
            {
              label: () =>
                h(
                  RouterLink,
                  {
                    to: {
                      name: "courses"
                    }
                  },
                  { default: () => "Khóa học" }
                ),
              key: "courses",
              icon: renderIcon(
                `<path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"/>`,
                "0 0 512 512"
              )
            }
          ]
        }
      ],
      selectedKey: ""
    };
  },
  computed() {

  },
  methods: {
    setSelectedKey(key) {
      this.selectedKey = key;
    }
  },
  watch: {
    $route(to) {
      this.setSelectedKey(to.meta.sidebarKey);
    }
  },
  created() {
    this.setSelectedKey(this.$route.meta.sidebarKey);
  }
};
</script>
