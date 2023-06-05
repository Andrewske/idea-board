import { vi, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { ListType } from '../../types';
import Board from '.';

const mockListsState: ListType[] = [
  {
    id: 'testList1',
    title: 'testList',
    items: [
      {
        id: 'testItem1',
        title: 'Test Item',
        description: 'This is a test item',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
];
const mockSetListsState: () => void = vi.fn();

// Make sure that a list renders correctly
test('should render a list and item correctly', () => {
  render(
    <Board
      listsState={mockListsState}
      setListsState={mockSetListsState}
    />
  );
  expect(screen.findByText('testList')).toBeDefined();
  expect(screen.findByText('Test Item')).toBeDefined();
});
