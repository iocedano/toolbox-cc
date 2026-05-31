const https = require('https');
// NODE fetch 
/**
 * Fetches data from a URL and returns a promise.
 * @param {string} url - The URL to fetch data from.
 * @param {Object} options - The options to pass to the fetch function.
 * @returns {Promise<Object>} A promise that resolves to the data from the URL.
 */
function fetch(url, options = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, options, (res) => {
      const { statusCode } = res;
    
      if (statusCode < 200 || statusCode >= 300) {
        reject(new Error(`Status Code: ${statusCode}`));
        res.resume();
        return;
      }

      res.setEncoding('utf8');
      let rawData = '';
      
      res.on('data', (chunk) => {
        rawData += chunk;
      });

      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          resolve(parsedData);
        } catch (e) {
          reject(new Error(`Failed to parse JSON: ${e.message}`));
        }
      });
    }).on('error', (e) => {
      reject(new Error(`Request Error: ${e.message}`));
    });
  });
}

module.exports = fetch;