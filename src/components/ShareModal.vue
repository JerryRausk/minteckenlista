<template>
  <div class="modal-mask" @click="emit('closeModal')">
    <div class="modal-wrapper">
      <div class="modal-container">
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
import ApiService from "@/services/apiService";
import { List } from "@prisma/client";

const emit = defineEmits<{
  (e: "closeModal"): void;
}>();
const handleCreateNewList = async () => {
  const list: List = await ApiService.CreateNewSharedList();
  window.location.href = `/?list=${list.url}`;
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
</style>
