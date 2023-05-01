<template>
  <li class="list-group-item flex-column">
    <div
      class="list-item-header justify-content-between align-items-center flex-row"
      @click="toggleOpen"
    >
      <div class="ms-2 me-auto flex-column">
        <div class="fw-bold">
          {{ StringHelper.CapitalizeFirst(sign.word) }}
        </div>
      </div>

      <div class="saved-icon-container" @click="emitSaveToggled">
        <span v-if="sign.selected">❤️</span>
        <span v-else>🤍</span>
      </div>
    </div>
    <div class="list-item-body" v-if="open">
      <hr />
      <ul v-if="sign.signs.length > 1" class="variant-list d-flex flex-row">
        <li
          v-for="(variant, index) in sign.signs"
          class="variant-list-item"
          :class="{ 'variant-list-item-active': index === activeVariant }"
        >
          <span @click="activeVariant = index">Variant {{ index + 1 }}</span>
        </li>
      </ul>
      <Video :sign="sign.signs[activeVariant]"
        >Din webläsare stödjer tyvärr inte video</Video
      >
      {{ sign.signs[activeVariant].description }}
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
const activeVariant = ref<number>(0);

function toggleOpen() {
  open.value = !open.value;
}

function emitSaveToggled(e: Event) {
  e.stopPropagation();
  emit("save-toggled", props.sign.word);
}
</script>
<style scoped>
.saved-icon-container span {
  font-size: 1.5em;
  cursor: pointer;
}
.variant-list {
  list-style: none;
  padding-left: 0px;
  margin: 0.5em 0;
  gap: 8px;
  flex-wrap: wrap;
}
.variant-list-item {
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding-inline: 4px;
}
.variant-list-item-active {
  background-color: rgba(13, 255, 0, 0.1);
}
.variant-list-item span {
  font-size: 0.8em;
  cursor: pointer;
}
hr {
  margin: 1rem 0 0 0;
}
</style>
