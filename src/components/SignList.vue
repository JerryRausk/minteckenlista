<template>
  <div class="signs">
    <table>
      <tr v-for="sign in displayedSigns" :key="sign.id">
        <td class="id">
          <a href="#">{{ sign.id }}</a>
        </td>
        <td>{{ sign.word }}</td>
        <td>{{ sign.category }}</td>
        <td>
          <a
            v-if="!sign.selected"
            @click="$emit('signAdded', sign.id)"
            href="#"
            class="btn add"
            title="Lägg till i aktuell lista"
            >+</a
          >
          <a
            v-else
            @click="$emit('signRemoved', sign.id)"
            href="#"
            class="btn remove"
            title="Ta bort från lista"
            >X</a
          >
        </td>
      </tr>
    </table>
    <div v-if="signs.length > 10">pagination here</div>
  </div>
</template>

<script setup lang="ts">
import { SignWithMeta } from "@/models/Sign";
const props = defineProps<{
  signs: SignWithMeta[];
}>();

defineEmits<{
  (e: "signAdded", signId: number): void;
  (e: "signRemoved", signId: number): void;
}>();
const displayedSigns = props.signs.slice(0, 10);
</script>

<style scoped>
tr {
  border-bottom: 0.8px solid rgba(0, 0, 0, 0.3);
}
tr:nth-child(even) {
  background-color: #f1efef53;
}
.id {
  margin-right: 4px;
  min-width: 1.2rem;
  max-width: 1.2rem;
}
table {
  border-spacing: 0px;
  border-collapse: collapse;
  width: 25vw;
}
.signs {
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  padding: 4px;
}
.btn {
  padding-inline: 4px;
  color: white;
  font-style: normal;
  font-weight: 600;
  border-radius: 4px;
  text-decoration: none;
}
.add {
  background-color: blue;
}

.remove {
  background-color: red;
}
</style>
