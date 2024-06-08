<template>
    <v-app>
        <iclms-navigation></iclms-navigation>

        <v-main>
            <v-card class="ma-4" title="Download file" :loading="!ready">
                <v-card-text>
                    This file has no preview.<br>
                    <br>
                    <v-table v-if="ready">
                        <thead>
                            <tr>
                                <th>key</th>
                                <th>value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>File ID</td>
                                <td>{{ $route.query.file_id }}</td>
                            </tr>
                            <tr>
                                <td>Course ID</td>
                                <td>{{ $route.query.course_id }}</td>
                            </tr>
                            <tr>
                                <td>Filename</td>
                                <td>{{ filename }}</td>
                            </tr>
                            <tr>
                                <td>Filetype</td>
                                <td>{{ filetype }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card-text>
                <v-card-actions v-if="ready">
                    <v-btn color="primary" :href="link" target="_blank" variant="outlined" @click="$router.push($route.query.back)">Download</v-btn>
                </v-card-actions>
            </v-card>
        </v-main>
    </v-app>
</template>

<script setup>
    import IclmsNavigation from "../components/iclms-navigation.vue";

    import { ref } from "vue";
    import { GET } from "../api.js";
    import { useRoute } from "vue-router";

    const route = useRoute();

    const ready = ref(false);
    const filename = ref("Loading...");
    const link = ref("");
    const filetype = ref("Loading...");

    (async () => {
        let res = await GET(`courses/${route.query.course_id}/files/${route.query.file_id}`, localStorage.api_host, localStorage.api_key);
        filename.value = res.display_name;
        link.value = res.url;
        filetype.value = res["content-type"];

        await new Promise(r => setTimeout(r, 500));

        ready.value = true;
    })();
</script>