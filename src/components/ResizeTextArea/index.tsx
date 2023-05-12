import React, { useRef, useLayoutEffect } from 'react';
import handleKeyUp from '../../utils/handleKeyUp';

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
  colorShouldChange = false,
  shouldFocus = false,
  onSubmit,
}: TextAreaType) => {
  const ref = useRef(null);
  const objRef = ref.current ? (ref.current as HTMLInputElement) : null;

  // Resizes the textarea to fit all rows of text
  useLayoutEffect(() => {
    if (objRef) {
      const autoResize = () => {
        objRef.style.height = '0px';
        objRef.style.height = `${objRef.scrollHeight}px`;
      };

      autoResize();
      objRef.addEventListener('input', autoResize, false);

      return () => objRef.removeEventListener('input', autoResize, false);
    }
  }, [initialValue, objRef]);

  // Set style and value on focus. The value needs to be set so the LayoutEffect will resize properly
  const onFocus = (e: React.ChangeEvent<EventTarget>) => {
    if (objRef && colorShouldChange) {
      objRef.style.backgroundColor = '';
      objRef.style.color = '';
    }

    if (e.target) {
      (e.target as HTMLInputElement).value = '';
      (e.target as HTMLInputElement).value = initialValue;
    }
  };

  // For color changing sections invert colors onBlur
  const onBlur = () => {
    if (objRef && colorShouldChange) {
      objRef.style.backgroundColor = 'inherit';
      objRef.style.color = 'white';
    }
  };

  return (
    <textarea
      ref={ref}
      id={id}
      autoFocus={shouldFocus}
      className={className}
      style={{
        backgroundColor: 'inherit',
        color: 'inherit',
      }}
      onChange={() => onChange(id, objRef ? objRef.value : '')}
      onFocus={onFocus}
      onBlur={onBlur}
      value={initialValue}
      onKeyUp={handleKeyUp(onSubmit)}
      rows={1}
      maxLength={140}
    />
  );
};

export default ResizeTextArea;
