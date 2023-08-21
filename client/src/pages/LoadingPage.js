import React from 'react';
import { HashLoader } from 'react-spinners';

const LoadingPage = () => {
  return (
    <section className="h-screen w-full flex justify-center items-center">
      <HashLoader color="#1f2937" />
    </section>
  );
};

export default LoadingPage;
