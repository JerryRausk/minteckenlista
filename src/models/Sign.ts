export default class Sign {
  id: number;
  word: string;
  category: string;

  constructor(id: number, word: string, category: string) {
    (this.id = id), (this.word = word), (this.category = category);
  }
}

export class SignWithMeta extends Sign {
  selected: boolean;

  constructor(id: number, word: string, category: string, selected: boolean) {
    super(id, word, category);
    this.selected = selected;
  }
  static fromSign(sign: Sign, selected: boolean) {
    return new SignWithMeta(sign.id, sign.word, sign.category, selected);
  }
}
