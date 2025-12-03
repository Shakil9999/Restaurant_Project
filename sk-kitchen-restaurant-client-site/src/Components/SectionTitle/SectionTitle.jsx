import React from 'react';

const SectionTitle = ({ heading, subHeading, textColor = "text-gray-700" }) => {
  return (
    <div className='my-8 text-center md:w-5/12 mx-auto'>
      <p className='text-yellow-600 mb-2'>---{subHeading}---</p>
      <h3 className={`text-4xl font-bold border-neutral-400 border-y-4 py-3 uppercase ${textColor}`}>
        {heading}
      </h3>
    </div>
  );
};

export default SectionTitle;
