<template>
  <Home :msg="message" />
</template>

<script setup lang="ts">
import Home from "@/views/homeView.vue";
const message = "Hello there";
</script>

<style>
#app {
  background-color: rgba(0, 0, 255, 0.1);
  display: flex;
}
div {
  display: flex;
  flex-direction: column;
  margin: auto;
}
:root {
  background-color: black;
  color: white;
}
</style>
