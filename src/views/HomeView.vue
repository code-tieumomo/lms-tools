<template>
    <div>
        <h1 class="text-4xl">Trang chủ</h1>

        <n-grid class="mt-4" x-gap="16" :cols="3">
            <n-gi :span="1">
                <n-card content-style="padding: 0;">
                    <div class="relative flex justify-between text-white bg-green-600 min-h-[5rem] pr-28 pl-4 pt-4 z-0">
                        <h2 class="font-bold">Welcome back!</h2>
                        <img src="@/assets/images/welcome.gif" alt="" class="absolute right-0 -bottom-5 w-28">
                    </div>
                    <div class="flex items-center gap-4 p-4">
                        <img class="relative z-10 object-cover w-20 h-20 -mt-8 -ml-1 rounded-full ring-4 ring-white" round
                            size="small"
                            :src="`https://source.boringavatars.com/beam/120/${auth.user?.email}?colors=264653,f4a261,16a34a`" />
                        <n-tag :bordered="false" class="font-bold text-gray-600">
                            {{ auth.user?.name ?? auth.user?.displayName ?? "---" }}
                        </n-tag>
                    </div>
                    <ul class="flex flex-col gap-2 p-4 pt-0">
                        <li class="flex items-center gap-2 w-fit cursor-help" v-tippy="'Email'">
                            <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 512 512">
                                <path
                                    d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                            </svg>
                            <span>{{ auth.user?.email ?? "---" }}</span>
                        </li>
                        <li class="flex items-center gap-2 w-fit cursor-help" v-tippy="'ID giảng viên'">
                            <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 576 512">
                                <path
                                    d="M454.4 93c7.3 8.8 6.1 21.6-2 29.7c-10.6 10.6-28.2 8.6-38-2.7C376.2 75.9 319.9 48 257 48C142.1 48 49 141.1 49 256v24.9c0 6.1-.2 12.2-.6 18.3C47.7 311.2 37.6 320 25.6 320C11.1 320 .1 307 .7 292.5c.2-3.9 .3-7.7 .3-11.6V256C1 114.6 115.6 0 257 0c79.4 0 150.4 36.2 197.4 93zm19.3 89.6c13.1-6.5 29-.2 32.4 14.1c4.5 19.1 6.9 39 6.9 59.4v24.9c0 5.4-.1 10.9-.2 16.3C512.6 310 502 320 489.2 320c-13.7 0-24.6-11.5-24.4-25.3c.1-4.6 .1-9.2 .1-13.8V256c0-15.1-1.6-29.8-4.6-43.9c-2.5-11.8 2.5-24.2 13.3-29.6zM257 80c97.2 0 176 78.8 176 176v24.9c0 27.7-1.7 55.3-5 82.7c-1.4 11.7-11.5 20.3-23.3 20.3c-14.7 0-25.9-13.2-24.2-27.8c3-24.9 4.4-50.1 4.4-75.3V256c0-70.7-57.3-128-128-128c-11.6 0-22.8 1.5-33.4 4.4c-10.6 2.9-22.3 .4-29.4-7.9c-10.4-12.1-6.9-30.9 8.3-35.9C219.6 83 238 80 257 80zM151.7 148.7c8.2 9.6 7.5 23.8 .2 34.2C137.5 203.6 129 228.8 129 256v24.9c0 28.9-3.3 57.7-9.7 85.8C116.9 377 107.6 384 97.1 384c-15.9 0-27.3-15.6-23.9-31.1c5.2-23.6 7.8-47.7 7.8-71.9V256c0-40.6 13.7-78 36.8-107.7c8.5-11 24.8-10.2 33.9 .4zM257 160c53 0 96 43 96 96v24.9c0 39.7-3.9 79.3-11.6 118.1c-2 10-10.8 17-21 17c-14.2 0-24.5-13.3-21.8-27.2c6.9-35.5 10.4-71.6 10.4-107.9V256c0-28.7-23.3-52-52-52s-52 23.3-52 52v24.9c0 40.5-5.3 80.7-15.9 119.7c-2.5 9.2-10.9 15.4-20.4 15.4c-14.8 0-25.3-14.6-21.5-29c9.1-34.6 13.8-70.2 13.8-106.1V256c0-53 43-96 96-96zm24 96v24.9c0 65.8-12.1 131-35.7 192.4l-5.9 15.3c-4.8 12.4-18.6 18.5-31 13.8s-18.5-18.6-13.8-31l5.9-15.3C222 400.2 233 340.8 233 280.9V256c0-13.3 10.7-24 24-24s24 10.7 24 24z" />
                            </svg>
                            <span>{{ auth.user?.teacher_id ?? auth.user?.info?.id ?? "---" }}</span>
                        </li>
                    </ul>
                </n-card>
            </n-gi>

            <n-gi :span="2">
                <n-spin :show="true">
                    <n-card content-style="padding: 0;" size="small">
                        <img src="https://d2gg9evh47fn9z.cloudfront.net/1600px_COLOURBOX18900290.jpg"
                            class="aspect-[3/1] object-cover" alt="">

                        <h1 class="px-4 font-mono text-center">Meet your supporter for a better teaching experience!</h1>

                        <div class="flex flex-col gap-2 p-4">
                            <div class="flex items-center justify-between gap-4">
                                <span class="flex items-center gap-2 text-base font-bold cursor-help"
                                    v-tippy="'Hỗ trợ quá trình giảng dạy'">
                                    <img src="https://cdn-icons-png.flaticon.com/512/630/630426.png"
                                        class="object-contain w-6 h-6" alt="">
                                    Supporter
                                </span>
                                <n-switch size="large" v-model:value="isSupporterOn" @update:value="toggleSupporter" />
                            </div>

                            <div class="flex items-center justify-between gap-4">
                                <span v-tippy="'Tự động nhận xét các lớp sau khi hoàn thành buổi học'"
                                    class="cursor-help">Tự
                                    động nhận xét</span>
                                <n-switch size="small" v-model:value="isAutoReviewOn" :disabled="!isSupporterOn" />
                            </div>

                            <div class="flex items-center justify-between gap-4">
                                <span
                                    v-tippy="'Đề xuất tài liệu cần thiết và các lưu ý (đã đến buổi kiểm tra, ...) trước buổi học'"
                                    class="cursor-help">Đề xuất trước buổi học</span>
                                <n-switch size="small" v-model:value="isAutoPrepareOn" :disabled="!isSupporterOn" />
                            </div>

                            <div class="flex items-center justify-between gap-4">
                                <span
                                    v-tippy="'Tạo bài checkpoint và mẫu nhận xét checkpoint trước các buổi 5 và 9. Tạo nhận xét cuối khóa trước buổi 14'"
                                    class="cursor-help">Tự động tạo kiểm tra và nhận xét (CP + Final)</span>
                                <n-switch size="small" v-model:value="isAutoCP" :disabled="!isSupporterOn" />
                            </div>
                        </div>
                    </n-card>
                </n-spin>
            </n-gi>
        </n-grid>
    </div>
</template>

<script>
import { mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';
import { directive } from 'vue-tippy';
import { useMessage } from 'naive-ui';

export default {
    name: "HomeView",
    computed: {
        ...mapState(useCounterStore, ["auth"])
    },
    directives: {
        tippy: directive,
    },
    setup() {
        const messageRef = useMessage();

        return {
            messageRef
        }
    },
    data() {
        return {
            isSupporterOn: true,
            isAutoReviewOn: true,
            isAutoPrepareOn: true,
            isAutoCP: true,
        }
    },
    methods: {
        toggleSupporter() {
            this.messageRef.warning(this.isSupporterOn ? "Đã bật Supporter" : "Đã tắt Supporter", { duration: 1000 });
        }
    }
};
</script>
