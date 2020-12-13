import React from 'react';

function NoData({ msg, isEmpty }) {
  return (
    <div className="w-full  p-6 flex justify-center pt-20  ">
      <div
        className=" flex-column  px-10 py-3"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <img
          src={
            isEmpty
              ? require('../../assets/box.svg')
              : 'https://img.icons8.com/wired/64/000000/add-list.png'
          }
          width="80"
          height="80"
        />
        <div className="mt-2"> {msg ? msg : 'Data tidak ditemukan'}</div>
      </div>
    </div>
  );
}
export default NoData;
