<template>
  <Teleport to="body">
    <Transition name="modal">
      <ShareModal v-if="shareModalOpen" @close-modal="shareModalOpen = false" />
    </Transition>
  </Teleport>

  <div
    class="fixed bottom-0 w-full h-16 mt-2 pl-3 pr-3 justify-between flex flex-row bg-gray-100 border-t-gray-400"
  >
    <div class="w-2/12"></div>
    <div class="justify-between mb-2 mt-1 text-center">
      <Search />
      <a
        class="text-custom-link underline text-xs"
        href="https://teckensprakslexikon.su.se/"
        target="_blank"
        >Material från Teckenspråkslexikon</a
      >
    </div>
    <div class="w-2/12">
      <FooterItem title="Dela" icon="✉️" @click="shareModalOpen = true" />
    </div>
  </div>
</template>
<script setup lang="ts">
import FooterItem from "@/components/FooterItem.vue";
import ShareModal from "@/components/ShareModal.vue";
import { ref } from "vue";
import Search from "./Search.vue";

const shareModalOpen = ref<boolean>(false);
</script>
<style scoped></style>
