import { vi, describe, test, expect, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { default as userEvent } from '@testing-library/user-event';
import Header from '.';

const createList = vi.fn();

describe('Header', () => {
  // Render the component with the createList function before the tests
  beforeAll(() => {
    render(<Header createList={createList} />);
  });

  test('renders Add List button', () => {
    expect(screen.getByText('Add List')).toBeDefined();
  });

  test('calls createList when clicked', async () => {
    const user = userEvent.setup();

    await user.click(screen.getByRole('button'));

    expect(createList).toHaveBeenCalled();
  });
});
