<template>
  <div class="home">
    <h1>This is the main view and this is the message: {{ msg }}</h1>
    <div class="sign-lists">
      <SignList
        :signs="store.getSigns()"
        @sign-added="addSignToSelected"
        @sign-removed="removeSignFromSelected"
        class="sign-list"
      />
      <SignList
        :signs="store.getSelectedSigns()"
        @sign-added="addSignToSelected"
        @sign-removed="removeSignFromSelected"
        class="sign-list"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SignList from "@/components/SignList.vue";
import SignService from "@/services/signService";
import { useSignStore } from "@/stores/signStore";
defineProps<{
  msg: string;
}>();

const store = useSignStore();
store.currentSigns = SignService.getSomeSigns();

const addSignToSelected = (signId: number) => {
  store.selectedSigns.push(signId);
  console.log(store.selectedSigns);
  console.log(store.getSelectedSigns());
};

const removeSignFromSelected = (signIdToRemove: number) => {
  console.log("here");
  store.selectedSigns = store.selectedSigns.filter(
    (signId) => signId !== signIdToRemove
  );
};
</script>
<style scoped>
.home {
  margin: auto;
  padding: 8px;
  height: 100%;
  background-color: rgba(255, 0, 0, 0.1);
}
.sign-lists {
  flex-direction: row;
}
.sign-list {
  margin-top: 8px;
}
</style>
