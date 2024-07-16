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
        },
        {
            path: "/redirect",
            name: "internal-Redirect",
            component: () => import("@/pages/redirect.vue")
        },
        {
            path: "/file",
            name: "File",
            component: () => import("@/pages/file.vue")
        },
        {
            path: "/assignment",
            name: "Assignment",
            component: () => import("@/pages/assignment.vue")
        },
        {
            path: "/assignments",
            name: "Assignments",
            component: () => import("@/pages/assignments.vue")
        },
        {
            path: "/discussions",
            name: "Discussions",
            component: () => import("@/pages/discussions.vue")
        },
        {
            path: "/discussion",
            name: "Discussion",
            component: () => import("@/pages/discussion.vue")
        }
    ]
});

export default router
