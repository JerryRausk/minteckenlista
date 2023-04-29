import { SignWithMeta } from "@/models/Sign";
import SignService from "@/services/signService";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useSignStore = defineStore("signStore", () => {
  const signs = ref<SignWithMeta[]>([]);
  const displaySaved = ref<Boolean>(false);
  const signsCount = computed<number>(() => {
    return signs.value.length;
  });
  function setSigns(newSigns: SignWithMeta[]): void {
    signs.value = newSigns;
  }

  function getSelectedSigns(): SignWithMeta[] {
    return signs.value.filter((s) => s.selected);
  }

  async function initializeSigns(): Promise<void> {
    const _signs = await SignService.getSomeSigns();
    _signs.map((s) => signs.value.push(SignWithMeta.fromSign(s, false)));
  }

  function getSignsFromRange(start: number, end: number) {
    return signs.value.slice(start, end);
  }

  function getSignsContaining(s: string): SignWithMeta[] {
    return signs.value.filter((swm) =>
      swm.word.toLowerCase().includes(s.toLowerCase())
    );
  }

  return {
    signs,
    displaySaved,
    signsCount,
    setSigns,
    getSelectedSigns,
    initializeSigns,
    getSignsFromRange,
  };
});
