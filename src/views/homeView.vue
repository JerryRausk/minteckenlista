<template>
  <div class="home">
    <h1 class="title">
      {{ store.currentList.PublicName ?? "Min teckenlista" }}
    </h1>
    <div>
      <WordList />
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import Footer from "@/components/Footer.vue";
import WordList from "@/components/WordList.vue";
import { useWordStore } from "@/stores/wordStore";
const store = useWordStore();
</script>
<style scoped>
.home {
  min-height: 100vh;
  padding-bottom: 6em;
}
.title {
  margin-inline: auto;
}
</style>
