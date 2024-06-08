<template>
    <v-navigation-drawer v-model="drawer" temporary>
        <v-list-item title="icLMS" subtitle="v1.1.0"></v-list-item>
        <v-divider></v-divider>
        <v-list-item prepend-icon="mdi-view-dashboard" to="/">Dashboard</v-list-item>
        <v-list-item prepend-icon="mdi-cog" to="/settings">Settings</v-list-item>
        <v-divider></v-divider>
        <v-list-item v-for="course in courses_nav" :id="course.id" :to="`/goto-course?course_id=${course.id}`">
            <v-icon icon="mdi-book"></v-icon>
            {{ course.name }}
        </v-list-item>
    </v-navigation-drawer>

    <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-app-bar-title>{{ app_name }}</v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="switchTheme" v-if="theme_switcher">
            <v-icon icon="mdi-circle-half-full"></v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script setup>
    import { ref } from "vue";
    import GET from "../api.js";
    import { useTheme } from "vuetify";

    const theme = useTheme();

    const app_name = ref(localStorage.app_name || "icLMS");

    const drawer = ref(false);

    const courses_nav = ref([]);
    (async () => {
        courses_nav.value = await GET("/courses", localStorage.api_host, localStorage.api_key);
    })();

    const switchTheme = () => {
        theme.global.name.value = theme.global.name.value == "light" ? "dark" : "light";
        localStorage.app_mode = theme.global.name.value == "light" ? "Light": "Dark";
    }
</script>

<script>
    export default {
        props: {
            theme_switcher: {
                type: Boolean,
                default: false
            }
        }
    }
</script>