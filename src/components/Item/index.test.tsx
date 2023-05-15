import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ListItem from '.';

const date = new Date();

const mockData = {
  id: 'test-id',
  title: 'Test Title',
  description: 'Test Description',
  createdAt: date,
  updatedAt: date,
};

const mockEditItem = vi.fn();
const mockDeleteItem = vi.fn();

describe('ListItem', () => {
  beforeEach(() => {
    cleanup();
  });
  it('renders title and description', () => {
    const { getByDisplayValue } = render(
      <ListItem
        data={mockData}
        editItem={mockEditItem}
        deleteItem={mockDeleteItem}
      />
    );
    expect(getByDisplayValue(mockData.title)).not.toBeNull();
    expect(getByDisplayValue(mockData.description)).not.toBeNull();
  });
});
