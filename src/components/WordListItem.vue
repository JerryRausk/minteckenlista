<template>
  <div class="wrapper">
    <div
      class="list-item-header justify-content-between align-items-center flex-row"
      @click="toggleOpen"
    >
      <div class="ms-2 me-auto flex-column">
        <h6>{{ StringHelper.CapitalizeFirst(word.word) }}</h6>
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
      <div class="variant-description">
        <span class="variant-description-showing" v-if="showVariantDescription"
          >{{ word.variants[activeVariantIndex].description }}
        </span>
      </div>
      <Video
        @click="showVariantDescription = !showVariantDescription"
        :variant="word.variants[activeVariantIndex]"
        >Din webläsare stödjer tyvärr inte video</Video
      >

      <div class="user-note">
        <span
          ><span v-if="!word.userNote" class="no-user-note"
            >Lägg till en anteckning →</span
          ><span v-else>{{ word.userNote }}</span
          ><font-awesome-icon
            @click="changeNoteModalOpen = true"
            icon="fa-regular fa-edit"
            class="icon"
        /></span>
        <span class="saved-date" v-if="word.saved"
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
.saved-icon-container span {
  font-size: 1.25em;
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
