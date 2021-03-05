import React from 'react';
import { connect } from 'react-redux';
import { Rating } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import Card from '../component/card';
import { Modal, NoData } from '../../../../component';
import { getBorrowedEbookItem, getMe } from '../../../../redux/action/user';
import { checkIsImageExist } from '../../helper';
import LoadingPreview from './Loader';

function BorrowedEbook(props) {
  let [borrowItem, setBorrowItem] = React.useState(null);
  let [showModal, setShowModal] = React.useState(false);
  let [ebookBorrowSelected, setEbookBorrowSelected] = React.useState(null);
  let [showMore, setShowMore] = React.useState(false);

  React.useEffect(() => {
    props.getMe().then((res) => {
      if (res.resp) {
        props.getBorrowedEbookItem(res.data.id, 'borrowed=true').then((res) => {
          if (res.resp) {
            setBorrowItem(res.data);
          }
        });
      }
    });
  }, []);
  function onDetailClick(data) {
    setShowModal(true);
    setEbookBorrowSelected(data);
  }

  if (borrowItem === null)
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
  let ebooks = ebookBorrowSelected ? ebookBorrowSelected.ebook : null;
  let img = '';

  if (ebooks !== null && ebooks.image !== null && checkIsImageExist(ebooks.image)) {
    img = ebooks.image;
  } else if (ebooks !== null && ebooks.image !== null) {
    img = ebooks.image + '/preview';
  } else {
    img = require('../../../../assets/NoImage.png');
  }

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ebook | E-BNI</title>
      </Helmet>
      <div className=" uppercase text-gray-900 text-base font-semibold py-4 pl-6">PINJAMAN</div>
      <div class="bg-white rounded-lg shadow-lg pl-10 relative">
        {borrowItem &&
          borrowItem.data.map((borrow) => {
            return (
              <>
                <Card
                  type="borrow"
                  data={borrow.ebook}
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
      {ebooks && (
        <Modal
          title={ebookBorrowSelected.code}
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
                <div className="text-lg font-bold">{ebooks.judul}</div>
                <div
                  className="bg-gray-400 w-full mt-2"
                  style={{
                    height: 1,
                  }}
                ></div>
                <div className="flex mt-3 ">
                  <div className="flex items-center justify-between">
                    <Rating defaultRating={ebooks.countRating} maxRating={6} icon="star" disabled />
                    <span className="ml-3"> {ebooks.totalRead ? ebooks.totalRead : 0} Views</span>
                  </div>
                </div>
                <div> Paperback | {ebooks.bahasa}</div>
                <div>{`By (author) ${ebooks.pengarang}`}</div>
                <div className="py-1 font-bold">Description:</div>
                <div style={{ textAlign: 'justify' }}>
                  {ebooks.description !== null && ebooks.description.length > 505
                    ? ebooks.description.slice(0, showMore ? ebooks.description.length : 500)
                    : null}
                </div>
                {ebooks.description !== null && ebooks.description.length > 380 && (
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

                <div> Author : {ebooks.pengarang}</div>
                <div> ISBN : {ebooks.isbn}</div>
                <div> Format : Hardback</div>
                <div> Publishers : {ebooks.penerbit}</div>
                <div> Publication date : {ebooks.tahunTerbit}</div>
                <div> Pages : 120</div>
                <div> Product dimensions : 172 x 223 x 24mm</div>
                <div> Condition : New</div>
              </div>
            </div>
          </div>
        </Modal>
        // <Modal
        //   title={ebookBorrowSelected.code}
        //   open={showModal}
        //   usingForDetail={true}
        //   onCLose={() => {
        //     setShowModal(false);
        //   }}
        //   large
        //   hideCloseBtn={true}
        //   handleSubmit={() => setShowModal(false)}
        // >
        //   <div class="lg:flex  w-full">
        //     <div class="lg:flex lg:w-4/6 text-gray-700 bg-white lg:px-20 py-10  m-2">
        //       <div className="lg:w-2/5 ">
        //         <div className="bg-white rounded-lg  border-gray-300">
        //           <img
        //             src={
        //               ebooks
        //                 ? checkIsImageExist(ebooks.image)
        //                   ? ebooks.image
        //                   : require('../../../../assets/NoImage.png')
        //                 : require('../../../../assets/NoImage.png')
        //             }
        //             alt=""
        //             style={{
        //               height: 240,
        //               width: 300,
        //               objectFit: 'cover',
        //             }}
        //           />
        //         </div>
        //       </div>
        //       <div className="lg:w-3/5 px-5">
        //         <div className="text-lg font-bold">{ebooks.judul}</div>
        //         <div
        //           className="bg-gray-400 w-full mt-2"
        //           style={{
        //             height: 1,
        //           }}
        //         ></div>
        //         <div className="flex mt-3 ">
        //           <div className="flex items-center justify-between">
        //             <Rating defaultRating={ebooks.countRating} maxRating={6} icon="star" disabled />
        //             <span className="ml-3"> {ebooks.totalRead ? ebooks.totalRead : 0} Views</span>
        //           </div>
        //         </div>
        //         <div> Paperback | {ebooks.bahasa}</div>
        //         <div>{`By (author) ${ebooks.pengarang}`}</div>
        //         <div className="py-1 font-bold">Description:</div>
        //         <div>
        //           {ebooks.description !== null && ebooks.description.length > 505
        //             ? ebooks.description.slice(0, showMore ? ebooks.description.length : 500)
        //             : null}
        //         </div>
        //         {ebooks.description !== null && ebooks.description.length > 505 && (
        //           <div
        //             onClick={() => setShowMore(!showMore)}
        //             className="text-blue-400 underline cursor-pointer"
        //           >
        //             {showMore ? 'Lebih sedikit..' : 'Selengkapnya..'}
        //           </div>
        //         )}
        //       </div>
        //     </div>
        //     <div class="lg:w-2/6  bg-white lg:px-10 lg:py-10 m-2">
        //       <div className="text-lg font-bold">Ebook Details</div>
        //       <div
        //         className="bg-gray-400 w-full mt-2 mb-2"
        //         style={{
        //           height: 1,
        //         }}
        //       ></div>

        //       <div> Author : {ebooks.pengarang}</div>
        //       <div> ISBN : {ebooks.isbn}</div>
        //       <div> Format : Hardback</div>
        //       <div> Publishers : {ebooks.penerbit}</div>
        //       <div> Publication date : {ebooks.tahunTerbit}</div>
        //       <div> Pages : 120</div>
        //       <div> Product dimensions : 172 x 223 x 24mm</div>
        //       <div> Condition : New</div>
        //     </div>
        //   </div>
        // </Modal>
      )}
    </React.Fragment>
  );
}
export default connect(null, { getBorrowedEbookItem, getMe })(BorrowedEbook);
