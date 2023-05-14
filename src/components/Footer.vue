<template>
  <Teleport to="body">
    <Transition name="modal">
      <ShareModal v-if="shareModalOpen" @close-modal="shareModalOpen = false" />
    </Transition>
    <Transition name="modal">
      <ChangeListNameModal
        :current-name="store.currentList.PublicName ?? ''"
        v-if="changeListNameModalOpen"
        @close-modal="changeListNameModalOpen = false"
        @confirmed="(e) => store.setListName(e)"
      />
    </Transition>
  </Teleport>

  <div class="footer d-flex flex-row">
    <div class="footer-item-group d-flex flex-row">
      <FooterItem
        title="Sparade"
        :icon="savedIcon"
        @click="handleSavedClicked"
      />
    </div>
    <div class="credits">
      <h6 v-if="store.isLoading">Laddar...</h6>
      <h6 v-else-if="store.currentList.Url === 'local'">
        Lokal lista (Offline)
      </h6>
      <h6 v-else-if="!store.currentList.PublicName">
        <span class="list-without-name">Ge listan ett namn →</span>
        <span class="edit-icon" @click="changeListNameModalOpen = true"
          >&#9998;</span
        >
      </h6>
      <h6 v-else>
        {{ store.currentList.PublicName }}
        <span class="edit-icon" @click="changeListNameModalOpen = true"
          >&#9998;</span
        >
      </h6>
      <a href="https://teckensprakslexikon.su.se/" target="_blank"
        >Material från Teckenspråkslexikon</a
      >
    </div>
    <div class="footer-item-group d-flex flex-row">
      <FooterItem title="Dela" icon="✉️" @click="shareModalOpen = true" />
    </div>
  </div>
</template>
<script setup lang="ts">
import ChangeListNameModal from "@/components/ChangeListNameModal.vue";
import FooterItem from "@/components/FooterItem.vue";
import ShareModal from "@/components/ShareModal.vue";
import { useWordStore } from "@/stores/wordStore";
import { computed, ref } from "vue";
const store = useWordStore();

const savedIcon = computed<string>(() => (store.filterSaved ? "❤️" : "🤍"));
const shareModalOpen = ref<boolean>(false);
const changeListNameModalOpen = ref<boolean>(false);

function handleSavedClicked(): void {
  store.toggleFilterSaved();
}
</script>
<style scoped>
.footer {
  position: fixed;
  bottom: 0px;
  width: 100%;
  background-color: rgba(240, 240, 240, 0.98);
  height: 4em;
  margin-top: 8px;
  padding-inline: 12px;
  border-top: 1px solid rgba(200, 200, 200, 0.99);
  justify-content: space-between;
}
.credits {
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.75em;
  margin-top: 4px;
  text-align: center;
}

.edit-icon {
  display: inline-block;
  transform: rotateZ(90deg);
  cursor: pointer;
  margin-left: 4px;
}

.list-without-name {
  color: grey;
}
</style>
