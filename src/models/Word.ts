export default class Word {
  id: number;
  word: string;
  category: string;
  variants: WordVariant[];
  saved: boolean;
  constructor(id: number, word: string, category: string) {
    (this.id = id),
      (this.word = word),
      (this.category = category),
      (this.variants = []),
      (this.saved = false);
  }

  setNewVariant(wordVariant: WordVariant) {
    this.variants.push(wordVariant);
  }

  getVariantById(variantId: number) {
    return this.variants.find((v) => v.id == variantId) ?? null;
  }
}

export class WordVariant {
  id: number;
  description: string;
  urlSuffix: string;
  videoUrlSuffix: string;

  constructor(
    id: number,
    description: string,
    urlSuffix: string,
    videoUrlSuffix: string
  ) {
    (this.id = id),
      (this.description = description),
      (this.urlSuffix = urlSuffix),
      (this.videoUrlSuffix = videoUrlSuffix);
  }
}
