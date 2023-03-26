<template>
    <div>
        <h1 class="text-4xl">Nhận xét nhanh</h1>

        <Transition name="fade" mode="out-in">
            <div v-if="isFetchingStatus" class="flex items-center justify-center mt-8">
                <Loading1></Loading1>
            </div>
            <div v-else class="flex flex-col items-start gap-4 mt-8">
                <n-alert title="Lưu ý" type="warning" class="w-full">
                    Sau khi bắt đầu vui lòng không đóng tab hiện tại
                </n-alert>

                <n-button type="primary" @click="createQuickReviewRequest" :disabled="isReviewing">
                    {{ isReviewing ? "Đang nhận xét ..." : "Tạo yêu cầu nhận xét tất cả các lớp" }}
                </n-button>

                <div class="overflow-auto" v-if="history.length > 0">
                    <h2 class="mb-2 text-base font-semibold">Lịch sử</h2>
                    <n-config-provider :hljs="hljs">
                        <n-code :code="history.join(`\n`)" language="txt" show-line-numbers />
                    </n-config-provider>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script>
import { mapState } from 'pinia';
import Loading1 from '../components/loader/Loading1.vue';
import { apiClient } from '../services/axios';
import echoClient from '../services/echo';
import { useCounterStore } from '../stores/counter';
import hljs from 'highlight.js';

export default {
    name: "QuickReview",
    components: {
        Loading1
    },
    data() {
        return {
            isFetchingStatus: true,
            isReviewing: false,
            history: [],
            hljs
        }
    },
    computed: {
        ...mapState(useCounterStore, ['auth'])
    },
    created() {
        this.fetchStatus();
    },
    mounted() {
        echoClient.channel(`quick-review-${this.auth.user.email}`)
            .listen('.QuickReview', (e) => {
                this.history = e;
            });
    },
    methods: {
        async fetchStatus() {
            this.isFetchingStatus = true;
            apiClient.get('/api/quick-review/status')
                .then(res => {
                    // console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    this.isFetchingStatus = false;
                })
        },
        async createQuickReviewRequest() {
            this.isReviewing = true;
            apiClient.post('/api/quick-review/create')
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    this.isReviewing = false;
                })
        }
    }
};
</script>

<style scoped>
.n-card {
    --n-title-font-size: 0.875rem;
}
</style>
