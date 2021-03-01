import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Modal, NoData } from '../../../../component';
import { getfavorite } from 'redux/action/ebooks';
import { checkIsImageExist } from '../../component/helper';

function FavoriteEBooks(props) {
  let [showModalDeletion, setShowModalDeletion] = React.useState(false);
  let [books, setBooks] = React.useState([]);
  let { history } = props;
  function redirectToLogin() {
    history.push('/auth/login');
  }
  React.useEffect(() => {
    props.getfavorite().then(res => {
      if (res.resp) {
        setBooks(res.data);
      } else {
        setBooks([]);
      }
    });
  }, []);

  return (
    <React.Fragment>
      <div className="pt-24">
        <div class="container mx-auto flex items-center  pt-4 pb-12 mt-5">
          <section class="bg-gray-200 py-12 w-full">
            <Link to="/home" className="ml-10">
              <div
                className="px-10 mb-5 cursor-pointer hover:text-gray-800 text-lg"
                style={{ width: '10em' }}
              >
                {' '}
                <i className="fas fa-arrow-left"></i> Kembali
              </div>
            </Link>
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 class="text-2xl font-bold leading-tight text-center lg:text-3xl">
                Ebook Populer
              </h2>

              <div class=" mt-8  mx-auto md:flex items-start justify-center">
                {books.RatingEbook && books.RatingEbook.length ? (
                  books.RatingEbook.map((data, key) => {
                    let book = data;
                    return (
                      <div key={key} className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
                        <img
                          className="hover:grow hover:shadow-lg h-64"
                          src={
                            book.image !== null
                              ? book.image + '/preview'
                              : require('../../../../assets/NoImage.png')
                          }
                        />
                        <div className="h-16 pt-1 flex items-start justify-between">
                          <h2 className="text-gray-800 text-lg">{book.judul}</h2>
                        </div>

                        <div className="pt-1 text-gray-900">{book.pengarang}</div>
                        <div className="flex items-center justify-between">
                          <Rating
                            defaultRating={book.countRating}
                            maxRating={6}
                            icon="star"
                            disabled
                          />
                          <span>
                            <i className="fas fa-heart text-yellow-700" />{' '}
                            {book.totalRead ? book.totalRead : 0}
                          </span>
                        </div>
                        <Link to={`/detail-book?id=${book.id}`}>
                          <button className="w-full bg-orange-500 text-white  rounded-lg my-6 py-2 px-10 shadow-lg">
                            Detail
                          </button>
                        </Link>
                      </div>
                    );
                  })
                ) : (
                  <NoData msg="Data tidak ditemukan" />
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
      <Modal
        title="Otentikasi diperlukan"
        open={showModalDeletion}
        onCLose={() => {
          setShowModalDeletion(false);
        }}
        handleSubmit={redirectToLogin}
        labelSubmitButton="Masuk"
      >
        <div className="my-5">Silahkan Masuk terlebih dahulu</div>
      </Modal>
    </React.Fragment>
  );
}

export default connect(null, {
  getfavorite,
})(FavoriteEBooks);
