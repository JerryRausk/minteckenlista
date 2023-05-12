<template>
  <video
    :src="'https://teckensprakslexikon.su.se' + variant.videoUrlSuffix"
    muted
    playsinline
    autoplay
    type="video/mp4"
    preload="metadata"
    loop
    :id="variant.id.toString()"
    @click="handleVideoClicked"
  ></video>
</template>
<script setup lang="ts">
import { WordVariant } from "@/models/Word";
defineProps<{
  variant: WordVariant;
}>();

function handleVideoClicked(e: Event) {
  e.stopPropagation();
}
</script>
<style scoped>
video {
  margin-bottom: 8px;
}
</style>
