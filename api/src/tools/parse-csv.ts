/**
 * Parses a CSV string into an array of objects with headers as keys.
 * Invalid rows (wrong column count) and empty lines are discarded.
 * @param {string} csvString - The CSV string to parse
 * @returns {Object[]} Rows keyed by header names
 */
function parseCsv<T>(csvString: string): T[] {
  if (!csvString || csvString.trim() === '') {
    return [];
  }

  const lines = csvString
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length <= 1) {
    return [];
  }

  const headers = lines[0].split(',') as (keyof T)[];

  return lines.slice(1).reduce((rows: T[], line) => {
    const values = line.split(',').filter(Boolean);

    if (values.length !== headers.length) {
      return rows;
    }

    const row = headers.reduce((acc: T, header: keyof T, index: number) => {
      // @TODO: Allow custom data column exclusion
      if (typeof header === 'string' && header.toLowerCase() === 'file') { //  not useful for other file types --
        return acc;
      }
      acc[header] = values[index] as T[keyof T];
      return acc;
    }, {} as T);

    rows.push(row);
    return rows;
  }, [] as T[]);
}


export default parseCsv;