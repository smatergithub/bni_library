import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { Modal } from '../../../../component';
import { getBookById } from '../../../../redux/action/ebookUser';
let img =
  'https://images.unsplash.com/photo-1569360457068-0e24f0d88117?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=600&q=80';
function DetailEbooks(props) {
  const parsed = queryString.parse(props.location.search);
  let { history } = props;
  let [processing, setProcessing] = React.useState(false);
  let [ebooks, setEbooks] = React.useState(null);
  let [showModalDeletion, setShowModalDeletion] = React.useState(false);
  React.useEffect(() => {
    let { id } = parsed;
    setProcessing(true);
    props.getBookById(id).then(res => {
      setProcessing(false);
      if (res.resp) {
        setEbooks(res.data);
      }
    });
  }, []);
  function redirectToLogin() {
    props.history.push('//auth/login');
  }
  if (processing && ebooks == null) return null;
  let isUserLogged = localStorage.getItem('bni_UserRole') === '1';
  return (
    <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12 mt-10 bg-gray-100">
      <section className="py-16 lg:py-24 w-full">
        <div
          className="px-10 mb-5 cursor-pointer hover:text-gray-800 text-lg"
          onClick={() => history.push('/ebooks')}
          style={{ width: '10em' }}
        >
          {' '}
          <i className="fas fa-arrow-left"></i> Kembali
        </div>
        {ebooks !== null && (
          <div class="flex  w-full">
            <div class="flex w-4/6 text-gray-700 bg-white px-20 py-10  m-2">
              <div className="w-2/5 ">
                <div className="bg-white rounded-lg  border-gray-300">
                  <img
                    // src={`http://localhost:2000/img/images/${ebooks.image.split('/').pop()}`}
                    src={ebooks.image}
                    alt=""
                    style={{
                      height: 440,
                      width: 300,
                    }}
                  />
                </div>
              </div>
              <div className="w-3/5 px-5">
                <div className="text-lg font-bold">{ebooks.judul}</div>
                <div
                  className="bg-gray-400 w-full mt-2"
                  style={{
                    height: 1,
                  }}
                ></div>
                <div className="flex mt-3 ">
                  <div className="flex items-center">
                    <i className="fas fa-star text-yellow-700" />
                    <i className="fas fa-star text-yellow-700" />
                    <i className="fas fa-star text-yellow-700" />
                    <i className="fas fa-star text-yellow-700" />
                    <i className="far fa-star text-yellow-700" />
                  </div>
                  <div> 4.48 (606,907 ratings by Goodreads)</div>
                </div>
                <div> Paperback | {ebooks.bahasa}</div>
                <div>{`By (author) ${ebooks.pengarang}`}</div>
                <div className="py-1 font-bold">Description:</div>
                <div>{ebooks.description}</div>
              </div>
            </div>
            <div class="w-2/6  bg-white px-10 py-10 m-2">
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
              <button
                onClick={() => {
                  if (!isUserLogged) {
                    setShowModalDeletion(true);
                  }
                }}
                className="w-full bg-gray-800 text-white  rounded-lg my-6 py-2 px-10 shadow-lg"
              >
                Pesan Sekarang
              </button>
              <button
                className="w-full  text-gray-800  rounded-lg my-1 py-2 px-10 border border-gray-600"
                onClick={() => {
                  if (!isUserLogged) {
                    setShowModalDeletion(true);
                  }
                }}
              >
                Tambah Wishlist
              </button>
            </div>
          </div>
        )}
      </section>
      <Modal
        title="Authentication required"
        open={showModalDeletion}
        onCLose={() => {
          setShowModalDeletion(false);
        }}
        handleSubmit={redirectToLogin}
      >
        <div className="my-5">Silahkan Login terlebih dahulu</div>
      </Modal>
    </div>
  );
}
export default withRouter(connect(null, { getBookById })(DetailEbooks));
