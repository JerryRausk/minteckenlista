<template>
  <div class="home mb-20">
    <h1 class="title m-auto mt-2 mb-4 text-2xl font-semibold">
      {{ store.currentList.PublicName ?? "Min teckenlista" }}
      <span
        class="inline-block rotate-90 cursor-pointer ml-1 text-sm text-gray-500"
        @click="changeListNameModalOpen = true"
        >&#9998;</span
      >
    </h1>

    <div class="w-11/12 max-w-xl mx-auto">
      <ShowSavedSwitch class="mb-2" />
      <WordList />
    </div>
  </div>
  <div class="fixed bottom-0 w-full">
    <Footer />
  </div>
  <Teleport to="body">
    <Transition name="modal">
      <ChangeListNameModal
        :current-name="store.currentList.PublicName ?? ''"
        v-if="changeListNameModalOpen"
        @close-modal="changeListNameModalOpen = false"
        @confirmed="(e) => store.setListName(e)"
      />
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import ChangeListNameModal from "@/components/ChangeListNameModal.vue";
import Footer from "@/components/Footer.vue";
import ShowSavedSwitch from "@/components/ShowSavedSwitch.vue";
import WordList from "@/components/WordList.vue";
import { useWordStore } from "@/stores/wordStore";
import { ref } from "vue";
const store = useWordStore();

const changeListNameModalOpen = ref<boolean>(false);
</script>
<style scoped>
.home {
  height: calc(100vh-4rem);
}
</style>
