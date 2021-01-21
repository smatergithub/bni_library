import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { pdfjs } from 'react-pdf';
import ReactStars from 'react-rating-stars-component';
import { Rating } from 'semantic-ui-react';
import { Select, Tooltip } from 'antd';
import { NoData, Modal } from '../../../../component';
import { getAllEbooks, getEbookCategory } from '../../../../redux/action/ebookUser';
import { addEbookWishlist, removeEbookWishlist } from '../../../../redux/action/wishlist';
import { getCategory } from 'redux/action/bookUser';
import Preview from './component/preview';
import Maintenance from './component/maintenance';

import { Dropdown, Input } from 'semantic-ui-react';
import { checkIsImageExist } from '../../component/helper';

function Ebooks(props) {
  let { history } = props;
  let [processing, setProcessing] = React.useState(false);
  let [category, setCategory] = React.useState([]);
  let [showPreview, setShowPreview] = React.useState({
    open: false,
    file: null,
  });

  let [showModalDeletion, setShowModalDeletion] = React.useState(false);
  const [pagination, setPagination] = React.useState({
    limit: 8,
    page: 1,
    judul: '',
    kategori: '',
  });

  function getAllEbook(params) {
    props.getAllEbooks(params).then(() => {
      setProcessing(false);
    });
  }

  function getCategory() {
    props.getCategory().then(res => {
      if (res.resp) {
        if (res.data.length > 0) {
          let filterCategories = res.data
            .map(e => e['label'])
            .map((e, i, final) => final.indexOf(e) === i && i)
            .filter(e => res.data[e])
            .map(e => res.data[e]);
          let categories = filterCategories.map(e => ({ text: e.label, value: e.label }));
          setCategory(categories);
        }
      }
    });
  }
  React.useEffect(() => {
    setProcessing(true);
    getAllEbook(pagination);
    getCategory();
  }, []);

  function prev() {
    if (props.ebooks.activePage > 1) {
      setPagination({
        ...pagination,
        page: props.ebooks.activePage - 1,
        judul: '',
      });
    }
  }
  function next() {
    if (props.ebooks.totalPage !== props.ebooks.activePage) {
      if (props.ebooks.data.length !== 0) {
        setPagination({
          ...pagination,
          page: props.ebooks.activePage + 1,
          judul: '',
        });
      }
    }
  }
  React.useEffect(() => {
    getAllEbook(pagination);
  }, [pagination]);

  function handleChange(value) {
    setPagination({
      ...pagination,
      kategori: value,
      judul: '',
    });
  }
  function handleSearch(value) {
    setPagination({
      ...pagination,
      judul: value,
    });
  }
  function redirectToLogin() {
    props.history.push('/auth/login');
  }
  if (processing && props.ebooks === null) return null;

  const { wishlist } = props;

  let isUserLogged = localStorage.getItem('bni_UserRole') === '1';
  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ebook | E-BNI</title>
      </Helmet>
      <section className="bg-white py-8 ">
        <div className="container mx-auto  flex items-center flex-wrap pt-4 pb-12 ">
          <nav id="buku" className="w-full z-30  px-6 py-1 md:mt-16">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0">
              <a
                className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
                href="#"
              >
                Semua Ebook
              </a>

              <div className="flex items-center" id="buku-nav-content">
                <div className="pl-3 text-gray-800 inline-block no-underline hover:text-black">
                  <Dropdown
                    placeholder="Kategori"
                    onChange={(e, { value }) => handleChange(value)}
                    selection
                    value={pagination.kategori}
                    options={category}
                  />
                </div>

                <div className="text-gray-800 px-1 bg-purple-white ">
                  <div class="ui icon input search">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={pagination.judul}
                      onChange={value => handleSearch(value.target.value)}
                    />
                    <i
                      onClick={() => {
                        setPagination({
                          ...pagination,
                          limit: 8,
                          page: 1,
                          judul: '',
                          kategori: '',
                        });
                      }}
                      aria-hidden="true"
                      class="close icon tutup"
                      style={{ cursor: 'pointer' }}
                    ></i>
                  </div>
                  {/* <Search
                    style={{
                      borderRadius: '10px',
                    }}
                    placeholder="Masukkan Judul"
                    id="searchBook"
                    enterButton="Cari"
                    size="large"
                    onSearch={value => handleSearch(value)}
                  /> */}
                </div>
                <div
                  className="ml-10 cursor-pointer"
                  onClick={() => {
                    setCategory([]);
                    getCategory();
                    setPagination({
                      ...pagination,
                      limit: 8,
                      page: 1,
                      judul: '',
                      kategori: '',
                    });
                  }}
                >
                  Reset Filter
                </div>
              </div>
            </div>
          </nav>
          {props.ebooks && props.ebooks.data.length === 0 && <NoData />}
          {props.ebooks &&
            props.ebooks.data.map((ebook, key) => {
              let img = '';
              if (ebook.image !== null && checkIsImageExist(ebook.image)) {
                img = ebook.image;
              } else if (ebook.image !== null) {
                img = ebook.image + '/preview';
              } else {
                img = require('../../../../assets/NoImage.png');
              }

              let isAdd = wishlist.some(ws => ws.id === ebook.id);
              return (
                <div key={key} className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
                  <img className="hover:grow hover:shadow-lg h-64" src={img} />
                  <div className="h-16 pt-1 flex items-start justify-between">
                    <Tooltip placement="bottom" title={ebook.judul}>
                      <h2
                        className="text-gray-800 text-lg"
                        style={{ fontSize: '16px', paddingRight: '4px' }}
                      >
                        {ebook.judul.length > 50
                          ? ebook.judul.slice(0, 50) + '...'
                          : ebook.judul.slice(0, 50)}
                      </h2>
                    </Tooltip>

                    {!isAdd && (
                      <div
                        onClick={() => {
                          if (!isUserLogged) {
                            setShowModalDeletion(true);
                          } else {
                            props.addBookWishlist(ebook);

                            // let data = [...book];
                            // localStorage.setItem('bni_book', JSON.stringify(data));
                          }
                        }}
                      >
                        <i className="fas fa-cart-plus text-3xl cursor-pointer"></i>
                      </div>
                    )}
                    {isAdd && (
                      <div onClick={() => props.removeBookWishlist(ebook)}>
                        <i className="fas fa-cart-plus text-3xl text-green-500"></i>
                      </div>
                    )}
                  </div>

                  <div className="pt-1 text-gray-900" style={{ fontSize: '11px' }}>
                    {ebook.pengarang}
                  </div>
                  <div className="flex items-center justify-between">
                    <Rating defaultRating={ebook.countRating} maxRating={6} icon="star" disabled />
                    <span>
                      <i className="fas fa-heart text-yellow-700" />{' '}
                      {ebook.totalRead ? ebook.totalRead : 0}
                    </span>
                  </div>
                  {/* <button
                    onClick={() => {
                      setShowPreview({
                        open: true,
                        file: ebook.id,
                      });
                    }}
                    // onClick={() => history.push(`/ebook-preview?id=${ebook.id}`)}
                    className={`w-full bg-white text-gray-800
                  rounded-lg my-1 py-2 px-10 border mt-2  border-gray-600
                `}
                  >
                    Lihat Preview
                  </button> */}
                  <button
                    className="w-full bg-orange-500 text-white  rounded-lg my-6 py-2 px-10 shadow-lg"
                    onClick={() => history.push(`/detail-ebook?id=${ebook.id}`)}
                  >
                    Detail
                  </button>
                </div>
              );
            })}
        </div>
        {props.ebooks && props.ebooks.data.length !== 0 && (
          <div className="flex justify-center  mt-10">
            <nav className="relative z-0 inline-flex shadow-sm">
              <div
                onClick={prev}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                aria-label="Previous"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    clipRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div
                href="#"
                className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700  transition ease-in-out duration-150"
              >
                {props.ebooks.activePage} of {props.ebooks.totalPage}
              </div>

              <div
                onClick={next}
                className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                aria-label="Next"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    clipRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </nav>
          </div>
        )}
      </section>
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
    </main>
  );
}
let mapStateToProps = state => {
  return {
    ebooks: state.userEbooks.ebooks,
    wishlist: state.wishlist.ebooks,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getAllEbooks,
    getCategory,
    addEbookWishlist,
    removeEbookWishlist,
    getEbookCategory,
  })(Ebooks)
);
