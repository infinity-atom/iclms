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

        <v-snackbar v-model="infobar">
            {{ infomsg }}
        </v-snackbar>

        <v-main>
            <div class="pa-2">
                <iclms-top-nav class="ma-2"></iclms-top-nav>
                <v-skeleton-loader type="paragraph" v-for="i in loaders" class="ma-2"></v-skeleton-loader>

                <div v-if="loaded" class="ma-2">
                    <v-card>
                        <v-card-title>
                            {{ metadata.name }}
                            <v-chip color="success" size="small" v-if="metadata.has_submitted_submissions">Submitted</v-chip>
                        </v-card-title>
                        <v-card-subtitle>
                            Available from {{ new Date(metadata.unlock_at).toLocaleString() }}<br>
                            Available until {{ new Date(metadata.lock_at).toLocaleString() }}<br>
                            Due at {{ new Date(metadata.due_at).toLocaleString() }}<br>
                            <br>
                            {{ metadata.points_possible }} points available &bull; grading using {{ metadata.grading_type }}
                        </v-card-subtitle>
                        <v-card-actions>
                            <v-btn variant="outlined" color="primary" @click="source_dialog = true">View source</v-btn>
                            <v-btn variant="outlined" color="primary" @click="downloadBody">Download</v-btn>
                        </v-card-actions>
                    </v-card>

                    <v-card class="mt-2" title="Submission Types">
                        <v-card-text>
                            <v-chip v-for="tag in metadata.submission_types" class="mr-2">
                                {{ { online_text_entry: "Text entry", online_url: "URL", media_recording: "Media recording", student_annotation: "Annotation", online_upload: "File upload" }[tag] }}
                            </v-chip>
                        </v-card-text>
                    </v-card>
                </div>

                <div class="ma-2">
                    <v-alert v-if="metadata.omit_from_final_grade" icon="mdi-alert-circle" text="This assignment does not count toward the final grade" color="primary"></v-alert>
                </div>

                <div class="ma-2">
                    <v-card class="light" v-if="loaded">
                        <div v-html="body" class="pa-5 ma-4"></div>
                    </v-card>

                    <v-alert icon="mdi-check" text="This assignment has already been submitted" class="mt-2" v-if="metadata.has_submitted_submissions"></v-alert>

                    <v-card class="mt-2" title="Submit" v-if="loaded && !metadata.has_submitted_submissions">
                        <v-tabs fixed-tabs color="primary" v-model="submission_tabs">
                            <v-tab v-for="tag in metadata.submission_types" :value="tag">
                                {{ { online_text_entry: "Text entry", online_url: "URL", media_recording: "Media recording", student_annotation: "Annotation", online_upload: "File upload" }[tag] }}
                            </v-tab>
                        </v-tabs>
                        <v-card-text>
                            <v-tabs-window v-model="submission_tabs">
                                <v-tabs-window-item value="online_text_entry">
                                    <iclms-editor v-model="editor"></iclms-editor>
                                </v-tabs-window-item>

                                <v-tabs-window-item value="online_url">
                                    <v-text-field label="URL" v-model="url_input" variant="outlined"></v-text-field>
                                    <v-textarea v-model="url_comments" label="Comments" variant="outlined"></v-textarea>
                                </v-tabs-window-item>

                                <v-tabs-window-item value="media_recording">
                                    <v-empty-state
                                    icon="mdi-alert-circle"
                                    headline="Not supported"
                                    title="icLMS does not support media recording. Please use the official Canvas app or website."
                                    ></v-empty-state>
                                </v-tabs-window-item>

                                <v-tabs-window-item value="student_annotation">
                                    <v-empty-state
                                    icon="mdi-alert-circle"
                                    headline="Not supported"
                                    title="icLMS does not support student annotations. Please use the official Canvas app or website."
                                    ></v-empty-state>
                                </v-tabs-window-item>

                                <v-tabs-window-item value="online_upload">
                                    <v-file-input
                                    variant="outlined"
                                    label="Upload files"
                                    v-model="file_upload_input"
                                    multiple
                                    counter
                                    show-size
                                    :accept="metadata.allowed_extensions ? metadata.allowed_extensions.map(ext => `.${ext}, */*`).join(', ') : ''"
                                    ></v-file-input>
                                    <v-textarea v-model="file_comments" label="Comments" variant="outlined"></v-textarea>
                                </v-tabs-window-item>
                            </v-tabs-window>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" variant="outlined" :disabled="submission_tabs == 'media_recording' || submission_tabs == 'student_annotation' || submission_working" :loading="submission_working" @click="submitAssignment">
                                Submit
                                {{ { online_text_entry: "Text entry", online_url: "URL", media_recording: "Media recording", student_annotation: "Annotation", online_upload: "File upload" }[submission_tabs] }}
                            </v-btn>
                        </v-card-actions>
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
    import iclmsTopNav from "@/components/iclms-top-nav.vue";

    import { ref } from "vue";
    import { GET, POST, RAWPOST, RAWGET } from "../api.js";
    import { useRoute } from "vue-router";

    const route = useRoute();

    const body = ref("");
    const metadata = ref({});
    const loaders = ref([0,0,0,0,0,0,0,0]);
    const loaded = ref(false);
    const source_dialog = ref(false);
    const submission_tabs = ref("");

    const url_input = ref("");
    const url_comments = ref("");
    const file_upload_input = ref([]);
    const editor = ref("");
    const file_comments = ref("");

    const submission_working = ref(false);

    const errorbar = ref(false);
    const errormsg = ref("");
    const infobar = ref(false);
    const infomsg = ref("");

    (async () => {
        let url = `/courses/${route.query.course_id}/assignments/${route.query.assignment_id}`;

        // get the page content
        let assignment_res = await GET(url, localStorage.api_host, localStorage.api_key);
        body.value = assignment_res.description == "" ? "<i>No assignment description provided</i>": assignment_res.description;
        loaders.value = [];
        loaded.value = true;
        metadata.value = assignment_res;
    })();

    const downloadBody = () => {
        let a = document.createElement("a");
        let file = new Blob([body.value], {type: "text/plain"});
        a.href = URL.createObjectURL(file);
        a.download = `${metadata.value.name}.html`;
        a.click();
    }

    const submitAssignment = async () => {
        try {
            // change button to loading state
            submission_working.value = true;

            // get the submission type
            let submission_type = submission_tabs.value;
            if(submission_type == "online_upload") {
                // iterate over each file
                let fileIds = [];

                for (const file of file_upload_input.value) {
                    // upload file

                    let multipart = {
                        name: file.name,
                        size: file.size,
                        parent_folder_path: "/"
                    }

                    let res = await POST(`/users/self/files`,
                        localStorage.api_host, localStorage.api_key,
                        multipart, "multipart/form-data"
                    );

                    let url = res.upload_url;
                    let multipart2 = new FormData();

                    multipart2.append("filename", file.name);
                    multipart2.append("file", file);

                    infobar.value = true;
                    infomsg.value = `Uploading file ${file.name}`;

                    let res2 = await RAWPOST(url,
                        multipart2
                    );

                    infobar.value = true;
                    infomsg.value = `Uploaded file ${file.name}`;

                    let json = await res2.json();

                    if(res2.status < 400 && res2.status >= 300) {
                        await RAWGET(res2.headers.get("Location"));
                    }

                    fileIds.push(json.id);
                }

                // submit assignment
                let submission_post = await POST(
                    `/courses/${route.query.course_id}/assignments/${route.query.assignment_id}/submissions`,
                    localStorage.api_host, localStorage.api_key,
                    {
                        comment: file_comments.value,
                        submission: {
                            submission_type: "online_upload",
                            file_ids: fileIds
                        }
                        
                    },
                    "application/json"
                );
            }

            metadata.value.has_submitted_submissions = true;
        } catch(err) {
            errormsg.value = err.message;
            errorbar.value = true;
        }
        submission_working.value = false;
    }
</script>