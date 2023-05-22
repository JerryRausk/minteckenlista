<template>
  <div class="modal-mask">
    <div class="modal-wrapper" @click.self="emit('closeModal')">
      <div class="modal-container">
        <textarea
          ref="noteInput"
          v-model="note"
          type="text"
          placeholder="Skriv en anteckning"
          rows="3"
        ></textarea>
        <div class="buttons">
          <button
            type="button"
            class="btn btn-success"
            @click="emit('confirmed', note), emit('closeModal')"
          >
            Spara
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="emit('closeModal')"
          >
            Avbryt
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
const emit = defineEmits<{
  (e: "closeModal"): void;
  (e: "confirmed", newNote: string): void;
}>();
const props = defineProps<{
  currentNote: string;
}>();
const note = ref<string>("");
const noteInput = ref<HTMLInputElement | null>(null);
onMounted(() => {
  note.value = props.currentNote;
  if (noteInput) noteInput.value?.focus();
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
  width: 90%;
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
.buttons {
  flex-direction: row;
  justify-content: space-between;
}

textarea {
  border-radius: 4px;
  resize: none;
}
</style>
