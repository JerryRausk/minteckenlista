import Sign from "@/models/Sign";
import CsvReader from "@/services/csvService";

export default class SignService {
  static async getSomeSigns(): Promise<Sign[]> {
    const signs: Sign[] = [];
    const things = await CsvReader.readWords();
    things.map((r) => {
      signs.push(new Sign(parseInt(r.id), r.word, r.categorytitle));
    });
    return signs;
  }
}
