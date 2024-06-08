<template>
    <v-app>
        <iclms-navigation></iclms-navigation>

        <v-dialog v-model="helpDialog" max-width="500">
            <v-card prepend-icon="mdi-help-circle" title="Help">
                <v-card-text>
                    <p>
                        To locate your API endpoint, login to Canvas LMS and append <code>/api/v1</code> to the end of the URL.
                    </p>
                    <p>
                        <v-card variant="tonal">
                            <v-card-title>Example</v-card-title>
                            <v-card-text>
                                <p>
                                    If your LMS URL is <code>https://example.com</code>, your API endpoint would be <code>https://example.com/api/v1</code>.
                                </p>
                            </v-card-text>
                        </v-card>
                    </p>
                    <p>
                        To generate an API key, login to Canvas LMS and locate
                        Profile
                        <v-icon icon="mdi-chevron-right"></v-icon>
                        Settings
                        <v-icon icon="mdi-chevron-right"></v-icon>
                        Approved Integrations
                        <v-icon icon="mdi-chevron-right"></v-icon>
                        New Access Token.
                    </p>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="helpDialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="settingsNotification" :timeout=2000>
            Settings saved. You may have to restart the app for changes to take effect.
            <template v-slot:actions>
                <v-btn text @click="settingsNotification = false">Close</v-btn>
            </template>
        </v-snackbar>

        <v-main>
            <div class="pa-4 d-flex align-center flex-column">
                <v-card width="50%" elevation="12" class="mt-2 mb-2">
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="saveSettings">Save all</v-btn>
                    </v-card-actions>
                </v-card>

                <v-card width="50%" elevation="12" class="mt-2 mb-2" title="API">
                    <v-card-text>
                        <v-text-field label="API host" v-model="api_host" variant="outlined"></v-text-field>
                        <v-text-field label="API key" v-model="api_key" variant="outlined"></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn icon="mdi-help-circle" @click="helpDialog = true"></v-btn>
                    </v-card-actions>
                </v-card>
                <v-card width="50%" elevation="12" class="mt-2 mb-2" title="Appearance">
                    <v-card-text>
                        <v-text-field label="App Name" v-model="app_name" variant="outlined"></v-text-field>
                        <v-select label="Appearance mode" :items="['Light', 'Dark']" variant="outlined" v-model="app_mode"></v-select>
                    </v-card-text>
                </v-card>
                <v-card width="50%" elevation="12" class="mt-2 mb-2" title="Modules View">
                    <v-card-text>
                        <v-switch label="Enable indents" color="primary" v-model="indent_enable"></v-switch>
                    </v-card-text>
                </v-card>

                <v-card width="50%" elevation="12" class="mt-2 mb-2">
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="saveSettings">Save all</v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </v-main>
    </v-app>
</template>

<script setup>
    import IclmsNavigation from "../components/iclms-navigation.vue";

    import { ref } from "vue";
    import { useTheme } from "vuetify";

    const theme = useTheme();

    const app_name = ref(localStorage.app_name || "icLMS");
    const api_host = ref(localStorage.api_host || "");
    const api_key = ref(localStorage.api_key || "");
    const app_mode = ref(localStorage.app_mode || "Dark");
    const indent_enable = ref(localStorage.indent_enable != "false");

    const helpDialog = ref(false);
    const settingsNotification = ref(false);

    const saveSettings = () => {
        localStorage.app_name = app_name.value;
        localStorage.api_host = api_host.value;
        localStorage.api_key = api_key.value;
        localStorage.app_mode = app_mode.value;
        localStorage.indent_enable = indent_enable.value;

        theme.global.name.value = app_mode.value.toLowerCase();

        // show snackbar
        settingsNotification.value = true;
    };
</script>