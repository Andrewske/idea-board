import { vi, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { default as userEvent } from '@testing-library/user-event';
import ResizeTextArea from '.';

test('fires onChange when the textarea content changes', async () => {
  const user = userEvent.setup();
  const testOnChange = vi.fn();

  render(
    <ResizeTextArea
      id="test-textarea-id"
      className="test-textarea-className"
      initialValue=""
      onChange={testOnChange}
    />
  );

  const testTextValue = 'test value';
  const input = screen.getByRole('textbox');

  // Click on the textarea to focus it
  await user.click(input);

  // Type the test text into the testarea
  await user.type(input, testTextValue);

  // Check that the onChange function was called
  testTextValue.split('').forEach((char, index) => {
    expect(testOnChange).toHaveBeenNthCalledWith(
      index + 1,
      'test-textarea-id',
      char
    );
  });
});

test('initialValue should be visible in the textarea', () => {
  const testOnChange = vi.fn();
  const initialValue = 'Test Initial Value';
  render(
    <ResizeTextArea
      id="test-textarea-id"
      className="test-textarea-className"
      initialValue={initialValue}
      onChange={testOnChange}
    />
  );

  expect(screen.getByText(initialValue)).toBeDefined();
});

test('onSubmit is called when ctrl+enter is pressed & released', async () => {
  const user = userEvent.setup();
  const testOnChange = vi.fn();
  const testOnSubmit = vi.fn();

  render(
    <ResizeTextArea
      id="test-textarea-id"
      className="test-textarea-className"
      initialValue=""
      onChange={testOnChange}
      onSubmit={testOnSubmit}
    />
  );

  const input = screen.getByRole('textbox');

  // Click on the textarea to focus it
  await user.click(input);

  // Click Crtl + Enter
  fireEvent.keyUp(input, {
    key: 'Enter',
    code: 'Enter',
    ctrlKey: true,
  });

  expect(testOnSubmit).toHaveBeenCalled();
});

test('if shouldFocus then check that the element is focused', async () => {
  const testOnChange = vi.fn();
  render(
    <ResizeTextArea
      id="test-textarea-id"
      className="test-textarea-className"
      initialValue="isFocused"
      onChange={testOnChange}
      shouldFocus={true}
    />
  );

  const input = await screen.findByDisplayValue('isFocused');

  expect(document.activeElement === input).toBeTruthy();
});
