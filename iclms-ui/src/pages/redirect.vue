<template>
    <v-app>
        <iclms-navigation></iclms-navigation>

        <v-main>
            <v-card class="ma-4" prepend-icon="mdi-alert" title="External URL redirect">
                <v-card-text>
                    You're about to be redirected to "<code>{{ $route.query.url }}</code>"<br>
                    <br>
                    Are you sure you want to continue?
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" variant="outlined" :to="$route.query.back">Go back</v-btn>
                    <v-btn :href="$route.query.url" target="_blank" @click="$router.push($route.query.back);">Continue</v-btn>
                </v-card-actions>
            </v-card>
        </v-main>
    </v-app>
</template>

<script setup>
    import IclmsNavigation from "../components/iclms-navigation.vue";

    import { ref } from "vue";
</script>