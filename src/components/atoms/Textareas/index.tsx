import React, { memo } from 'react';

type TypeTextareas = {
  placeholder?: string;
  className: string;
  isDisabled?: boolean;
  value: any;
  onChange: any;
  onBlur: any;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  formikTouched: any;
  formikError: any;
  myRef: any;
  unique: string;
};

function Textareas({
  className,
  isDisabled = false,
  placeholder,
  value,
  onChange,
  onBlur,
  onKeyDown,
  formikTouched,
  formikError,
  myRef,
  unique,
}: TypeTextareas) {
  return (
    <div className="w-full">
      <textarea
        id={unique}
        name={unique}
        disabled={isDisabled}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        ref={myRef}
        rows={1}
      />
      {formikTouched && formikError ? (
        <div className="text-danger mt-1">{formikError}</div>
      ) : null}
    </div>
  );
}

export default memo(Textareas);
