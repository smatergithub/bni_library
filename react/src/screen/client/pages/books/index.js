import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Input, Select } from 'antd';
import { NoData, Modal } from '../../../../component';
import { getAllBook, getCategory } from '../../../../redux/action/bookUser';
import { addBookWishlist, removeBookWishlist } from '../../../../redux/action/wishlist';
const { Search } = Input;
const { Option } = Select;

function Books(props) {
  let { history } = props;
  let [processing, setProcessing] = React.useState(false);
  let [category, setCategory] = React.useState([]);
  let [selectedBook, setSelectedBook] = React.useState(null);
  let [showModalDeletion, setShowModalDeletion] = React.useState(false);

  function getAllBook(params) {
    let formData = {
      page: 1,
      limit: 8,
      offset: 0,
    };
    if (params) {
      formData = {
        ...formData,
        ...params,
      };
    }

    props.getAllBook(formData).then(() => {
      setProcessing(false);
    });
  }
  React.useEffect(() => {
    setProcessing(true);
    getAllBook();
    props.getCategory().then(res => {
      if (res.data.length > 0) {
        setCategory(res.data);
      }
    });
  }, []);

  function handleChange(value) {
    getAllBook({ kategori: value });
  }
  function handleSearch(value) {
    getAllBook({ judul: value });
  }
  function redirectToLogin() {
    props.history.push('/auth/login');
  }
  if (processing && props.books === null) return null;
  const { wishlist } = props;
  let isUserLogged = localStorage.getItem('bni_UserRole') === '1';
  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Buku | Ebni</title>
      </Helmet>
      <section className="bg-white py-8 ">
        <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12 ">
          <nav id="buku" className="w-full z-30 top-0 px-6 py-1">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0  py-3 mt-16">
              <a
                className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
                href="#"
              >
                Semua buku
              </a>

              <div className="flex items-center" id="buku-nav-content">
                <div className="pl-3 text-gray-800 inline-block no-underline hover:text-black">
                  <Select
                    defaultValue="Kategori"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    className="category"
                  >
                    {category.map(op => {
                      return <Option value={op.label}>{op.label}</Option>;
                    })}
                  </Select>
                </div>

                <div className="text-gray-800 px-1 bg-purple-white ">
                  <Search
                    placeholder="input search title"
                    enterButton="Cari"
                    size="large"
                    onSearch={value => handleSearch(value)}
                  />
                </div>
                <div
                  className="ml-10 cursor-pointer"
                  onClick={() => {
                    setCategory([]);
                    getAllBook();
                  }}
                >
                  Reset Filter
                </div>
              </div>
            </div>
          </nav>
          {props.books && props.books.data.length === 0 && <NoData />}
          {props.books &&
            props.books.data.map((book, key) => {
              let img = book.image.split('/').pop();
              let isAdd = wishlist.some(ws => ws.id === book.id);
              return (
                <div key={key} className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
                  <img
                    className="hover:grow hover:shadow-lg h-64"
                    // src={`http://localhost:2000/img/images/${img}`}
                    src={book.image}
                  />
                  <div className="h-16 pt-1 flex items-start justify-between">
                    <h2 className="text-gray-800 text-lg">{book.judul}</h2>

                    {!isAdd && (
                      <div
                        onClick={() => {
                          if (!isUserLogged) {
                            setShowModalDeletion(true);
                          } else {
                            props.addBookWishlist(book);
                          }
                        }}
                      >
                        <i className="far fa-heart text-3xl cursor-pointer"></i>
                      </div>
                    )}
                    {isAdd && (
                      <div onClick={() => props.removeBookWishlist(book)}>
                        <i className="fas fa-heart text-3xl text-red-400"></i>
                      </div>
                    )}
                  </div>

                  <div className="pt-1 text-gray-900">{book.pengarang}</div>
                  {/* <div className="flex items-center">
                    <i className="fas fa-star text-yellow-700" />
                    <i className="fas fa-star text-yellow-700" />
                    <i className="fas fa-star text-yellow-700" />
                    <i className="fas fa-star text-yellow-700" />
                    <i className="far fa-star text-yellow-700" />
                  </div> */}
                  <button
                    className="w-full bg-gray-800 text-white  rounded-lg my-6 py-2 px-10 shadow-lg"
                    onClick={() => history.push(`/detail-book?id=${book.id}`)}
                  >
                    Detail
                  </button>
                </div>
              );
            })}
        </div>
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
    </main>
  );
}
let mapStateToProps = state => {
  return {
    books: state.userBooks.books,
    wishlist: state.wishlist.books,
  };
};

export default withRouter(
  connect(mapStateToProps, { getAllBook, getCategory, addBookWishlist, removeBookWishlist })(Books)
);
