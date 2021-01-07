import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { pdfjs } from 'react-pdf';
import ReactStars from 'react-rating-stars-component';
import { Input, Select, Tooltip } from 'antd';
import { NoData, Modal } from '../../../../component';
import { getAllEbooks, getEbookCategory } from '../../../../redux/action/ebookUser';
import { addEbookWishlist, removeEbookWishlist } from '../../../../redux/action/wishlist';
import { getCategory } from 'redux/action/bookUser';
import Preview from './component/preview';
import Maintenance from './component/maintenance';
/**
 * isMaintenance boolean to render maintenance pages
 * because the real UI of ebook still on progress
 * once the the function/ui ready, we can change the value of the const to false
 */
const isMaintenance = true;

const { Search } = Input;
const { Option } = Select;

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

  function getEbookCategory() {
    props.getEbookCategory().then(res => {
      if (res.data.length > 0) {
        let categories = res.data
          .map(e => e['label'])
          .map((e, i, final) => final.indexOf(e) === i && i)
          .filter(e => res.data[e])
          .map(e => res.data[e]);
        setCategory(categories);
      }
    });
  }
  React.useEffect(() => {
    if (!isMaintenance) {
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
      setProcessing(true);
      getAllEbook(pagination);
      getEbookCategory();
    }
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
  function onDocumentLoadSuccess({ numPages }) {
    // setNumPages(numPages);
  }

  React.useEffect(() => {
    getAllEbook(pagination);
  }, [pagination]);
  function handleChange(value) {
    setPagination({
      ...pagination,
      kategori: value,
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
      {isMaintenance ? (
        <Maintenance />
      ) : (
        <section className="bg-white py-8 ">
          {/* <div>
          <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div> */}
          <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12 ">
            <nav id="buku" className="w-full z-30 mt-40 px-6 py-1">
              <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0  py-3 mt-16">
                <a
                  className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
                  href="#"
                >
                  Semua Ebook
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
                      id="searchEBook"
                      allowClear
                      onSearch={value => handleSearch(value)}
                    />
                  </div>
                  <div
                    className="ml-10 cursor-pointer"
                    onClick={() => {
                      setCategory([]);
                      document.getElementById('searchEBook').value = '';
                      setCategory([]);
                      getCategory();
                      setPagination({
                        ...pagination,
                        limit: 2,
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
                let isAdd = wishlist.some(ws => ws.id === ebook.id);
                return (
                  <div key={key} className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
                    <img
                      className="hover:grow hover:shadow-lg h-64 w-full"
                      src={
                        ebook.image ? ebook.image : require('../../../../assets/default-book.svg')
                      }
                    />
                    <div className="h-16 pt-2 flex items-start justify-between">
                      <h2 className="text-gray-800 text-lg">{ebook.judul.slice(0, 70)}</h2>
                      {!isAdd && (
                        <div
                          onClick={() => {
                            if (!isUserLogged) {
                              setShowModalDeletion(true);
                            } else {
                              props.addEbookWishlist(ebook);
                            }
                          }}
                        >
                          <i className="fas fa-cart-plus text-3xl cursor-pointer"></i>
                        </div>
                      )}
                      {isAdd && (
                        <div onClick={() => props.removeEbookWishlist(ebook)}>
                          <i className="fas fa-cart-plus text-3xl text-green-500"></i>
                        </div>
                      )}
                    </div>

                    <div className="pt-1 text-gray-900">{ebook.pengarang}</div>
                    <div className="flex items-center justify-between">
                      <ReactStars
                        count={6}
                        value={
                          ebook.totalRead
                            ? ebook.countRating
                              ? ebook.countRating / ebook.totalRead
                              : 0
                            : 0
                        }
                        size={20}
                        activeColor="#ffd700"
                      />
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
                      className="w-full bg-orange-500 text-white  rounded-lg my-2 py-2 px-5 shadow-lg"
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
          <Modal
            title="Preview"
            large={true}
            open={showPreview.open}
            onCLose={() => {
              setShowPreview({
                open: false,
                file: null,
              });
            }}
            handleSubmit={() => {
              setShowPreview({
                open: false,
                file: null,
              });
            }}
          >
            <Preview id={showPreview.file} />
          </Modal>
        </section>
      )}
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
    addEbookWishlist,
    removeEbookWishlist,
    getEbookCategory,
  })(Ebooks)
);
