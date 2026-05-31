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

  it('returns parsed rows when download succeeds', async () => {
    const body = `file,text,number,hex
file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765`;

    const get = createMockGet({ statusCode: 200, body });

    const rows = await downloadCsv('http://example.com/file.csv', { get });

    expect(rows).to.deep.equal([
      {
        // file: 'file1.csv',
        text: 'RgTya',
        number: '64075909',
        hex: '70ad29aacf0b690b0467fe2b2767f765',
      },
    ]);
  });

  it('returns empty array when downloaded file is empty', async () => {
    const get = createMockGet({ statusCode: 200, body: '' });

    const rows = await downloadCsv('http://example.com/empty.csv', { get });

    expect(rows).to.deep.equal([]);
  });
});
