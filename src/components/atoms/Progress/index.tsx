import React from 'react';

type TypeProgress = {
  type: 'sm' | 'lg' | 'xl' | 'auto';
  withText?: boolean;
  value: number;
};

function ProgressBar({ type, withText = false, value }: TypeProgress) {
  let size = '';
  let text = '';
  if (type === 'auto') {
    size = 'w-full h-full';
    text = 'text-xl lg:text-4xl';
  } else if (type === 'xl') {
    size = 'w-screen h-screen';
    text = 'text-lg lg:text-2xl';
  } else if (type === 'lg') {
    size = 'w-60 h-60';
    text = 'text-lg lg:text-2xl';
  } else {
    size = 'w-10 h-10';
    text = 'text-md lg:text-lg';
  }

  return (
    <div className={`${size} flex justify-center items-center`}>
      <section className="flex flex-col gap-4 items-center">
        {withText && <h3 className={text}>Loading</h3>}
        <section className="animate-bounce w-60 h-60">
          <img
            src="/assets/images/logo.svg"
            className="h-full w-full rounded-full bg-white p-1"
            alt="Guntur Logo"
          />
        </section>
        <section className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
          <section
            className="bg-chat text-xs font-medium text-white text-center p-0.5 leading-none rounded-full"
            style={{ width: `${value}%` }}
          >
            {value}%
          </section>
        </section>
      </section>
    </div>
  );
}

export default ProgressBar;
