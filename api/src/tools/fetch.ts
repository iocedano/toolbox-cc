import https from 'https';

/**
 * Fetches data from a URL and returns a promise.
 * @param {string} url - The URL to fetch data from.
 * @param {Object} options - The options to pass to the fetch function.
 * @returns {Promise<Object>} A promise that resolves to the data from the URL.
 */
function fetch<T>(url: string, options: https.RequestOptions = {}): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    https.get(url, options, (res) => {
      const { statusCode } = res;
    
      if (statusCode && (statusCode < 200 || statusCode >= 300)) {
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
          resolve(parsedData as T);
        } catch (e: unknown) {
          reject(new Error(`Failed to parse JSON: ${e instanceof Error ? e.message : 'Unknown error'}`));
        }
      });
    }).on('error', (e: Error) => {
      reject(new Error(`Request Error: ${e.message}`));
    });
  });
}

export default fetch;