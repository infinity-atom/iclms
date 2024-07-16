<template>
	<v-list-item :class="top ? '' : 'bl'">
		<div class="d-flex align-center justify-between">
			<div>
				<small>{{ reply.username }}</small><br>
				<span v-html="reply.message"></span>
			</div>
			<v-btn small variant="text" color="primary" icon="mdi-reply" class="ml-2 show-on-hover"></v-btn>
		</div>

		<iclms-discussion-reply v-for="reply in reply.replies" :reply="reply" />
	</v-list-item>
</template>

<style scoped>
	.bl {
		border-left: 1px solid currentColor;
		padding-left: 5px;
		margin-left: 5px;
	}

	.show-on-hover {
		opacity: 0;
	}

	.show-on-hover:hover {
		opacity: 1;
	}
</style>

<script setup>
	import { defineProps } from "vue";

	const props = defineProps({
		reply: {
			type: Object,
			required: true
		},
		top: {
			type: Boolean,
			default: false
		}
	});
</script>