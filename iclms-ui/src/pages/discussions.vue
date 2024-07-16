<template>
    <v-app>
        <iclms-navigation></iclms-navigation>

        <v-main>
            <div class="pa-2">
                <iclms-top-nav class="ma-2"></iclms-top-nav>

                <v-skeleton-loader type="paragraph" class="ma-2" v-for="i in loaders"></v-skeleton-loader>
                <v-list class="ma-2">
                    <v-list-item v-for="topic in topics" :to="`/discussion?course_id=${$route.query.course_id}&discussion_id=${topic.id}`">
                        <v-list-item-title>{{ topic.title }}</v-list-item-title>
                        <v-list-item-subtitle>Posted {{ new Date(topic.posted_at).toLocaleString() }}</v-list-item-subtitle>
                    </v-list-item>
                </v-list>
            </div>
        </v-main>
    </v-app>
</template>

<script setup>
    import IclmsNavigation from "../components/iclms-navigation.vue";
    import IclmsTopNav from "../components/iclms-top-nav.vue";

    import { ref, watch } from "vue";
    import { useRoute, useRouter } from "vue-router";
    import { GET } from "../api.js";

    const route = useRoute();
    const router = useRouter();

    const courseID = route.query.course_id || 0;

    if(courseID == 0) {
        alert("An error ocurred! Course was undefined.");
        router.push("/");
    }

    const topics = ref([]);
    const items = ref([]);
    const loaders = ref([0,0,0,0,0,0,0,0]);

    (async () => {
        topics.value = await GET(`/courses/${courseID}/discussion_topics`, localStorage.api_host, localStorage.api_key);
        
        loaders.value = [];
    })();
</script>