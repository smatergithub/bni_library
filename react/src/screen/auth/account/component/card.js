import React from 'react';
import moment from 'moment';
const Card = ({ type, data, onDetailClick, onRemoveItem, startdate, enddate }) => {

  function onReadEbook(url) {
    window.open(url, 'liveMatches', 'width=720,height=800,toolbar=0,location=0, directories=0, status=0, menubar=0');
    // window.open(url, 'winname', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=400,height=350');
    // window.open("https://darvinsinaga.com", "_blank", "height=400, width=550, status=yes, toolbar=no, menubar=no, location=no, addressbar=no, top=200, left=300");


  }
  return (
    <div className="w-full mb-5 py-2 lg:flex">
      <div className="lg:w-1/6 h-48 flex items-center justify-center">
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

      <div className="w-4/6 h-48  lg:flex  items-center justify-start ">
        <div className="ml-6">
          <h4 className="text-xl font-bold leading-tight">{data.judul}</h4>
          <div className="mt-2 leading-relaxed">Pengarang : {data.pengarang}</div>
          <div className="mt-1 leading-relaxed"> Penerbit : {data.penerbit} </div>
          <div className="mt-1 leading-relaxed"> Cover ISBN : {data.isbn} </div>
        </div>
      </div>
      <div className="w-2/6 h-48 flex flex-col items-start justify-start ">
        {startdate && enddate && (
          <React.Fragment>
            <div className="mt-1 leading-relaxed">
              {' '}
              Pinjam Dari : {moment(startdate).format('DD/MM/YYYY')}{' '}
            </div>
            <div className="mt-1 leading-relaxed">
              {' '}
              Tgl Kembali : {moment(enddate).format('DD/MM/YYYY')}{' '}
            </div>
            <div className="mt-1 leading-relaxed">
              {' '}
              Durasi : {moment(enddate).diff(moment(startdate), 'days')}
              {' Hari'}
            </div>
          </React.Fragment>
        )}
        <button
          onClick={() => onDetailClick()}
          className="lg:mx-0 hover:underline bg-orange-500 text-white mt-8 rounded-sm h-10  px-5"
          style={{
            right: '2em',
          }}
        >
          {type === 'wishlist' ? 'PESAN' : 'DETAIL'}
        </button>
        {type === 'borrow' && data.sourceLink && (
          <a
            // href={data.sourceLink}
            onClick={() => onReadEbook(data.sourceLink
            )}
            className="lg:mx-0 hover:underline bg-green-500 text-white  rounded-sm  h-10  px-5 mt-2 py-2"
            style={{
              right: '2em',
            }}
          // download
          >
            BACA
          </a>
        )}
        {type === 'wishlist' && (
          <div className="text-red-500 mt-10 cursor-pointer" onClick={() => onRemoveItem()}>
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
