<script setup>
    import { useRoute, useRouter } from "vue-router";
    import { ref } from "vue";
    import { GET } from "../api.js";

    const route = useRoute();
    const router = useRouter();

    router.push(`/modules?course_id=${route.query.course_id}`);
</script>