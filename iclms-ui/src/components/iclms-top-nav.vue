<template>
    <v-card>
        <v-card-actions>
            <v-btn :to="`/modules?course_id=${$route.query.course_id}`" color="primary">Modules</v-btn>
            <v-btn :to="`/assignments?course_id=${$route.query.course_id}`" color="primary">Assignments</v-btn>
        </v-card-actions>
    </v-card>
</template>