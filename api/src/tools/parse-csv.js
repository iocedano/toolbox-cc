/**
 * Parses a CSV string into an array of objects with headers as keys.
 * Invalid rows (wrong column count) and empty lines are discarded.
 * @param {string} csvString - The CSV string to parse
 * @returns {Object[]} Rows keyed by header names
 */
function parseCsv(csvString) {
  if (!csvString || typeof csvString !== 'string' || csvString.trim() === '') {
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
    /**
     * Tener en cuenta que:
- Pueden existir archivos vacíos y líneas con error (que no tenga la cantidad de datos suficientes).
- Si una línea tiene error se debe descartar la misma.
- También pueden existir errores al descargar un archivo.
     */
    // @TODO: Could be a callback to handle lines : allowing the function to be more flexible
    const values = line.split(',').filter(Boolean);

    if (values.length !== headers.length) {
      return rows;
    }

    const row = headers.reduce((acc, header, index) => {
      // @TODO: Allow custom data column exclusion
      if (header.toLowerCase() === 'file') { //  not useful for other file types --
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