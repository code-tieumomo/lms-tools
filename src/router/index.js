import { nextTick } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { useCounterStore } from "../stores/counter";

export const loadingBarApiRef = {};

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/login",
            name: "login",
            component: () => import("../views/LoginView.vue"),
            meta: {
                requiresAuth: false,
                title: "Đăng nhập",
                layout: "full"
            }
        },
        {
            path: "/",
            name: "home",
            component: () => import("../views/HomeView.vue"),
            meta: {
                requiresAuth: true,
                title: "Trang chủ"
            }
        },
        {
            path: "/classes",
            name: "classes",
            component: () => import("../views/ClassesView.vue"),
            meta: {
                requiresAuth: true,
                title: "Lớp học"
            }
        },
        {
            path: "/class/:id",
            name: "class",
            component: () => import("../views/ClassView.vue"),
            meta: {
                requiresAuth: true,
                title: "Lớp học"
            },
            props: true
        },
        {
            path: "/quick-review",
            name: "quick-review",
            component: () => import("../views/QuickReview.vue"),
            meta: {
                requiresAuth: true,
                title: "Nhận xét nhanh"
            }
        }
    ]
});

router.beforeEach(async function (to, from, next) {
    if (loadingBarApiRef.value) {
        loadingBarApiRef.value.start();
    }

    if (!to.meta.layout) to.meta.layout = "default";

    // Lần đầu tiên vào trang sẽ load thông tin session hiện tại để kiểm tra đã đăng nhập hay chưa
    const store = useCounterStore();
    const reqAuth = to.matched.some((record) => record.meta.requiresAuth);
    const loginQuery = { path: "/login", query: { redirect: to.name } };
    if (store.isFirstTimeLoading) {
        await store.fetchAuthenticatedUser();
        store.isFirstTimeLoading = false;
        if (!store.auth.isAuthenticated && to.name !== "login") {
            next(loginQuery);
        }
    }

    if (reqAuth) {
        if (store.auth.isAuthenticated) {
            next();
        } else {
            next(loginQuery);
        }
    } else {
        if (to.name === "login") {
            if (store.auth.isAuthenticated) {
                next({ name: "home" });
            } else {
                next();
            }
        } else {
            next();
        }
    }

    // if (!reqAuth) {
    //     if (to.name === "login") {
    //         apiClientWithoutErrorHandling.get("/api/user").then((res) => {
    //             store.auth.user = res.data;
    //             store.auth.isAuthenticated = res.data !== null;
    //             next({ name: "home" });
    //         }).catch(() => {
    //             next();
    //         });
    //     } else {
    //         next();
    //     }
    // } else {
    //     if (authUser) {
    //         next();
    //     } else {
    //         store.fetchAuthenticatedUser().then(() => {
    //             if (store.auth.isAuthenticated) {
    //                 next();
    //             } else {
    //                 next(loginQuery);
    //             }
    //         }).catch(() => {
    //             next(loginQuery);
    //         });
    //     }
    // }
});

router.afterEach(function (to, from) {
    if (loadingBarApiRef.value) {
        loadingBarApiRef.value.finish();
    }

    if (to.hash && to.hash !== from.hash) {
        nextTick(() => {
            const el = document.querySelector(to.hash);
            if (el) el.scrollIntoView();
        });
    }

    nextTick(() => {
        document.title = `${to.meta.title ?? "Untitle"} - LMS Tools`;
    });
});

export default router;
