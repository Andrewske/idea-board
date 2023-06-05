import { vi, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { default as userEvent } from '@testing-library/user-event';
import Header from '.';

test('renders Add List button', () => {
  const createList = vi.fn();
  render(<Header createList={createList} />);
  expect(screen.getByText('Add List')).toBeDefined();
});

test('calls createList when clicked', async () => {
  const createList = vi.fn();
  render(<Header createList={createList} />);
  const user = userEvent.setup();

  await user.click(screen.getByRole('button'));

  expect(createList).toHaveBeenCalled();
});
