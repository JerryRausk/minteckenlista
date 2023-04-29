<template>
  <div class="footer d-flex flex-row">
    <div class="footer-item-group d-flex flex-row">
      <FooterItem title="Sparade" icon="❤️" @click="handleSavedClicked" />
      <FooterItem title="Sök" icon="🔍" @click="handleSearchClicked" />
    </div>
    <div class="footer-item-group d-flex flex-row">
      <FooterItem title="Dela" icon="✉️" @click="handleShareClicked" />
    </div>
  </div>
</template>
<script setup lang="ts">
import FooterItem from "@/components/FooterItem.vue";
import { useSignStore } from "@/stores/signStore";
const store = useSignStore();

function handleSavedClicked(): void {
  store.displaySaved = true;
}
function handleSearchClicked(): void {
  store.displaySaved = false;
}
function handleShareClicked(): void {
  console.log("Share clicked");
}
</script>
<style scoped>
.footer {
  position: fixed;
  bottom: 0px;
  width: 100%;
  background-color: rgba(240, 240, 240, 0.98);
  height: 4em;
  margin-top: 8px;
  padding-inline: 12px;
  border-top: 1px solid rgba(200, 200, 200, 0.99);
  justify-content: space-between;
}
</style>
