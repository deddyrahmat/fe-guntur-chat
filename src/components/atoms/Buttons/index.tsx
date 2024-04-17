/* eslint-disable react/button-has-type */
import React, { ReactEventHandler, ReactNode } from 'react';
import Loading from '../Loading';

type TypeButton = {
  children?: ReactNode;
  className: string;
  isLoading?: boolean;
  statusButton: 'primary' | 'danger' | 'gray' | 'disabled';
  type: 'button' | 'submit' | 'reset';
  isDisabled?: boolean;
  onClick?: ReactEventHandler;
};
function Buttons({
  className,
  statusButton,
  type = 'button',
  isLoading = false,
  isDisabled = false,
  onClick,
  children,
}: TypeButton) {
  const primary =
    'bg-primary hover:bg-primary-600 py-[8px] px-[16px] xxl:py-[12px] xxl:px-[24px] rounded text-white font-semibold xxl:font-bold text-sm xxl:text-base';
  const danger =
    'bg-danger hover:bg-danger-600 py-[8px] px-[16px] xxl:py-[12px] xxl:px-[24px] rounded text-white font-semibold xxl:font-bold text-sm xxl:text-base';
  const gray =
    'bg-gray-600 hover:bg-gray py-[8px] px-[16px] xxl:py-[12px] xxl:px-[24px] rounded text-white font-semibold xxl:font-bold text-sm xxl:text-base';
  const disabled =
    'bg-gray-400 py-[8px] px-[16px] xxl:py-[12px] xxl:px-[24px] rounded text-gray-200 font-semibold xxl:font-bold text-sm xxl:text-base';

  let AdditionClassNames = null;
  if (statusButton === 'danger') {
    AdditionClassNames = danger;
  } else if (statusButton === 'gray') {
    AdditionClassNames = gray;
  } else if (statusButton === 'disabled') {
    AdditionClassNames = disabled;
  } else {
    AdditionClassNames = primary;
  }

  return (
    <button
      type={type}
      className={`${className} ${AdditionClassNames}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {isLoading ? <Loading type="sm" /> : children}
    </button>
  );
}

export default React.memo(Buttons);
