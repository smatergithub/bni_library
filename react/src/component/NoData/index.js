import React from 'react';

function NoData() {
  return (
    <div className="w-full  p-6 flex justify-center pt-20 ">
      <div
        className="w-3/12 flex-column "
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <img src="https://img.icons8.com/wired/64/000000/add-list.png" />
        <div className="mt-10">Data tidak di temukan</div>
      </div>
    </div>
  );
}
export default NoData;
