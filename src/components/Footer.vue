<template>
  <Teleport to="body">
    <Transition name="modal">
      <ShareModal v-if="shareModalOpen" @close-modal="shareModalOpen = false" />
    </Transition>
  </Teleport>

  <div
    class="bottom-0 absolute w-full h-16 pl-3 pr-3 justify-between flex flex-row bg-custom-first border-t-gray-400"
  >
    <div class="w-2/12"></div>
    <div class="mt-2 text-center w-full place-items-center">
      <Search class="w-48" />
      <a
        class="text-custom-link underline text-xs mt-1"
        href="https://teckensprakslexikon.su.se/"
        target="_blank"
        >Material från Teckenspråkslexikon</a
      >
    </div>
    <div class="w-2/12 items-end">
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
