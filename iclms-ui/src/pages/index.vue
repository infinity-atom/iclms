<template>
    <v-app>
        <iclms-navigation></iclms-navigation>

        <v-main>
            <div class="d-flex flex-wrap justify-center pa-2">
                <v-skeleton-loader type="card" width="22%" elevation="6" class="ma-2" v-for="i in loaders"></v-skeleton-loader>
                <v-empty-state
                    icon="mdi-alert-circle"
                    headline="No API information"
                    title="Please set the API host and key in the settings page."
                    v-if="error"
                >
                    <v-btn variant="outlined" to="/settings" color="primary">Settings</v-btn>
                </v-empty-state>
                <v-card v-for="course in courses" class="ma-2" width="22%" elevation="6" style="min-width: 250px;">
                    <v-card-title>{{ course.name }}</v-card-title>
                    <v-card-text>{{ course.course_code }}</v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" :to="`/modules?course_id=${course.id}`">View</v-btn>
                        <v-spacer></v-spacer>
                        <!-- TODO: maybe add some course customization? -->
                    </v-card-actions>
                </v-card>
            </div>
        </v-main>
    </v-app>
</template>

<script setup>
    import IclmsNavigation from "../components/iclms-navigation.vue";

    import { ref } from "vue";
    import { GET } from "../api.js";

    const courses = ref([]);
    const loaders = ref([]);
    const error = ref(false);

    if(localStorage.api_host == undefined || localStorage.api_key == undefined || localStorage.api_host == "" || localStorage.api_key == "") {
        error.value = true;
    } else {
        loaders.value = [0,0,0,0,0,0,0,0];
    }

    (async () => {
        courses.value = await GET("/courses", localStorage.api_host, localStorage.api_key);
        loaders.value = [];
    })();
</script>