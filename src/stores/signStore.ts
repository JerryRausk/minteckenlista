import Sign, { SignWithMeta } from "@/models/Sign";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSignStore = defineStore("signStore", () => {
  const currentSigns = ref<Sign[]>([]);
  const selectedSigns = ref<number[]>([]);

  function addCurrentSign(sign: Sign): void {
    currentSigns.value.push(sign);
  }

  function getSigns(): SignWithMeta[] {
    return currentSigns.value.map((s) => {
      const selected = selectedSigns.value.includes(s.id);
      return SignWithMeta.fromSign(s, selected);
    });
  }

  function getSelectedSigns(): SignWithMeta[] {
    const signs: Sign[] = currentSigns.value.filter((sign) =>
      selectedSigns.value.includes(sign.id)
    );
    return signs.map((s) => {
      const selected = selectedSigns.value.includes(s.id);
      return SignWithMeta.fromSign(s, selected);
    });
  }

  return {
    currentSigns,
    selectedSigns,
    addCurrentSign,
    getSigns,
    getSelectedSigns,
  };
});
