import React from 'react';

type TypeInput = {
  label: string;
  placeholder?: string;
  unique: string;
  className: string;
  type: 'text' | 'email' | 'password';
  isDisabled?: boolean;
  value: any;
  onChange: any;
  formikTouched: any;
  formikError: any;
};

function Inputs({
  className,
  type = 'text',
  isDisabled = false,
  label,
  unique,
  placeholder,
  value,
  onChange,
  formikTouched,
  formikError,
}: TypeInput) {
  return (
    <div>
      {/* <Label title={label} real={unique} /> */}
      <label
        htmlFor={unique}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        name={unique}
        id={unique}
        disabled={isDisabled}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {formikTouched && formikError ? (
        <div className="text-danger mt-1">{formikError}</div>
      ) : null}
    </div>
  );
}

export default Inputs;
