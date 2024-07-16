<template>
    <v-dialog v-model="about_dialog">
        <v-card title="About icLMS">
            <v-card-text>
                <v-card variant="tonal">
                    <v-card-text>
                        icLMS (Improved Canvas Learning Management System) v1.1.0<br>
                    </v-card-text>
                </v-card>
                <br>
                <v-card title="MIT License" variant="tonal">
                    <v-card-text>
                        Copyright &copy; 2024 infinity-atom
                        <br><br>
                        Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
                        <br><br>
                        The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
                        <br><br>
                        THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                    </v-card-text>
                </v-card>
                <br>
                <v-card title="Credits" variant="tonal">
                    <v-card-text>
                        The following libraries were used to create icLMS
                        <v-list>
                            <v-list-item title="Vue.js" subtitle="MIT License - Copyright &copy; 2013-present, Yuxi (Evan) You"></v-list-item>
                            <v-list-item title="Vuetify" subtitle="MIT License - Copyright &copy; 2016-2023 John Jeremy Leider"></v-list-item>
                            <v-list-item title="Electron" subtitle="MIT License - Copyright &copy; Electron contributors and 2013-2020 GitHub Inc."></v-list-item>
                            <v-list-item title="electron-builder" subtitle="MIT License - Copyright &copy; 2015 Loopline Systems"></v-list-item>
                            <v-list-item title="Material Design Icons" subtitle="Apache License 2.0"></v-list-item>
                            <v-list-item title="Marked" subtitle="MIT License - Copyright &copy; 2018+ MarkedJS, Copyright &copy; 2011-2018 Christopher Jeffrey"></v-list-item>
                            <v-list-item title="Canvas LMS Rest API" subtitle="Provided by Instructure Inc."></v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="about_dialog = false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-navigation-drawer v-model="drawer" temporary>
        <v-list-item title="icLMS" subtitle="v1.1.0"></v-list-item>
        <v-divider></v-divider>

        <v-list-item prepend-icon="mdi-view-dashboard" to="/">Dashboard</v-list-item>
        <v-list-item prepend-icon="mdi-cog" to="/settings">Settings</v-list-item>
        <v-list-item prepend-icon="mdi-help-circle" @click="about_dialog = true">About</v-list-item>

        <v-divider></v-divider>

        <v-tooltip text="If your quota reaches 0, you will not be able to continue using the API">
            <template v-slot:activator="{ props }">
                <v-list-item link v-bind="props" prepend-icon="mdi-cash" title="Remaining Quota" :subtitle="remainingQuota"></v-list-item>
            </template>
        </v-tooltip>

        <v-divider></v-divider>
        <v-list-item v-for="course in courses_nav" :id="course.id" :to="`/goto-course?course_id=${course.id}`" prepend-icon="mdi-book">
            {{ course.name }}
        </v-list-item>
    </v-navigation-drawer>

    <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-app-bar-title>{{ app_name }}</v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="switchTheme" v-if="theme_switcher">
            <v-icon icon="mdi-circle-half-full"></v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script setup>
    import { ref } from "vue";
    import { RESGET, GET } from "../api.js";
    import { useTheme } from "vuetify";

    const theme = useTheme();

    const app_name = ref(localStorage.app_name || "icLMS");

    const drawer = ref(false);

    const about_dialog = ref(false);

    const remainingQuota = ref("?");

    const courses_nav = ref([]);
    (async () => {
        courses_nav.value = await GET("/courses", localStorage.api_host, localStorage.api_key);

        remainingQuota.value = (await RESGET("/courses", localStorage.api_host, localStorage.api_key)).headers.get("X-Rate-Limit-Remaining");
    })();

    const switchTheme = () => {
        theme.global.name.value = theme.global.name.value == "light" ? "dark" : "light";
        localStorage.app_mode = theme.global.name.value == "light" ? "Light": "Dark";
    }
</script>

<script>
    export default {
        props: {
            theme_switcher: {
                type: Boolean,
                default: false
            }
        }
    }
</script>