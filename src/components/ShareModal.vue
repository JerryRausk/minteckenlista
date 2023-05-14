<template>
  <div class="modal-mask">
    <div class="modal-wrapper" @click.self="emit('closeModal')">
      <div class="modal-container">
        <div
          v-if="store.currentList.Url !== 'local'"
          class="display-saved-list-url dflex flex-row justify-content-between align-items-center"
        >
          <input class="form-control" type="text" :value="currentLocation" />
          <font-awesome-icon
            icon="fa-regular fa-copy"
            class="icon"
            @click="handleCopyUrl()"
          />
        </div>

        <button
          type="button"
          class="btn btn-success"
          @click="handleCreateNewList()"
        >
          Skapa ny tom delad lista
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="emit('closeModal')"
        >
          Stäng
        </button>
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
  return `https://www.minteckenlista.se/?list=${store.currentList.Url}`;
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
  background-color: rgba(0, 0, 0, 0.5);
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
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.display-saved-list-url {
  gap: 16px;
}
.icon {
  font-size: 1.3rem;
  cursor: pointer;
}
</style>
