<template>
  <div class="modal-mask">
    <div class="modal-wrapper" @click.self="emit('closeModal')">
      <div class="modal-container">
        <input
          ref="nameInput"
          v-model="name"
          @keyup.esc="emit('closeModal')"
          @keyup.enter="emit('confirmed', name), emit('closeModal')"
          type="text"
          placeholder="Ge din lista ett namn"
        />
        <button
          type="button"
          class="btn btn-success"
          @click="emit('confirmed', name), emit('closeModal')"
        >
          Spara
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
const emit = defineEmits<{
  (e: "closeModal"): void;
  (e: "confirmed", newName: string): void;
}>();
const props = defineProps<{
  currentName: string;
}>();
const name = ref<string>("");
const nameInput = ref<HTMLInputElement | null>(null);
onMounted(() => {
  name.value = props.currentName;
  nameInput.value?.focus();
});
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
  width: fit-content;
  margin: 0px auto;
  padding: 2rem 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
</style>
