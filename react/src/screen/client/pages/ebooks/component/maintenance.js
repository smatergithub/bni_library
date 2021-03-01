import React from 'react';

function Maintenance() {
  return (
    <div className="container mx-auto flex justify-center items-center flex-col  pt-4 pb-12 mt-40 ">
      <div className="text-2xl">Fitur ini masih dalam tahap pengembangan.</div>
      <img src={require('../../../../../assets/ebook-m.png')} className="h-64" />
    </div>
  );
}
export default Maintenance;
