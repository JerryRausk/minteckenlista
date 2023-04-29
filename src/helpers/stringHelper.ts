export default class StringHelper {
  static CapitalizeFirst(s: string): string {
    return s.slice(0, 1).toUpperCase() + s.slice(1, s.length);
  }
}
