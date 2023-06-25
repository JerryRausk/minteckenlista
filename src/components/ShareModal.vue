<template>
  <div class="modal-mask">
    <div class="modal-wrapper" @click.self="emit('closeModal')">
      <div class="modal-container bg-custom-first items-center">
        <div
          v-if="store.currentList.Url !== 'local'"
          class="flex-row gap-2 w-full"
        >
          <input
            class="rounded text-black text-sm w-full"
            type="text"
            :value="currentLocation"
          />
          <font-awesome-icon
            icon="fa-regular fa-copy"
            class="cursor-pointer text-lg border rounded p-1"
            @click="handleCopyUrl()"
          />
        </div>
        <div class="flex-row justify-center gap-2 w-full">
          <button
            type="button"
            class="rounded pb-1 pt-1 bg-custom-success pl-2 pr-2"
            @click="handleCreateNewList()"
          >
            Skapa ny lista
          </button>
          <button
            type="button"
            class="rounded bg-custom-inactive w-fit pt-1 pb-1 pl-2 pr-2"
            @click="emit('closeModal')"
          >
            Stäng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWordStore } from "@/stores/wordStore";
import { computed } from "vue";
const store = useWordStore();
const emit = defineEmits<{
  (e: "closeModal"): void;
}>();
const handleCreateNewList = async () => {
  store.createAndSetNewList();
  emit("closeModal");
};
const currentLocation = computed<string>(() => {
  return `https://minteckenlista.se/?list=${store.currentList.Url}`;
});

const handleCopyUrl = () => {
  navigator.clipboard.writeText(currentLocation.value);
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.25);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 2rem 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
