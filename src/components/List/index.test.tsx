import { vi, test, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { default as userEvent } from '@testing-library/user-event';

import List from '.';

// Mock the functions and initial state passed as props

test('List title should change when new title is entered into input', async () => {
  const mockListState = {
    id: '1',
    title: 'Initial Title',
    items: [],
  };
  const mockSetListState = vi.fn();
  const mockDeleteList = vi.fn();

  // Render the List component with mock props
  render(
    <List
      listState={mockListState}
      setListState={mockSetListState}
      deleteList={mockDeleteList}
    />
  );

  const input = screen.getByPlaceholderText('List Title');

  const newTitleInput = 'New Title Input';

  await waitFor(() => {
    fireEvent.change(input, { target: { value: newTitleInput } });
  });

  // Assert that the mock setListState function was called with the new title
  expect(mockSetListState).toHaveBeenCalledWith({
    ...mockListState,
    title: newTitleInput,
  });
});

// List should render an Item for each item in the list
test('List should render an Item for each item in the list', () => {
  const mockListState = {
    id: '1',
    title: 'Initial Title',
    items: [
      {
        id: '1',
        title: 'Item 1',
        description: 'Item 1 desription',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'Item 2',
        description: 'Item 2 desription',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };
  const mockSetListState = vi.fn();
  const mockDeleteList = vi.fn();

  // Render the List component with mock props
  render(
    <List
      listState={mockListState}
      setListState={mockSetListState}
      deleteList={mockDeleteList}
    />
  );

  mockListState.items.forEach((item) => {
    expect(screen.getByTitle(item.id)).toBeInTheDocument();
  });
});

// Clicking on Add Item should add an item to the list
test('click on Add Item Should add an item to the list', async () => {
  const user = userEvent.setup();
  const mockListState = {
    id: '1',
    title: 'Initial Title',
    items: [],
  };
  const mockSetListState = vi.fn();
  const mockDeleteList = vi.fn();

  // Render the List component with mock props
  render(
    <List
      listState={mockListState}
      setListState={mockSetListState}
      deleteList={mockDeleteList}
    />
  );

  const button = screen.getByRole('button');

  await user.click(button);

  expect(mockSetListState).toHaveBeenCalled();
});
