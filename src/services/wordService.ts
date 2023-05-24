import Word from "@/models/Word";
import CsvReader from "@/services/csvService";

export default class WordService {
  static async getFileWords(): Promise<Word[]> {
    const words: Word[] = [];
    const things = await CsvReader.readWords();
    things.map((r: Record<string, string>) => {
      words.push(
        new Word(
          parseInt(r.wordId),
          r.word,
          r["category-title"]
            ? r["category-title"].split(" / ")[0]
            : "Okategoriserat",
          new Date(1980, 1, 1)
        )
      );
    });
    return words;
  }
}
