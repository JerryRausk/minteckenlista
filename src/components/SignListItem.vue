<template>
  <li
    class="list-group-item d-flex justify-content-between align-items-center flex-row"
  >
    <div class="ms-2 me-auto flex-column">
      <div class="fw-bold">{{ StringHelper.CapitalizeFirst(sign.word) }}</div>
    </div>
    <div class="form-check form-switch d-flex">
      <input
        class="form-check-input"
        type="checkbox"
        id="checked"
        v-model="sign.selected"
      />
    </div>
  </li>
</template>
<script setup lang="ts">
import StringHelper from "@/helpers/stringHelper";
import { SignWithMeta } from "@/models/Sign";

const props = defineProps<{
  sign: SignWithMeta;
}>();
</script>
<style scoped>
.form-check-input:checked {
  background-color: #28a745;
}
</style>
