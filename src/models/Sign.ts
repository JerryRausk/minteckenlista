export default class Sign {
  id: number;
  word: string;
  category: string;
  description: string;
  videoUrlSuffix: string;

  constructor(
    id: number,
    word: string,
    category: string,
    description: string,
    videoUrlSuffix: string
  ) {
    (this.id = id),
      (this.word = word),
      (this.category = category),
      (this.description = description);
    this.videoUrlSuffix = videoUrlSuffix;
  }
}

export class SignWithMeta {
  word: string;
  category: string;
  selected: boolean;
  signs: Sign[];

  constructor(
    word: string,
    category: string,
    selected: boolean,
    signs: Sign[]
  ) {
    this.word = word;
    this.category = category;
    this.selected = selected;
    this.signs = signs;
  }
}
