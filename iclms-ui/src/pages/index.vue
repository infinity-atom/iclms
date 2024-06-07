<template>
    <v-app>
        <iclms-navigation></iclms-navigation>

        <v-main>
            <div class="d-flex flex-wrap justify-center pa-2">
                <v-card v-for="course in courses" class="ma-2" width="22%">
                    <v-card-title>{{ course.name }}</v-card-title>
                    <v-card-text>{{ course.course_code }}</v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" :to="`/course_modules/${course.id}`">View</v-btn>
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
    import GET from "../api.js";

    const courses = ref([]);

    (async () => {
        courses.value = await GET("/courses", localStorage.api_host, localStorage.api_key);
    })();
</script>