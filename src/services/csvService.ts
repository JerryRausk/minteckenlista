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
  const csvDelimiter = ";";
  const rows = csv.split("\n");
  const columns = rows[0].split(";");

  const parsedData: Record<string, string>[] = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i].split(";");
    const rowData: Record<string, string> = {};
    for (let j = 0; j < columns.length; j++) {
      rowData[columns[j]] = row[j] ? row[j] : "";
    }
    parsedData.push(rowData);
  }
  return parsedData;
}
