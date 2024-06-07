<template>
    <v-navigation-drawer v-model="drawer" temporary>
        <v-list-item title="icLMS" subtitle="v1.1.0"></v-list-item>
        <v-divider></v-divider>
        <v-list-item prepend-icon="mdi-view-dashboard" to="/">Dashboard</v-list-item>
        <v-list-item prepend-icon="mdi-cog" to="/settings">Settings</v-list-item>
    </v-navigation-drawer>

    <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-app-bar-title>{{ app_name }}</v-app-bar-title>
    </v-app-bar>
</template>

<script setup>
    import { ref } from "vue";

    const app_name = ref(localStorage.app_name || "icLMS");

    const drawer = ref(false);
</script>