import { vi, describe, test, expect, afterEach } from 'vitest';
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { default as userEvent } from '@testing-library/user-event';
import ResizeTextArea from '.';

const testOnChange = vi.fn();
const testOnSubmit = vi.fn();

describe('ResizeTextArea', () => {
  const user = userEvent.setup();

  afterEach(() => {
    cleanup();
  });

  test('fires onChange when the textarea content changes', async () => {
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

    // Type the test text into the textarea
    await user.type(input, testTextValue);

    // Check that the onChange function was called
    expect(testOnChange).toHaveBeenCalled();
  });

  test('initialValue should be visible in the textarea', () => {
    const initialValue = 'Test Initial Value';
    render(
      <ResizeTextArea
        id="test-textarea-id"
        className="test-textarea-className"
        initialValue={initialValue}
        onChange={testOnChange}
      />
    );

    expect(screen.getByDisplayValue(initialValue)).toBeDefined();
  });

  test('onSubmit is called when ctrl+enter is pressed & released', async () => {
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

  //   test('textarea should resize when text is too long', async () => {
  //     const { rerender } = render(
  //       <ResizeTextArea
  //         id="test-textarea-id"
  //         className="test-textarea-className"
  //         initialValue=""
  //         onChange={testOnChange}
  //       />
  //     );

  //     const initialHeight = screen.getByRole('textbox').style.height;

  //     const longTextValue =
  //       'This text is 140 characters long. This text is 140 characters long. This text is 140 characters long. This text is 140 characters long. This';
  //     rerender(
  //       <ResizeTextArea
  //         id="test-textarea-id"
  //         className="test-textarea-className"
  //         initialValue={longTextValue}
  //         onChange={testOnChange}
  //       />
  //     );

  //     const textarea = await waitFor(() =>
  //       screen.findByDisplayValue(longTextValue)
  //     );

  //     await user.click(textarea);

  //     console.log(textarea);

  //     expect(textarea.style.height).not.to.equal(initialHeight);
  //   });
});
