import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from './index';

describe('Select', () => {
  it('renders options and calls onChange', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <Select
        options={['test9.csv', 'test10.csv']}
        includeAll
        onChange={onChange}
      />
    );
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('test9.csv')).toBeInTheDocument();
    
    await user.selectOptions(screen.getByRole('combobox'), 'test10.csv');
    expect(onChange).toHaveBeenCalled();
  });
});