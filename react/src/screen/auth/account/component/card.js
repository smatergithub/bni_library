import React from 'react';

const Card = ({ type }) => {
  return (
    <div className="w-full mb-5 py-5 flex">
      <div className="w-1/6 h-48 flex items-center justify-center">
        <img src="https://images.unsplash.com/photo-1569360457068-0e24f0d88117?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&h=80&q=80" />
      </div>

      <div className="w-4/6 h-48  flex  items-center justify-start ">
        <div>
          <h4 className="text-xl font-bold leading-tight">Seni Berpikir Positif</h4>
          <div className="mt-2 leading-relaxed">Pengarang : Andrea Hirata</div>
          <div className="mt-1 leading-relaxed"> Penerbit : Basa Basi </div>
          <div className="mt-1 leading-relaxed"> Cover ISBN : 978-602-6651-69-3 </div>
        </div>
      </div>
      <div className="w-1/6 h-48 flex flex-col items-center justify-between py-10">
        <button
          className="lg:mx-0 hover:underline bg-gray-800 text-white  rounded-sm h-10 px-5"
          style={{
            right: '2em',
          }}
        >
          {type === 'wishlist' ? 'PESAN' : 'DETAIL'}
        </button>
        {type === 'wishlist' && (
          <div className="text-red-500 cursor-pointer">
            HAPUS
            <i
              className="fas fa-times-circle text-xl text-red-500 "
              style={{
                marginLeft: 10,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
