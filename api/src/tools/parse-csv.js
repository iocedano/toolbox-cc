/**
 * Parses a CSV string into an array of objects with headers as keys.
 * Invalid rows (wrong column count) and empty lines are discarded.
 * @param {string} csvString - The CSV string to parse
 * @param {Object} options - The options to pass to the parseCsv function
 * @param {boolean} options.ignoreLinesWithErrors - If true, lines that does not match the number of columns will be ignored
 * @param {string[]} options.ignoreColumns - The columns to ignore
 * @returns {Object[]} Rows keyed by header names
 */
function parseCsv(csvString, options = {
  ignoreLinesWithErrors: false,
  ignoreColumns: []
}) {
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

  const headers = lines[0].split(',');

  return lines.slice(1).reduce((rows, line) => {
    let values = line.split(',')

    if (options.ignoreLinesWithErrors) {
      values = values.filter(Boolean);
    }

    if (values.length !== headers.length) {
      return rows;
    }

    const row = headers.reduce((acc, header, index) => {
      if (options.ignoreColumns.includes(header.toLowerCase())) {
        return acc;
      }
      acc[header] = values[index];
      return acc;
    }, {});

    rows.push(row);
    return rows;
  }, []);
}


module.exports = parseCsv;