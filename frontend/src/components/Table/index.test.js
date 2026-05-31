import { render, screen } from '@testing-library/react';
import Table from './index';
describe('Table', () => {
  it('renders headers', () => {
    render(
      <Table headers={['File Name', 'Text', 'Number', 'Hex']}>
        <tr><td>row</td></tr>
      </Table>
    );
    expect(screen.getByText('File Name')).toBeInTheDocument();
    expect(screen.getByText('Hex')).toBeInTheDocument();
  });
});
