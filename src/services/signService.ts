import Sign from "@/models/Sign";
import CsvReader from "@/services/csvService";

export default class SignService {
  static async getFileSigns(): Promise<Sign[]> {
    const signs: Sign[] = [];
    const things = await CsvReader.readWords();
    things.map((r) => {
      signs.push(
        new Sign(
          parseInt(r.id),
          r["word"],
          r["category-title"],
          r["description"],
          r["video-link"]
        )
      );
    });
    return signs;
  }
}
