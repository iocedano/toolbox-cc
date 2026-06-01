const { expect } = require('chai');
const downloadCsv = require('./download-csv');

function createMockGet({ statusCode, body, error }) {
  return (url, options, callback) => {
    const onResponse = typeof options === 'function' ? options : callback;
    const req = {
      on(event, handler) {
        if (event === 'error' && error) {
          handler(error);
        }
      },
    };

    if (error) {
      return req;
    }

    const res = {
      statusCode,
      resume() {},
      on(event, handler) {
        if (event === 'data' && body) {
          handler(Buffer.from(body));
        }
        if (event === 'end') {
          handler();
        }
      },
    };

    onResponse(res);
    return req;
  };
}

describe('downloadCsv', () => {
  it('rejects when the download fails with a network error', async () => {
    const get = createMockGet({ error: new Error('ENOTFOUND') });

    await expect(
      downloadCsv('http://example.com/file.csv', { get })
    ).to.be.rejectedWith(/ENOTFOUND/);
  });

  it('rejects when the server returns an error status', async () => {
    const get = createMockGet({ statusCode: 404 });

    await expect(
      downloadCsv('http://example.com/file.csv', { get })
    ).to.be.rejectedWith(/Download failed with status 404/);
  });

  it('returns empty string when downloaded file is empty', async () => {
    const get = createMockGet({ statusCode: 200, body: '' });

    const body = await downloadCsv('http://example.com/empty.csv', { get });

    expect(body).to.deep.equal('');
  });
});
