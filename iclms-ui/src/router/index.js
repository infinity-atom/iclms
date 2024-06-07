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
        }
    ]
});

export default router
