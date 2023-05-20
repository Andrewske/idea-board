import React, { useRef, useLayoutEffect } from 'react';
import handleKeyUp from '../../utils/handleKeyUp';
import './styles.scss';

interface TextAreaType {
  id: string;
  className: string;
  initialValue: string;
  onChange: (key: string, value: string) => void;
  colorShouldChange?: boolean;
  shouldFocus?: boolean;
  onSubmit?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const ResizeTextArea = ({
  id,
  className,
  initialValue,
  onChange,
  shouldFocus = false,
  onSubmit,
}: TextAreaType) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Resizes the textarea to fit all rows of text
  useLayoutEffect(() => {
    if (textareaRef?.current) {
      textareaRef.current.style.height = '0px';

      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
    }
  }, [initialValue]);

  // Set style and value on focus. The value needs to be set so the LayoutEffect will resize properly
  const onFocus = (e: React.ChangeEvent<EventTarget>) => {
    if (e.target) {
      (e.target as HTMLInputElement).value = initialValue;
    }
  };

  return (
    <textarea
      ref={textareaRef}
      id={id}
      autoFocus={shouldFocus}
      className={className}
      style={{
        backgroundColor: 'inherit',
        color: 'inherit',
      }}
      onChange={() =>
        onChange(id, textareaRef.current ? textareaRef.current.value : '')
      }
      onFocus={onFocus}
      value={initialValue}
      onKeyUp={handleKeyUp(onSubmit)}
      rows={1}
      maxLength={140}
    />
  );
};

export default ResizeTextArea;
