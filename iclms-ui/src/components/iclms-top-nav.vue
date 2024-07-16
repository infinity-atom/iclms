<template>
    <v-card>
        <v-card-actions>
            <v-btn to="/" color="primary" prepend-icon="mdi-view-dashboard">Dashboard</v-btn>

            <v-spacer></v-spacer>
            
            <v-btn :to="`/modules?course_id=${$route.query.course_id}`" color="primary">Modules</v-btn>
            <v-btn :to="`/assignments?course_id=${$route.query.course_id}`" color="primary">Assignments</v-btn>
            <v-btn :to="`/discussions?course_id=${$route.query.course_id}`" color="primary">Discussions</v-btn>
        </v-card-actions>
    </v-card>
</template>