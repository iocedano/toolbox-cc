const { expect } = require('chai');
const parseCsv = require('./parse-csv');

describe('testing csv parser', () => {
  it('returns empty array for empty input', () => {
    expect(parseCsv('')).to.deep.equal([]);
    expect(parseCsv(null)).to.deep.equal([]);
  });

  it('parses rows into objects keyed by header', () => {
    const csv = 'name,age\nAlice,30\nBob,25';
    expect(parseCsv(csv)).to.deep.equal([
      { name: 'Alice', age: '30' },
      { name: 'Bob', age: '25' },
    ]);
  });

  it('parses file,text,number,hex challenge example', () => {
    const csv = `file,text,number,hex
file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765
file1.csv,AtjW,6,d33a8ca5d36d3106219f66f939774cf5
file1.csv,PNzRfORtKtEDOzmIVrQuSh,74088708,3e29651a63a5202a5661e05a060401fb
file1.csv,d,6173,f9e1bcdb9e3784acc448af34f4727252`;

    expect(parseCsv(csv)).to.deep.equal([
      {
        // file: 'file1.csv',
        text: 'RgTya',
        number: '64075909',
        hex: '70ad29aacf0b690b0467fe2b2767f765',
      },
      {
        // file: 'file1.csv',
        text: 'AtjW',
        number: '6',
        hex: 'd33a8ca5d36d3106219f66f939774cf5',
      },
      {
        // file: 'file1.csv',
        text: 'PNzRfORtKtEDOzmIVrQuSh',
        number: '74088708',
        hex: '3e29651a63a5202a5661e05a060401fb',
      },
      {
        // file: 'file1.csv',
        text: 'd',
        number: '6173',
        hex: 'f9e1bcdb9e3784acc448af34f4727252',
      },
    ]);
  });

  it('returns empty array for empty file (only whitespace or newlines)', () => {
    expect(parseCsv('   \n\n  ')).to.deep.equal([]);
    expect(parseCsv('\n\r\n')).to.deep.equal([]);
  });

  it('returns empty array when file has only the header row', () => {
    expect(parseCsv('file,text,number,hex')).to.deep.equal([]);
    expect(parseCsv('file,text,number,hex\n')).to.deep.equal([]);
  });

  it('discards lines with insufficient columns', () => {
    const csv = `file,text,number,hex
file1.csv,RgTya,64075909
file1.csv,AtjW,6,d33a8ca5d36d3106219f66f939774cf5`;

    expect(parseCsv(csv)).to.deep.equal([
      {
        // file: 'file1.csv',
        text: 'AtjW',
        number: '6',
        hex: 'd33a8ca5d36d3106219f66f939774cf5',
      },
    ]);
  });

  it('discards lines with too many columns', () => {
    const csv = `file,text,number,hex
file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765,extra
file1.csv,AtjW,6,d33a8ca5d36d3106219f66f939774cf5`;

    expect(parseCsv(csv)).to.deep.equal([
      {
        // file: 'file1.csv',
        text: 'AtjW',
        number: '6',
        hex: 'd33a8ca5d36d3106219f66f939774cf5',
      },
    ]);
  });

  it('discards blank lines and keeps valid rows', () => {
    const csv = `file,text,number,hex

file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765

file1.csv,broken,row
file1.csv,AtjW,6,d33a8ca5d36d3106219f66f939774cf5`;

    expect(parseCsv(csv)).to.deep.equal([
      {
        // file: 'file1.csv',
        text: 'RgTya',
        number: '64075909',
        hex: '70ad29aacf0b690b0467fe2b2767f765',
      },
      {
        // file: 'file1.csv',
        text: 'AtjW',
        number: '6',
        hex: 'd33a8ca5d36d3106219f66f939774cf5',
      },
    ]);
  });

  it('returns empty array when all data lines are invalid', () => {
    const csv = `file,text,number,hex
file1.csv,incomplete
another,broken,line`;

    expect(parseCsv(csv)).to.deep.equal([]);
  });
});
