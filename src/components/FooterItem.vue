<template>
  <div class="w-16 h-full justify-center items-center flex cursor-pointer">
    <span class="text-xs font-serif">{{ title }}</span>
    <span class="-mt-1 text-2xl">{{ icon }}</span>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  title?: string;
  icon: string;
}>();
</script>
<style scoped></style>
