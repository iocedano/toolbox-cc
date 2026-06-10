import https from 'https';
``
type FetchOptions = https.RequestOptions & { get?: typeof https.get };


/**
 * Downloads a CSV file from a URL and parses its contents.
 * @param {string} url
 * @param {{ get?: Function }} [options] - Optional http(s).get for testing
 * @returns {Promise<Object[]>}
 */
function downloadCsv(url:string, options: FetchOptions = {}): Promise<string> {
  const { get, ...requestOptions } = options;
  const request = get || https.get;
  
  return new Promise((resolve, reject) => {
    const req = request(url, requestOptions, (res) => {
      if (res.statusCode && res.statusCode >= 400) {
        res.resume();
        reject(new Error(`Download failed with status ${res.statusCode}`));
        return;
      }

      const chunks: Buffer[] = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const body = Buffer.concat(chunks).toString('utf8');
        resolve(body);
      });
    });

    req.on('error', reject);
  });
}

export default downloadCsv;
