import { render, screen } from '@testing-library/react';
import FileLine from './TableFileRow';
describe('FileLine', () => {
  it('renders file row data', () => {
    render(
      <table><tbody>
        <FileLine
          fileName="test9.csv"
          text="hello"
          number="123"
          hex="abc"
        />
      </tbody></table>
    );
    expect(screen.getByText('test9.csv')).toBeInTheDocument();
    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('abc')).toBeInTheDocument();
  });
});