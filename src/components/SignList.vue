<template>
  <div class="container flex-column sign-list">
    <input type="text" placeholder="Sök..." />
    <ul class="list-group">
      <SignListItem
        v-for="sign in displayedSigns"
        :key="sign.id"
        :sign="sign"
      ></SignListItem>
    </ul>
    <div class="flex-row justify-content-between">
      <button
        type="button"
        class="pagination-button"
        @click="changePagination(itemsPerPagination * -1)"
      >
        ⬅️
      </button>
      <div class="pagination-showing">
        {{ currentPaginationPosition }} -
        {{
          Math.min(
            currentPaginationPosition + itemsPerPagination,
            store.signsCount
          )
        }}
      </div>
      <button
        type="button"
        class="pagination-button"
        @click="changePagination(itemsPerPagination)"
      >
        ➡️
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import SignListItem from "@/components/SignListItem.vue";
import { useSignStore } from "@/stores/signStore";
import { computed, onMounted, ref } from "vue";

const store = useSignStore();
onMounted(async () => {
  store.initializeSigns();
});

const currentPaginationPosition = ref<number>(0);
const itemsPerPagination = 12;
const displayedSigns = computed(() => {
  if (store.displaySaved) {
    return store.getSelectedSigns();
  }
  return store.getSignsFromRange(
    currentPaginationPosition.value,
    currentPaginationPosition.value + itemsPerPagination
  );
});

const changePagination = (delta: number): void => {
  if (delta < 0 && currentPaginationPosition.value - delta < 0) {
    currentPaginationPosition.value = 0;
  }
  if (delta > 0 && currentPaginationPosition.value + delta > store.signsCount) {
    currentPaginationPosition.value = store.signsCount - itemsPerPagination;
  }
  currentPaginationPosition.value += delta;
};
</script>

<style scoped>
.sign-list {
  min-width: 75%;
  margin: auto;
  max-width: 18em;
}
.icon {
  border: none;
  background-color: transparent;
  font-size: 1.2em;
}
.form-check {
  gap: 4px;
  padding-left: 0;
}

.form-check-input {
  cursor: pointer;
  width: 3em;
  margin-inline: 4px;
  padding: none;
  border: none;
  color: red;
  background-color: transparent;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='black'/%3e%3c/svg%3e");
}
.form-check-input:checked {
  background-color: transparent;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='black'/%3e%3c/svg%3e");
}
.form-check-input:focus {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='black'/%3e%3c/svg%3e");
  box-shadow: none;
}

.pagination-button {
  padding: 4px;
  background-color: transparent;
  border: none;
}
.pagination-showing {
  padding: 4px;
}
</style>
