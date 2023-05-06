<template>
  <div class="footer-item">
    <span class="footer-item-title">{{ title }}</span>
    <span class="footer-item-icon">{{ icon }}</span>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  title?: string;
  icon: string;
}>();
</script>
<style scoped>
.footer-item {
  width: 4em;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;
}
.footer-item-icon {
  margin-top: -2px;
  font-size: 1.5em;
}
.footer-item-title {
  font-size: 0.75em;
  font-family: Georgia, "Times New Roman", Times, serif;
}
</style>
