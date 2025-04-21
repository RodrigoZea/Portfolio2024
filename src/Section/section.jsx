import React from 'react';

const Section = (props) => {
  const { children } = props;
  return (
    <section
      className="
        h-screen w-screen min-h-screen xl:px-16
        flex flex-col items-start justify-start
        font-golos font-semibold text-purple-main text-3xl xl:text-7xl 
        select-none
      "
    >
      {children}
    </section>
  )
}

export default Section
