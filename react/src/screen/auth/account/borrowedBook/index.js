import React from 'react';
import { connect } from 'react-redux';

import { Helmet } from 'react-helmet';
import { Rating } from 'semantic-ui-react';
import Card from '../component/card';
import { Modal, NoData } from '../../../../component';
// import { getBorrowedBookItem, getMe } from '../../../../redux/action/user';
import UsersApi from '../../../../api/UserApi';

import { checkIsImageExist } from '../../helper';
import LoadingPreview from './Loader';

function Borrowed(props) {
  let [borrowItem, setBorrowItem] = React.useState(null);
  let [showModal, setShowModal] = React.useState(false);
  let [bookBorrowSelected, setBookBorrowSelected] = React.useState(null);
  let [showMore, setShowMore] = React.useState(false);

  React.useEffect(() => {
    UsersApi.getMe().then(res => {
      if (res.data) {
        UsersApi.getBorrowedBookItem(res.data.id, 'borrowed=true').then(res => {
          if (res.data) {
            setBorrowItem(res.data);
          }
        });
      }
    });
  }, []);

  function onDetailClick(data) {
    setShowModal(true);
    setBookBorrowSelected(data);
  }

  if (borrowItem === null) {
    return (
      <div
        style={{
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LoadingPreview />
      </div>
    );
  }

  let books = bookBorrowSelected ? bookBorrowSelected.book : null;

  let img = '';

  if (books !== null && books.image !== null && checkIsImageExist(books.image)) {
    img = books.image;
  } else if (books !== null && books.image !== null) {
    img = books.image + '/preview';
  } else {
    img = require('../../../../assets/NoImage.png');
  }

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Buku | E-BNI</title>
      </Helmet>
      <div className=" uppercase text-gray-900 text-base font-semibold py-4 pl-6">
        PINJAMAN BUKU
      </div>
      <div class="bg-white rounded-lg shadow-lg pl-10 relative">
        {borrowItem &&
          borrowItem.data.map(borrow => {
            return (
              <>
                <Card
                  type="borrow"
                  data={borrow.book}
                  enddate={borrow.endDate}
                  startdate={borrow.startDate}
                  onDetailClick={() => onDetailClick(borrow)}
                />
                <div
                  className="bg-gray-600 w-full"
                  style={{
                    height: 1,
                  }}
                ></div>
              </>
            );
          })}
        {borrowItem && borrowItem.data.length === 0 && <NoData msg="Belum ada data !" />}
      </div>

      {books && (
        <Modal
          title={bookBorrowSelected.code}
          open={showModal}
          usingForDetail={true}
          onCLose={() => {
            setShowModal(false);
          }}
          large
          hideCloseBtn={true}
          handleSubmit={() => setShowModal(false)}
        >
          <div class="lg:flex  w-full pt-10" style={{ height: '480px' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div className="bg-white rounded-lg  border-gray-300">
                <img
                  src={img}
                  alt=""
                  style={{
                    height: 300,
                    width: 300,
                    objectFit: 'fill',
                  }}
                />
              </div>
              <div className="lg:w-3/5 px-5">
                <div className="text-lg font-bold">{books.judul}</div>
                <div
                  className="bg-gray-400 w-full mt-2"
                  style={{
                    height: 1,
                  }}
                ></div>
                <div className="flex mt-3 ">
                  <div className="flex items-center justify-between">
                    <Rating defaultRating={books.countRating} maxRating={6} icon="star" disabled />
                    <span className="ml-3"> {books.totalRead ? books.totalRead : 0} Views</span>
                  </div>
                </div>
                <div> Paperback | {books.bahasa}</div>
                <div>{`By (author) ${books.pengarang}`}</div>
                <div className="py-1 font-bold">Description:</div>
                <div style={{ textAlign: 'justify' }}>
                  {books.description !== null && books.description.length > 505
                    ? books.description.slice(0, showMore ? books.description.length : 500)
                    : null}
                </div>
                {books.description !== null && books.description.length > 380 && (
                  <div
                    onClick={() => setShowMore(!showMore)}
                    className="text-blue-400 underline cursor-pointer"
                  >
                    {showMore ? 'Lebih sedikit..' : 'Selengkapnya..'}
                  </div>
                )}
              </div>
              <div class="lg:w-2/6  bg-white">
                <div className="text-lg font-bold">Book Details</div>
                <div
                  className="bg-gray-400 w-full mt-2 mb-2"
                  style={{
                    height: 1,
                  }}
                ></div>

                <div> Author : {books.pengarang}</div>
                <div> ISBN : {books.isbn}</div>
                <div> Format : Hardback</div>
                <div> Publishers : {books.penerbit}</div>
                <div> Publication date : {books.tahunTerbit}</div>
                <div> Pages : 120</div>
                <div> Product dimensions : 172 x 223 x 24mm</div>
                <div> Condition : New</div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
}
export default connect(null)(Borrowed);
