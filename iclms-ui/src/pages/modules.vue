<template>
    <v-app>
        <iclms-navigation></iclms-navigation>

        <v-main>
            <div class="pa-2">
                <v-skeleton-loader type="paragraph" class="ma-2" v-for="i in loaders"></v-skeleton-loader>

                <v-list v-for="module in modules" class="ma-2">
                    <v-list-item>
                        <b>{{ module.title }}</b>
                    </v-list-item>
                    <v-list-item v-for="item in module.items" :link="item.showLink" :prepend-icon="item.icon" :to="item.external ? '' : item.url">
                        <code>{{ "&nbsp;&nbsp;&nbsp;&nbsp;".repeat(item.indent) }}</code>
                        {{ item.title }}
                    </v-list-item>
                </v-list>
            </div>
        </v-main>
    </v-app>
</template>

<script setup>
    import IclmsNavigation from "../components/iclms-navigation.vue";

    import { ref, watch } from "vue";
    import { useRoute, useRouter } from "vue-router";
    import GET from "../api.js";

    const route = useRoute();
    const router = useRouter();

    const courseID = route.query.course_id || 0;
    if(courseID == 0) {
        alert("An error ocurred! Course was undefined.");
        router.push("/");
    }

    const modules = ref([]);
    const items = ref([]);
    const loaders = ref([0,0,0,0,0,0,0,0]);

    (async () => {
        const icon_lookup = {
            File: "mdi-file-code",
            Page: "mdi-book-open-variant",
            Discussion: "mdi-message",
            Assignment: "mdi-clipboard-text",
            Quiz: "mdi-test-tube",
            SubHeader: "mdi-information",
            ExternalUrl: "mdi-link",
            ExternalTool: "mdi-tools"
        }

        let tmodules = await GET(`/courses/${courseID}/modules`, localStorage.api_host, localStorage.api_key);
        tmodules.forEach(async element => {
            let moduleItems = {
                title: element.name,
                items: [],
                id: element.id
            };
            let data = await GET(`/courses/${courseID}/modules/${element.id}/items`, localStorage.api_host, localStorage.api_key);
            data.forEach(i => {
                let url = "#";
                let external = false;
                if(i.type == "Page") {
                    url = `/page?course_id=${courseID}&module_id=${element.id}&item_id=${i.id}`;
                }
                moduleItems.items.push({
                    id: i.id,
                    title: i.title,
                    indent: localStorage.indent_enable == "false" ? 0 : i.indent,
                    type: i.type,
                    showLink: i.type != "SubHeader",
                    icon: icon_lookup[i.type],
                    url: url,
                    external: external
                });
            });
            modules.value.push(moduleItems);
        });
        loaders.value = [];
    })();
</script>