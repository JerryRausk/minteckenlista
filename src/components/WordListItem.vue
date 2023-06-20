<template>
  <div class="flex-col border-gray-200 border rounded-md p-2">
    <div class="justify-between align-center flex-row" @click="toggleOpen">
      <div class="ms-2">
        <h6>{{ StringHelper.CapitalizeFirst(word.word) }}</h6>
      </div>

      <div class="text-xl cursor-pointer" @click="emitSaveToggled">
        <Transition name="bounce" mode="out-in"
          ><span v-if="word.saved">❤️</span><span v-else>🤍</span></Transition
        >
      </div>
    </div>
    <div v-if="open">
      <hr class="mt-4" />
      <ul
        v-if="word.variants.length > 1"
        class="gap-2 mt-3 mb-2 flex flex-row flex-wrap"
      >
        <li
          v-for="(_, index) in word.variants"
          class="rounded text-sm border ps-2 pe-2 pt-0.5 pb-0.5"
          :class="index === activeVariantIndex ? 'bg-green-300' : 'bg-gray-100'"
        >
          <span @click="activeVariantIndex = index"
            >Variant {{ index + 1 }}</span
          >
        </li>
      </ul>
      <div class="text-sm mt-1">
        <span v-if="showVariantDescription"
          >{{ word.variants[activeVariantIndex].description }}
        </span>
      </div>
      <Video
        @click="showVariantDescription = !showVariantDescription"
        :variant="word.variants[activeVariantIndex]"
        >Din webläsare stödjer tyvärr inte video</Video
      >

      <div class="mt-2 ms-1">
        <span
          ><span v-if="!word.userNote" class="text-gray-500"
            >Lägg till en anteckning →</span
          ><span v-else>{{ word.userNote }}</span
          ><font-awesome-icon
            @click="changeNoteModalOpen = true"
            icon="fa-regular fa-edit"
            class="ms-2 cursor-pointer"
        /></span>
        <span class="text-right text-xs mt-2" v-if="word.saved"
          >Sparat {{ word.savedDate.toLocaleString("sv") }}</span
        >
        <Teleport to="body">
          <Transition name="modal">
            <ChangeNoteModal
              v-if="changeNoteModalOpen"
              :current-note="word.userNote"
              @close-modal="changeNoteModalOpen = false"
              @confirmed="(n) => setNewNote(n)"
            ></ChangeNoteModal>
          </Transition>
        </Teleport>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ChangeNoteModal from "@/components/ChangeNoteModal.vue";
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
const showVariantDescription = ref<boolean>(false);
const changeNoteModalOpen = ref<boolean>(false);
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

async function setNewNote(note: string) {
  store.setNote(props.word.word, note);
}
</script>
<style scoped>
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
.user-note {
  margin-top: 8px;
}
.variant-description {
  font-size: 80%;
  margin-top: 4px;
}
.show-variant-link {
  cursor: pointer;
  text-decoration: underline;
  color: #0d6efd;
}
.no-user-note {
  color: grey;
}
.icon {
  margin-left: 12px;
  cursor: pointer;
  font-size: 0.9em;
}

.wrapper {
  flex-direction: column;
  border: 1px solid rgba(0, 0, 75, 0.8);
  border-radius: 8px;
  padding: 8px;
  background: linear-gradient(170deg, rgba(0, 0, 75, 0.1) 0%, white 80px);
}

h6 {
  margin: 0;
}

.saved-date {
  font-size: 0.7rem;
  text-align: right;
}
</style>
