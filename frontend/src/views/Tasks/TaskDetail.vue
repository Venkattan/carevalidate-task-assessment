<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Task Detail</h1>
    <p>Task ID: {{ id }}</p>
    <p>This component is under development...</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string
}>()
</script>
