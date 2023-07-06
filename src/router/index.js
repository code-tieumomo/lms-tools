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
                title: "Trang chủ",
                sidebarKey: "home"
            }
        },
        {
            path: "/classes",
            children: [
                {
                    path: "",
                    name: "classes",
                    component: () => import("../views/ClassesView.vue"),
                    meta: {
                        requiresAuth: true,
                        title: "Lớp học",
                        sidebarKey: "classes"
                    }
                },
                {
                    path: ":id",
                    children: [
                        {
                            path: "",
                            name: "class",
                            component: () => import("../views/ClassView.vue"),
                            meta: {
                                requiresAuth: true,
                                title: "Lớp học",
                                sidebarKey: "classes"
                            },
                            props: true
                        },
                        {
                            path: ":slotId",
                            name: "slot",
                            component: () => import("../views/SlotView.vue"),
                            meta: {
                                requiresAuth: true,
                                sidebarKey: "classes"
                            },
                            props: true
                        }
                    ]
                }
            ]
        },
        {
            path: "/courses",
            children: [
                {
                    path: "",
                    name: "courses",
                    component: () => import("@/views/CoursesView.vue"),
                    meta: {
                        requiresAuth: true,
                        title: "Khóa học",
                        sidebarKey: "courses"
                    }
                }
            ]
        },
        {
            path: "/storages",
            children: [
                {
                    path: "",
                    name: "storages",
                    component: () => import("@/views/StoragesView.vue"),
                    meta: {
                        requiresAuth: true,
                        title: "Kho lưu trữ",
                        sidebarKey: "storages"
                    }
                }
            ]
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
        document.title = to.meta.title ? `${to.meta.title} - Daily` : "Daily";
    });
});

export default router;
