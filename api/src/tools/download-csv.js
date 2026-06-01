const https = require('https');
const parseCsv = require('./parse-csv');

/**
 * Downloads a CSV file from a URL and parses its contents.
 * @param {string} url
 * @param {{ get?: Function }} [options] - Optional http(s).get for testing
 * @returns {Promise<Object[]>}
 */
function downloadCsv(url, options = {}) {
  const request = options.get || https.get;
  
  return new Promise((resolve, reject) => {
    const req = request(url, options, (res) => {
      if (res.statusCode >= 400) {
        res.resume();
        reject(new Error(`Download failed with status ${res.statusCode}`));
        return;
      }

      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const body = Buffer.concat(chunks).toString('utf8');
        resolve(body);
      });
    });

    req.on('error', reject);
  });
}

module.exports = downloadCsv;
