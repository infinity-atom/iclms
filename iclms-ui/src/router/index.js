import { createRouter, createWebHistory } from 'vue-router/auto';

/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Dashboard",
            component: () => import("@/pages/index.vue")
        },
        {
            path: "/settings",
            name: "Settings",
            component: () => import("@/pages/settings.vue")
        },
        {
            path: "/modules",
            name: "Modules",
            component: () => import("@/pages/modules.vue")
        },
        {
            path: "/page",
            name: "Page",
            component: () => import("@/pages/page.vue")
        },
        {
            path: "/goto-course",
            name: "internal-GotoCourse",
            component: () => import("@/pages/goto-course.vue")
        }
    ]
});

export default router
