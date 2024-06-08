<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
  import { useTheme } from "vuetify";
  const theme = useTheme();

  try {
    theme.global.name.value = localStorage.app_mode.toLowerCase();
  } catch(err) {
    theme.global.name.value = "dark";
  }
</script>
