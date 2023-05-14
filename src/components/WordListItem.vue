<template>
  <li class="list-group-item flex-column">
    <div
      class="list-item-header justify-content-between align-items-center flex-row"
      @click="toggleOpen"
    >
      <div class="ms-2 me-auto flex-column">
        <div class="fw-bold">
          {{ StringHelper.CapitalizeFirst(word.word) }}
        </div>
      </div>

      <div class="saved-icon-container" @click="emitSaveToggled">
        <Transition name="bounce" mode="out-in"
          ><span v-if="word.saved">❤️</span><span v-else>🤍</span></Transition
        >
      </div>
    </div>
    <div class="list-item-body" v-if="open">
      <hr />
      <ul v-if="word.variants.length > 1" class="variant-list d-flex flex-row">
        <li
          v-for="(_, index) in word.variants"
          class="variant-list-item"
          :class="{ 'variant-list-item-active': index === activeVariantIndex }"
        >
          <span @click="activeVariantIndex = index"
            >Variant {{ index + 1 }}</span
          >
        </li>
      </ul>
      <Video :variant="word.variants[activeVariantIndex]"
        >Din webläsare stödjer tyvärr inte video</Video
      >
      {{ word.variants[activeVariantIndex].description }}
    </div>
  </li>
</template>
<script setup lang="ts">
import Video from "@/components/WordListItemVideo.vue";
import StringHelper from "@/helpers/stringHelper";
import Word from "@/models/Word";
import { useWordStore } from "@/stores/wordStore";
import { ref } from "vue";
const props = defineProps<{
  word: Word;
}>();

const emit = defineEmits<{
  (e: "save-toggled", word: string): void;
}>();

const store = useWordStore();
const open = ref<Boolean>(false);
const activeVariantIndex = ref<number>(0);

async function toggleOpen() {
  if (props.word.variants.length === 0) {
    await store.setWordVariantsToWord(props.word.id);
  }
  open.value = !open.value;
}

function emitSaveToggled(e: Event) {
  e.stopPropagation();
  emit("save-toggled", props.word.word);
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
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
