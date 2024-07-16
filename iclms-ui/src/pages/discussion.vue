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

        <v-snackbar v-model="errorbar" color="red">
            {{ errormsg }}
        </v-snackbar>

        <v-main>
            <div class="pa-2">
                <iclms-top-nav class="ma-2"></iclms-top-nav>
                <v-skeleton-loader type="paragraph" v-for="i in loaders" class="ma-2"></v-skeleton-loader>

                <div v-if="loaded" class="ma-2">
                    <v-card>
                        <v-card-title>
                            {{ metadata.title }}
                        </v-card-title>
                        <v-card-actions>
                            <v-btn variant="outlined" color="primary" @click="source_dialog = true">View source</v-btn>
                            <v-btn variant="outlined" color="primary" @click="downloadBody">Download</v-btn>
                        </v-card-actions>
                    </v-card>
                </div>

                <div class="ma-2">
                    <v-card class="light" v-if="loaded">
                        <div v-html="body" class="pa-5 ma-4"></div>
                    </v-card>
                </div>

                <div class="ma-2">
                    <v-card v-if="loaded">
                        <v-list>
                            <iclms-discussion-reply v-for="entry in entries" :reply="entry" top />
                        </v-list>
                    </v-card>
                </div>

                <div class="ma-2">
                    <v-card v-if="loaded">
                        <v-card-title>Reply to discussion</v-card-title>
                        <v-card-text>
                            <iclms-editor v-model="reply" @on-submit="" builtin-submit></iclms-editor>
                        </v-card-text>
                    </v-card>
                </div>
            </div>
        </v-main>
    </v-app>
</template>

<style scoped>
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
    import IclmsEditor from "../components/iclms-editor.vue";
    import IclmsTopNav from "@/components/iclms-top-nav.vue";
    import IclmsDiscussionReply from "../components/iclms-discussion-reply.vue";

    import { ref } from "vue";
    import { GET, POST, RAWPOST, RAWGET } from "../api.js";
    import { useRoute } from "vue-router";

    const route = useRoute();

    const body = ref("");
    const entries = ref([]);
    const metadata = ref({});
    const loaders = ref([0,0,0,0,0,0,0,0]);
    const loaded = ref(false);

    const source_dialog = ref(false);

    const errorbar = ref(false);
    const errormsg = ref("");


    (async () => {
        let url = `/courses/${route.query.course_id}/discussion_topics/${route.query.discussion_id}`;

        // get the page content
        try {
            let discussion = await GET(url, localStorage.api_host, localStorage.api_key);

            body.value = discussion.message == "" ? "<i>No discussion message provided</i>": discussion.message;
            loaders.value = [];
            loaded.value = true;
            metadata.value = discussion;
        } catch(err) {
            errorbar.value = true;
            errormsg.value = err.message;
        }

        url = `/courses/${route.query.course_id}/discussion_topics/${route.query.discussion_id}/entries`;

        // get the page content

        try {
            let response = await GET(url, localStorage.api_host, localStorage.api_key);

            function processReplies(response) {
                // Flatten all entries and their replies into a single array
                let allEntries = [];

                response.forEach(entry => {
                    allEntries.push({
                        id: entry.id,
                        message: entry.message,
                        username: entry.user.display_name,
                        userid: entry.user.id,
                        created: entry.created_at,
                        edited: entry.updated_at,
                        reply_to: entry.parent_id
                    });

                    if (entry.recent_replies && Array.isArray(entry.recent_replies)) {
                        entry.recent_replies.forEach(reply => {
                            allEntries.push({
                                id: reply.id,
                                message: reply.message,
                                username: reply.user.display_name,
                                userid: reply.user.id,
                                created: reply.created_at,
                                edited: reply.updated_at,
                                reply_to: reply.parent_id
                            });
                        });
                    }
                });

                // Create a map to hold each entry by its ID
                let replyMap = {};

                allEntries.forEach(reply => {
                    replyMap[reply.id] = {
                        ...reply,
                        replies: []
                    };
                });

                // Build the nested structure
                let nestedReplies = [];

                allEntries.forEach(reply => {
                    if (reply.reply_to == null) {
                        nestedReplies.push(replyMap[reply.id]);
                    } else {
                        if (replyMap[reply.reply_to]) {
                            replyMap[reply.reply_to].replies.push(replyMap[reply.id]);
                        } else {
                            console.warn(`Parent reply with ID ${reply.reply_to} not found for reply ${reply.id}.`);
                        }
                    }
                });

                return nestedReplies;
            }

            entries.value = processReplies(response);
            console.log(entries.value);
        } catch(err) {
            console.error(err);
            errorbar.value = true;
            errormsg.value = "GET Entries: " + err.message;
        }
    })();

    const downloadBody = () => {
        let a = document.createElement("a");
        let file = new Blob([body.value], {type: "text/plain"});
        a.href = URL.createObjectURL(file);
        a.download = `${metadata.value.name}.html`;
        a.click();
    }
</script>