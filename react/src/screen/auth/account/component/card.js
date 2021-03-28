import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { checkIsImageExist } from '../../helper';
const Card = ({ type, data, onDetailClick, onRemoveItem, startdate, enddate }) => {
  let img = '';
  if (data !== null && data.image !== null && checkIsImageExist(data.image)) {
    img = data.image;
  } else if (data !== null && data.image !== null) {
    img = data.image + '/preview';
  } else {
    img = require('../../../../assets/NoImage.png');
  }

  return (
    <div className="w-full mb-5 py-2 lg:flex">
      <div className="lg:w-1/6 h-48 flex items-center justify-center">
        <img
          src={img}
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
          <h4 className="text-xl font-bold leading-tight">{data && data.judul}</h4>
          <div className="mt-2 leading-relaxed">Pengarang : {data && data.pengarang}</div>
          <div className="mt-1 leading-relaxed"> Penerbit : {data && data.penerbit} </div>
          <div className="mt-1 leading-relaxed"> Cover ISBN : {data && data.isbn} </div>
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
          className="lg:mx-0 hover:underline bg-orange-500 text-white  rounded-sm  h-10  px-5 mt-2 py-2"
          style={{
            right: '2em',
          }}
        >
          {type === 'wishlist' ? 'PESAN' : type === 'borrow' ? 'DETAIL INVOICE' : 'DETAIL'}
        </button>
        {type === 'borrow' && data.sourceLink && (
          <Link to={`/profile/read-ebooks?ebookId=${data.id}`}>
            <button
              className="lg:mx-0 hover:underline  bg-green-500 text-white  rounded-sm  h-10  px-5 mt-2 py-2"
              style={{
                right: '2em',
                width: '189px',
              }}
            >
              BACA
            </button>
          </Link>
        )}

        {type === 'wishlist' && (
          <button
            onClick={() => onRemoveItem()}
            className="lg:mx-0 hover:underline  bg-green-500 text-white  rounded-sm  h-10  px-5 mt-2 py-2"
            style={{
              right: '2em',
            }}
          >
            HAPUS
          </button>
          // <div className="text-red-500 mt-10 cursor-pointer" onClick={() => onRemoveItem()}>
          //   HAPUS
          //   <i
          //     className="fas fa-times-circle text-xl text-red-500 "
          //     style={{
          //       marginLeft: 10,
          //     }}
          //   />
          // </div>
        )}
      </div>
    </div>
  );
};

export default Card;
