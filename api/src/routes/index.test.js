const request = require('supertest');
const { expect } = require('chai');
const nock = require('nock');
const app = require('../app');


const base = 'https://echo-serv.tbxnet.com';
const apiPrefix = '/v1/secret';

describe('API routes', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  it('GET /files/list returns file list', async () => {
    nock(base)
      .get(`${apiPrefix}/files`)
      .reply(200, { files: ['file1.csv', 'file2.csv'] });

    const res = await request(app)
      .get('/files/list')
      .set('Accept', 'application/json');

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal({ files: ['file1.csv', 'file2.csv'] });
  });

  it('GET /files/data?fileName=file1.csv returns only requested file', async () => {
    nock(base)
      .get(`${apiPrefix}/file/file1.csv`)
      .reply(
        200,
        'file,text,number,hex\nfile1.csv,hello,1,70ad29aacf0b690b0467fe2b2767f765\n'
      );

    const res = await request(app)
      .get('/files/data')
      .query({ fileName: 'file1.csv' })
      .set('Accept', 'application/json');

    expect(res.status).to.equal(200);
    expect(res.body).to.have.length(1);
    expect(res.body[0].file).to.equal('file1.csv');
    expect(res.body[0].lines).to.deep.equal([
      { text: 'hello', number: '1', hex: '70ad29aacf0b690b0467fe2b2767f765' },
    ]);
  });
});