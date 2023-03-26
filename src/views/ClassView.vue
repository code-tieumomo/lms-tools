<template>
    <div v-if="isFetchingClass" class="flex items-center justify-center mt-8">
        <Loading1></Loading1>
    </div>
    <div v-else>
        <div class="flex items-center gap-4">
            <ClassLogo :image="mindXClass.course?.shortName" class="w-12 h-12"></ClassLogo>
            <h1 class="text-4xl">
                {{ mindXClass.name }}
            </h1>
            <n-tag size="small" :bordered="false" :type="mindXClass.status === 'FINISHED' ? 'error' : 'success'">
                {{ mindXClass.status === 'FINISHED' ? 'Đã kết thúc' : 'Đang hoạt động' }}
            </n-tag>
        </div>

        <div class="mt-8">
            <h2 class="text-base font-semibold">Thông tin</h2>
            <n-card>
                <div class="flex flex-col gap-2">
                    <Tippy class="w-fit" theme="light">
                        <div class="flex items-center gap-2 w-fit cursor-help">
                            <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 384 512">
                                <path
                                    d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                            </svg>
                            <span>{{ mindXClass.centre?.name }}</span>
                        </div>

                        <template #content>
                            <div class="flex flex-col gap-2 p-2">
                                <div class="flex items-center gap-2 w-fit cursor-help">
                                    <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 576 512">
                                        <path
                                            d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152V422.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6V451.8L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77V504.3L192 449.4V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
                                    </svg>
                                    <span>{{ mindXClass.centre?.address }}</span>
                                </div>
                                <div class="flex items-center gap-2 w-fit cursor-help">
                                    <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 512 512">
                                        <path
                                            d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                                    </svg>
                                    <span>{{ mindXClass.centre?.email }}</span>
                                </div>
                                <div class="flex items-center gap-2 w-fit cursor-help">
                                    <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 512 512">
                                        <path
                                            d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                                    </svg>
                                    <span>{{ mindXClass.centre?.hotline }}</span>
                                </div>
                                <div class="flex items-center gap-2 w-fit cursor-help">
                                    <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 384 512">
                                        <path
                                            d="M317.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224C.9 240.7-2.6 254.8 2 267.3S18.7 288 32 288H143.5L66.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H240.5L317.4 44.6z" />
                                    </svg>
                                    <span>{{ mindXClass.centre?.shortName }}</span>
                                </div>
                            </div>
                        </template>
                    </Tippy>

                    <Tippy class="block w-fit" theme="light">
                        <div class="flex items-center gap-2 w-fit cursor-help">
                            <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 448 512">
                                <path
                                    d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                            </svg>
                            <span>{{ mindXClass.course?.name }}</span>
                        </div>

                        <template #content>
                            <div class="flex flex-col gap-2 p-2">
                                <div class="flex items-center gap-2 w-fit cursor-help">
                                    <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 448 512">
                                        <path
                                            d="M448 64c0-17.7-14.3-32-32-32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32zm0 256c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32zM0 192c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zM448 448c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32z" />
                                    </svg>
                                    <span>{{ mindXClass.course?.description }}</span>
                                </div>
                                <div class="flex items-center gap-2 w-fit cursor-help">
                                    <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 448 512">
                                        <path
                                            d="M181.3 32.4c17.4 2.9 29.2 19.4 26.3 36.8L197.8 128h95.1l11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3s29.2 19.4 26.3 36.8L357.8 128H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H347.1L325.8 320H384c17.7 0 32 14.3 32 32s-14.3 32-32 32H315.1l-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8l9.8-58.7H155.1l-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8L90.2 384H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h68.9l21.3-128H64c-17.7 0-32-14.3-32-32s14.3-32 32-32h68.9l11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3zM187.1 192L165.8 320h95.1l21.3-128H187.1z" />
                                    </svg>
                                    <span>{{ mindXClass.course?.numberOfSession }} buổi</span>
                                </div>
                                <div class="flex items-center gap-2 w-fit cursor-help">
                                    <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 512 512">
                                        <path
                                            d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                                    </svg>
                                    <span>{{ mindXClass.course?.sessionHour }} tiếng/buổi</span>
                                </div>
                                <div class="flex items-center gap-2 w-fit cursor-help">
                                    <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 384 512">
                                        <path
                                            d="M317.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224C.9 240.7-2.6 254.8 2 267.3S18.7 288 32 288H143.5L66.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H240.5L317.4 44.6z" />
                                    </svg>
                                    <span>{{ mindXClass.course?.shortName }}</span>
                                </div>
                            </div>
                        </template>
                    </Tippy>

                    <div class="flex items-center gap-2 w-fit cursor-help">
                        <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 640 512">
                            <path
                                d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9v28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5V291.9c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z" />
                        </svg>
                        <span>{{ mindXClass.students?.length }} học sinh</span>
                    </div>

                    <Tippy class="block w-fit" theme="light">
                        <div class="flex items-center gap-2 w-fit cursor-help">
                            <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 640 512">
                                <path
                                    d="M224 0a128 128 0 1 1 0 256A128 128 0 1 1 224 0zM178.3 304h91.4c11.8 0 23.4 1.2 34.5 3.3c-2.1 18.5 7.4 35.6 21.8 44.8c-16.6 10.6-26.7 31.6-20 53.3c4 12.9 9.4 25.5 16.4 37.6s15.2 23.1 24.4 33c15.7 16.9 39.6 18.4 57.2 8.7v.9c0 9.2 2.7 18.5 7.9 26.3H29.7C13.3 512 0 498.7 0 482.3C0 383.8 79.8 304 178.3 304zM436 218.2c0-7 4.5-13.3 11.3-14.8c10.5-2.4 21.5-3.7 32.7-3.7s22.2 1.3 32.7 3.7c6.8 1.5 11.3 7.8 11.3 14.8v30.6c7.9 3.4 15.4 7.7 22.3 12.8l24.9-14.3c6.1-3.5 13.7-2.7 18.5 2.4c7.6 8.1 14.3 17.2 20.1 27.2s10.3 20.4 13.5 31c2.1 6.7-1.1 13.7-7.2 17.2l-25 14.4c.4 4 .7 8.1 .7 12.3s-.2 8.2-.7 12.3l25 14.4c6.1 3.5 9.2 10.5 7.2 17.2c-3.3 10.6-7.8 21-13.5 31s-12.5 19.1-20.1 27.2c-4.8 5.1-12.5 5.9-18.5 2.4l-24.9-14.3c-6.9 5.1-14.3 9.4-22.3 12.8l0 30.6c0 7-4.5 13.3-11.3 14.8c-10.5 2.4-21.5 3.7-32.7 3.7s-22.2-1.3-32.7-3.7c-6.8-1.5-11.3-7.8-11.3-14.8V454.8c-8-3.4-15.6-7.7-22.5-12.9l-24.7 14.3c-6.1 3.5-13.7 2.7-18.5-2.4c-7.6-8.1-14.3-17.2-20.1-27.2s-10.3-20.4-13.5-31c-2.1-6.7 1.1-13.7 7.2-17.2l24.8-14.3c-.4-4.1-.7-8.2-.7-12.4s.2-8.3 .7-12.4L343.8 325c-6.1-3.5-9.2-10.5-7.2-17.2c3.3-10.6 7.7-21 13.5-31s12.5-19.1 20.1-27.2c4.8-5.1 12.4-5.9 18.5-2.4l24.8 14.3c6.9-5.1 14.5-9.4 22.5-12.9V218.2zm92.1 133.5a48.1 48.1 0 1 0 -96.1 0 48.1 48.1 0 1 0 96.1 0z" />
                            </svg>
                            <span>Quản lý bởi: {{ mindXClass.operator?.displayName }}</span>
                        </div>

                        <template #content>
                            <div class="flex flex-col gap-2 p-2">
                                <div class="flex items-center gap-2 w-fit cursor-help">
                                    <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 512 512">
                                        <path
                                            d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                                    </svg>
                                    <span>{{ mindXClass.operator?.email }}</span>
                                </div>
                            </div>
                        </template>
                    </Tippy>
                </div>
            </n-card>
        </div>

        <div class="mt-8">
            <h2 class="text-base font-semibold">Buổi học</h2>
            <n-grid :x-gap="12" :y-gap="8" cols="1 s:2 m:3 l:4 xl:5 2xl:6" responsive="screen">
                <n-grid-item v-for="(item, index) in mindXClass.slots" :key="item._id">
                    <n-card>
                        <template #header>
                            <div class="flex items-center gap-2">
                                <img :src="`https://img.icons8.com/color/48/null/${index + 1}.png`" :alt="index + 1"
                                    class="w-8 h-8">
                                <span class="text-sm font-semibold">{{ moment(item.startTime).format("DD-MM-Y HH:mm")
                                }}</span>
                            </div>
                        </template>
                        <n-tag size="small" :bordered="false"
                            :type="(new Date(item.endTime)) < (new Date()) ? 'error' : ''">
                            {{ (new Date(item.endTime)) < (new Date()) ? "Đã kết thúc" : "Chưa diễn ra" }} </n-tag>
                    </n-card>
                </n-grid-item>
            </n-grid>
        </div>
    </div>
</template>

<script>
import ClassLogo from '../components/images/ClassLogo.vue';
import Loading1 from '../components/loader/Loading1.vue';
import { apiClient } from '../services/axios';
import { Tippy } from 'vue-tippy';
import moment from 'moment';

export default {
    name: "ClassView",
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            isFetchingClass: true,
            mindXClass: {},
            moment: moment
        };
    },
    components: { Loading1, ClassLogo, Tippy },
    created() {
        this.fetchClass().then(() => {
            document.title = `${this.mindXClass.name} - LMS Tools`;
        });
    },
    methods: {
        async fetchClass() {
            this.isFetchingClass = true;
            try {
                const res = await apiClient.get(`/api/classes/${this.id}`);
                this.mindXClass = res.data;
            } catch (err) {
                console.error(err);
            } finally {
                this.isFetchingClass = false;
            }
        }
    }
};
</script>
