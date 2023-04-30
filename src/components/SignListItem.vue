<template>
  <li class="list-group-item d-flex flex-column" @click="toggleOpen">
    <div
      class="list-item-header justify-content-between align-items-center flex-row"
    >
      <div class="ms-2 me-auto flex-column">
        <div class="fw-bold">{{ StringHelper.CapitalizeFirst(sign.word) }}</div>
      </div>

      <div class="saved-icon-container" @click="emitSaveToggled()">
        <span v-if="sign.selected">❤️</span>
        <span v-else>🤍</span>
      </div>
    </div>
    <div class="list-item-body" v-if="open">
      <Video :sign="sign.signs[0]" />
      {{ sign.signs[0].description }}
    </div>
  </li>
</template>
<script setup lang="ts">
import Video from "@/components/SignListItemVideo.vue";
import StringHelper from "@/helpers/stringHelper";
import { SignWithMeta } from "@/models/Sign";
import { ref } from "vue";
const props = defineProps<{
  sign: SignWithMeta;
}>();

const emit = defineEmits<{
  (e: "save-toggled", word: string): void;
}>();

const open = ref<Boolean>(false);

function toggleOpen() {
  open.value = !open.value;
}

function emitSaveToggled() {
  emit("save-toggled", props.sign.word);
}
</script>
<style scoped>
.saved-icon-container span {
  font-size: 1.5em;
  cursor: pointer;
}
</style>
