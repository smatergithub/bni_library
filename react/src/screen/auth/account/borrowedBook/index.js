import React from 'react';
import { connect } from 'react-redux';

import { Helmet } from 'react-helmet';
import ReactStars from 'react-rating-stars-component';
import Card from '../component/card';
import { Modal, NoData } from '../../../../component';
import { getBorrowedBookItem, getMe } from '../../../../redux/action/user';
import { checkIsImageExist } from '../../helper';

function Borrowed(props) {
  let [borrowItem, setBorrowItem] = React.useState(null);
  let [showModal, setShowModal] = React.useState(false);
  let [bookBorrowSelected, setBookBorrowSelected] = React.useState(null);
  let [showMore, setShowMore] = React.useState(false);

  React.useEffect(() => {
    props.getMe().then(res => {
      if (res.resp) {
        props.getBorrowedBookItem(res.data.id, 'borrowed=true').then(res => {
          if (res.resp) {
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
  if (borrowItem === null) return <div>Loading</div>;
  let books = bookBorrowSelected ? bookBorrowSelected.book : null;

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Buku | E-BNI</title>
      </Helmet>
      <div className=" uppercase text-gray-900 text-base font-semibold py-4 pl-6">PINJAMAN</div>
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
                  src={
                    books
                      ? checkIsImageExist(books.image)
                        ? books.image
                        : books.image + '/preview'
                      : require('../../../../assets/NoImage.png')
                  }
                  alt=""
                  style={{
                    height: 240,
                    width: 300,
                    objectFit: 'cover',
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
                    <ReactStars
                      count={6}
                      value={
                        books.totalRead
                          ? books.countRating
                            ? books.countRating / books.totalRead
                            : 0
                          : 0
                      }
                      size={20}
                      activeColor="#ffd700"
                    />
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
export default connect(null, { getBorrowedBookItem, getMe })(Borrowed);
