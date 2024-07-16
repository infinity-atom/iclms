<template>
    <v-app>
        <iclms-navigation></iclms-navigation>

        <v-dialog fullscreen v-model="source_dialog">
            <v-card>
                <v-toolbar>
                    <v-toolbar-title>Source</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="source_dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <div class="ma-5 code-font">
                    {{ body }}
                </div>
            </v-card>
        </v-dialog>

        <v-main>
            <div class="pa-2">
                <iclms-top-nav class="ma-2"></iclms-top-nav>

                <v-skeleton-loader type="paragraph" v-for="i in loaders" class="ma-2"></v-skeleton-loader>
                <div v-if="loaded" class="ma-2">
                    <v-card>
                        <v-card-title>{{ metadata.title }}</v-card-title>
                        <v-card-actions>
                            <v-btn variant="outlined" color="primary" @click="source_dialog = true">View source</v-btn>
                            <v-btn variant="outlined" color="primary" @click="downloadBody">Download</v-btn>
                        </v-card-actions>
                    </v-card>
                </div>
                <div v-if="loaded" class="ma-2">
                    <v-card class="light">
                        <div v-html="body" class="pa-5 ma-4 width-max"></div>
                    </v-card>
                </div>
            </div>
        </v-main>
    </v-app>
</template>

<style scoped>
    .width-max * {
        max-width: 100%;
    }

    .code-font {
        font-family: monospace;
    }

    .light {
        background-color: #f5f5f5;
        color: black;
    }

    .light * {
        color: black;
    }
</style>

<script setup>
    import IclmsNavigation from "../components/iclms-navigation.vue";
    import iclmsTopNav from "@/components/iclms-top-nav.vue";

    import { ref } from "vue";
    import { GET } from "../api.js";
    import { useRoute } from "vue-router";

    const route = useRoute();

    const body = ref("");
    const metadata = ref({});
    const loaders = ref([0,0,0,0,0,0,0,0]);
    const loaded = ref(false);
    const source_dialog = ref(false);

    (async () => {
        // get the page url
        let res = await GET(`/courses/${route.query.course_id}/modules/${route.query.module_id}/items/${route.query.item_id}`, localStorage.api_host, localStorage.api_key);
        let url = `/courses/${route.query.course_id}/pages/${res.page_url}`;

        // get the page content
        let page = await GET(url, localStorage.api_host, localStorage.api_key);
        body.value = page.body;
        loaders.value = [];
        loaded.value = true;
        metadata.value = page;
    })();

    const downloadBody = () => {
        let a = document.createElement("a");
        let file = new Blob([body.value], {type: "text/plain"});
        a.href = URL.createObjectURL(file);
        a.download = `${metadata.value.title}.html`;
        a.click();
    }
</script>