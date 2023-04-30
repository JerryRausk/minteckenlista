<template>
  <div class="home">
    <h1 class="title">Min teckenlista</h1>
    <div>
      <SignList />
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import Footer from "@/components/Footer.vue";
import SignList from "@/components/SignList.vue";
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
