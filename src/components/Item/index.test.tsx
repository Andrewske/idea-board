import { render, screen } from '@testing-library/react';
import { vi, expect, test } from 'vitest';

import ListItem from './';

const mockEditItem = vi.fn();
const mockDeleteItem = vi.fn();
const mockData = {
  id: '123',
  title: 'Test Title',
  description: 'Test Description',
  createdAt: new Date(),
  updatedAt: new Date(),
};

test('renders without crashing', () => {
  const { getByTestId } = render(
    <ListItem
      data={mockData}
      editItem={mockEditItem}
      deleteItem={mockDeleteItem}
    />
  );
  expect(document.body.contains(getByTestId('container'))).toBeTruthy();
  expect(screen.getByText(mockData.title)).toBeInTheDocument();
});
