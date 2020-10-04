import React from 'react';

const Card = ({ type, data, onDetailClick, onRemoveItem }) => {
  return (
    <div className="w-full mb-5 py-5 flex">
      <div className="w-1/6 h-48 flex items-center justify-center">
        <img
          src={data.image}
          style={{
            height: 120,
            width: 140,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>

      <div className="w-4/6 h-48  flex  items-center justify-start ">
        <div>
          <h4 className="text-xl font-bold leading-tight">{data.judul}</h4>
          <div className="mt-2 leading-relaxed">Pengarang : {data.pengarang}</div>
          <div className="mt-1 leading-relaxed"> Penerbit : {data.penerbit} </div>
          <div className="mt-1 leading-relaxed"> Cover ISBN : {data.isbn} </div>
        </div>
      </div>
      <div className="w-1/6 h-48 flex flex-col items-center justify-between py-10">
        <button
          onClick={() => onDetailClick()}
          className="lg:mx-0 hover:underline bg-orange-500 text-white  rounded-sm h-10 px-5"
          style={{
            right: '2em',
          }}
        >
          {type === 'wishlist' ? 'PESAN' : 'DETAIL'}
        </button>
        {type === 'borrow' && data.sourceLink && (
          <a
            href={data.sourceLink}
            className="lg:mx-0 hover:underline bg-green-500 text-white  rounded-sm h-10 px-5 py-3"
            style={{
              right: '2em',
            }}
            download
          >
            UNDUH
          </a>
        )}
        {type === 'wishlist' && (
          <div className="text-red-500 cursor-pointer" onClick={() => onRemoveItem()}>
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
