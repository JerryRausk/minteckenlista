import Sign from "@/models/Sign";

export default class SignService {
  static getSomeSigns(): Sign[] {
    const signs: Sign[] = [];
    for (let i = 0; i < 100; i++) {
      signs.push(new Sign(i, "random", "random"));
    }
    return signs;
  }
}
