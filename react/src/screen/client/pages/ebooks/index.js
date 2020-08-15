import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Input, Select } from 'antd';
import { NoData, Modal } from '../../../../component';
import { getAllEbooks, getEbookCategory } from '../../../../redux/action/ebookUser';
import { addEbookWishlist, removeEbookWishlist } from '../../../../redux/action/wishlist';
const { Search } = Input;
const { Option } = Select;

function Ebooks(props) {
  let { history } = props;
  let [processing, setProcessing] = React.useState(false);
  let [category, setCategory] = React.useState([]);
  let [searchParam, setSearchParam] = React.useState('');
  let [showModalDeletion, setShowModalDeletion] = React.useState(false);

  function getAllEbook(params) {
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

    props.getAllEbooks(formData).then(() => {
      setProcessing(false);
    });
    function getEbookCategory() {
      props.getEbookCategory().then(res => {
        if (res.data.length > 0) {
          setCategory(res.data);
        }
      });
    }
  }
  React.useEffect(() => {
    setProcessing(true);
    getAllEbook();
    getEbookCategory();
  }, []);

  function handleChange(value) {
    getAllEbook({ kategori: value });
  }
  function handleSearch(value) {
    setSearchParam(value);
    getAllEbook({ judul: value });
  }
  function redirectToLogin() {
    props.history.push('/auth/login');
  }

  if (processing && props.ebooks === null) return null;
  const { wishlist } = props;
  let isUserLogged = localStorage.getItem('bni_UserRole') === '1';

  return (
    <main>
      <section className="bg-white py-8 ">
        <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12 ">
          <nav id="buku" className="w-full z-30 top-0 px-6 py-1">
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
                    allowClear
                    onSearch={value => handleSearch(value)}
                  />
                </div>
                <div
                  className="ml-10 cursor-pointer"
                  onClick={() => {
                    setSearchParam('');
                    setCategory([]);
                    getEbookCategory();
                    getAllEbook();
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
              let img = ebook.image.split('/').pop();
              let isAdd = wishlist.some(ws => ws.id === ebook.id);
              return (
                <div key={key} className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
                  <img
                    className="hover:grow hover:shadow-lg h-64"
                    // src={`http://localhost:2000/img/images/${img}`}
                    src={ebook.image}
                  />
                  <div className="h-16 pt-2 flex items-start justify-between">
                    <h2 className="text-gray-800 text-lg">{ebook.judul}</h2>

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
                        <i className="far fa-heart text-3xl cursor-pointer"></i>
                      </div>
                    )}
                    {isAdd && (
                      <div onClick={() => props.removeEbookWishlist(ebook)}>
                        <i className="fas fa-heart text-3xl text-red-400"></i>
                      </div>
                    )}
                  </div>

                  <div className="pt-1 text-gray-900">{ebook.pengarang}</div>
                  <div className="flex items-center">
                    <i className="fas fa-star text-yellow-700" />
                    <i className="fas fa-star text-yellow-700" />
                    <i className="fas fa-star text-yellow-700" />
                    <i className="fas fa-star text-yellow-700" />
                    <i className="far fa-star text-yellow-700" />
                  </div>
                  <button
                    className="w-full bg-gray-800 text-white  rounded-lg my-6 py-2 px-10 shadow-lg"
                    onClick={() => history.push(`/detail-ebook?id=${ebook.id}`)}
                  >
                    Detail
                  </button>
                </div>
              );
            })}
        </div>
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
      </section>
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
