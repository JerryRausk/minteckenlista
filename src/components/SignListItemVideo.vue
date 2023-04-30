<template>
  <video
    :src="'https://teckensprakslexikon.su.se' + sign.videoUrlSuffix"
    muted
    playsinline
    type="video/mp4"
    controls
    :id="sign.id.toString()"
  ></video>
</template>
<script setup lang="ts">
import Sign from "@/models/Sign";
import { onMounted } from "vue";
const props = defineProps<{
  sign: Sign;
}>();

onMounted(async () => {
  playVideoWithDelay();
});

async function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function playVideoWithDelay() {
  const video = <HTMLVideoElement>(
    document.getElementById(props.sign.id.toString())
  );
  if (video) {
    video.addEventListener("canplay", async () => {
      await timeout(1500);
      video.play();
    });
  }
}
</script>
