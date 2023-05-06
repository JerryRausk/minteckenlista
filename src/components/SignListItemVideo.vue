<template>
  <video
    :src="'https://teckensprakslexikon.su.se' + sign.videoUrlSuffix"
    muted
    playsinline
    autoplay
    type="video/mp4"
    preload="metadata"
    loop
    :id="sign.id.toString()"
    @click="handleVideoClicked"
  ></video>
</template>
<script setup lang="ts">
import Sign from "@/models/Sign";
defineProps<{
  sign: Sign;
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
