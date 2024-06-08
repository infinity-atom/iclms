<template>
    <v-app>
        <iclms-navigation></iclms-navigation>

        <v-main>
            <div class="pa-2">
                <iclms-top-nav class="ma-2"></iclms-top-nav>

                <v-skeleton-loader type="paragraph" class="ma-2" v-for="i in loaders"></v-skeleton-loader>
                <v-list class="ma-2">
                    <v-list-item v-for="item in items" :to="`/assignment?course_id=${$route.query.course_id}&assignment_id=${item.id}`">
                        <v-list-item-title>
                            {{ item.name }}
                            <v-chip v-if="item.has_submitted_submissions" size="small" color="success">Submitted</v-chip>
                            <v-chip v-else-if="new Date(item.due_at) < new Date()" size="small" color="error">Overdue</v-chip>
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            Due at {{ new Date(item.due_at).toLocaleString() }}
                        </v-list-item-subtitle>
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

    const items = ref([]);
    const loaders = ref([0,0,0,0,0,0,0,0]);

    (async () => {
        const response = await GET(`courses/${courseID}/assignments`, localStorage.api_host, localStorage.api_key);
        items.value = response;
        loaders.value = [];
    })();
</script>