import React from 'react';

function Welcome() {
  return (
    <section className="flex justify-center items-center flex-col text-center h-[60vh]">
      <h1 className="font-bold text-xl md:text-4xl">Welcome</h1>
      <img
        src="/assets/images/logo.svg"
        alt="logo"
        className="max-h-60 max-w-60"
      />
      <h2 className="font-bold text-xl md:text-4xl">Guntur</h2>
    </section>
  );
}

export default Welcome;
