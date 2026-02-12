<script setup lang="ts">
defineProps<{
	prop1: string;
}>();
</script>

<template>
	<span>{{ prop1 }}</span>
</template>
