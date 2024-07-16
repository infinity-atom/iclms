<template>
    <v-dialog fullscreen v-model="preview_html">
        <v-card>
            <v-toolbar>
                <v-toolbar-title>Sanitized HTML</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="preview_html = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <div class="ma-5 code-font">
                {{ sanitized_html }}
            </div>
        </v-card>
    </v-dialog>

    <v-card variant="tonal">
        <v-sheet class="d-flex align-center flex-column">
            <v-switch
                v-model="useHTML"
                prepend-icon="mdi-language-markdown"
                append-icon="mdi-language-html5"
                class=""
            ></v-switch>
            <span>Editor will use <b>{{ useHTML ? "HTML" : "Markdown" }}</b></span>
        </v-sheet>
        <v-card-text>
            <v-textarea
                v-if="!useHTML"
                v-model="markdownContent"
                class="code-editor"
                rows="10"
                variant="outlined"
                no-resize
            ></v-textarea>

            <v-textarea
                v-if="useHTML"
                v-model="model"
                class="code-editor"
                rows="10"
                variant="outlined"
                no-resize
            ></v-textarea>
        </v-card-text>
        <v-card-actions class="px-4">
            <v-btn color="primary" @click="onSubmit(model.value)" v-if="builtinSubmit">Submit</v-btn>
            <v-btn color="primary" :to="`/redirect?back=${$route.fullPath}&url=https://www.markdownguide.org/cheat-sheet/`">
                Markdown Help
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="getPreview(); preview_html = true">Preview HTML</v-btn>
        </v-card-actions>
    </v-card>
</template>

<style scoped>
.code-editor, .code-font {
    font-family: monospace;
}
</style>

<script setup>
import { ref, computed, watch, defineProps } from "vue";
import { useRoute } from "vue-router";
import { marked } from "../marked.js";
import { POST } from "../api.js";

const useHTML = ref(false);
const markdownContent = ref("");
const preview_html = ref(false);
const sanitized_html = ref("Loading...");

const model = defineModel();
model.value = localStorage.editor_content || "";
if(model.value != "") {
    markdownContent.value = model.value;
}

watch(markdownContent, (value) => {
    if(!useHTML.value) {
        model.value = marked.parse(value);
    }
});

watch(useHTML, (value) => {
    if(!value) {
        markdownContent.value = model.value;
    }
});

watch(model, (value) => {
    localStorage.editor_content = value;
});

const route = useRoute();

const getPreview = async () => {
    let cid = route.query.course_id;
    sanitized_html.value = await POST(`/courses/${cid}/preview_html`, localStorage.api_host, localStorage.api_key, new FormData().append("html", model.value), "multipart/form-data").html;
};

defineProps({
    onSubmit: {
        type: Function,
        required: false,
        default: new Function()
    },
    builtinSubmit: {
        type: Boolean,
        required: false,
        default: false
    }
})

</script>