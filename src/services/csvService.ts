export default class CsvReader {
  static async readWords() {
    const data = await fetch("/words.csv")
      .then((response) => response.text())
      .then((d) => {
        return parseAndCleanCSV(d);
      });
    data.sort((a, b) => a["word"].localeCompare(b["word"]));
    return data;
  }
}

function parseAndCleanCSV(csv: string): Record<string, string>[] {
  const rows = csv.split("\n");
  const columns = rows[0]
    .replaceAll('"', "") // Sometime strings are wrapped in "
    .split(",")
    .map((s) => s.trim()); // Sometime there are extra spaces

  const parsedData: Record<string, string>[] = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i].split(",");
    const rowData: Record<string, string> = {};
    for (let j = 0; j < columns.length; j++) {
      rowData[columns[j]] = row[j] ? row[j].replace('"', "").trim() : "";
    }
    if (rowData["word"] && rowData["word"] !== "Hittades ej") {
      parsedData.push(rowData);
    }
  }
  return parsedData;
}
