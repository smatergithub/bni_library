import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Input, Select } from 'antd';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { NoData } from '../../../../component';
import { getRepositorysByUser } from '../../../../redux/action/repositorys';
const { Search } = Input;

function ListReserach(props) {
  const parsed = queryString.parse(props.location.search);
  let { kategori } = parsed;
  let [processing, setProcessing] = React.useState(false);
  let [research, setResearch] = React.useState(null);
  const [pagination, setPagination] = React.useState({
    limit: 8,
    page: 1,
    title: '',
    kategori: kategori === 'pusat' ? 'Pusat' : kategori === 'wilayah' ? 'Wilayah' : '',
  });
  let { history } = props;
  function getAllResearch(params) {
    props.getRepositorysByUser(params).then(res => {
      setResearch(res.data);

      setProcessing(false);
    });
  }
  React.useEffect(() => {
    if (kategori) {
      setProcessing(true);
      getAllResearch(pagination);
      // setPagination({
      //   ...pagination,
      //   kategori: kategori,
      // });
    } else {
      history.push('/riset');
    }
  }, []);
  function handleSearch(value) {
    setPagination({
      ...pagination,
      title: value,
    });
  }
  function prev() {
    if (research.activePage > 1) {
      setPagination({
        ...pagination,
        page: research.activePage - 1,
        title: '',
      });
    }
  }
  function next() {
    if (research.totalPage !== research.activePage) {
      if (research.data.length !== 0) {
        setPagination({
          ...pagination,
          page: research.activePage + 1,
          title: '',
        });
      }
    }
  }
  React.useEffect(() => {
    getAllResearch(pagination);
  }, [pagination]);
  if (!research && processing) return null;
  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Riset | BNI</title>
      </Helmet>
      <section className="bg-white py-8 ">
        <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12 ">
          <nav id="buku" className="w-full z-30 top-0 px-6 py-1">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between   py-3 mt-16">
              <Link to="/tambah-riset">
                <button className="mx-auto lg:mx-0 hover:underline bg-orange-500 text-white  rounded-lg my-6 py-2 px-10 shadow-lg">
                  Upload Riset
                </button>
              </Link>

              <div className="flex items-center" id="buku-nav-content">
                <div className="pl-3 text-gray-800 inline-block no-underline hover:text-black"></div>

                <div className="text-gray-800 px-1 bg-purple-white ">
                  <Search
                    placeholder="Cari Riset"
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
                    setPagination({
                      ...pagination,
                      limit: 8,
                      page: 1,
                      title: '',
                    });
                  }}
                >
                  Reset Filter
                </div>
              </div>
            </div>
          </nav>
          <div className="container mx-auto flex items-center  pt-4 pb-12 mt-5">
            <section className="bg-gray-200 py-12 w-full">
              {research && research.data.length === 0 && <NoData />}
              {research &&
                research.data.length !== 0 &&
                research.data.map((item, key) => {
                  let countFile = 0;
                  for (key in item) {
                    if (item[key] && key.indexOf('bab') - 1 == -1) {
                      countFile++;
                    }
                  }
                  return (
                    <div key={key} className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="md:flex shadow-lg  mx-6  my-5 max-w-lg md:max-w-4xl h-64">
                        <img
                          className="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6"
                          src="https://ik.imagekit.io/q5edmtudmz/FB_IMG_15658659197157667_wOd8n5yFyXI.jpg"
                          alt="bag"
                        />
                        <div className="w-full md:w-2/3 px-4 py-4 bg-white rounded-lg relative">
                          <div className="items-center ">
                            <h2 className="text-xl text-gray-800 font-medium mr-auto">
                              {item.title}
                            </h2>
                            <div className="text-gray-500 font-semibold tracking-tighter">
                              {item.releaseYear}
                            </div>
                          </div>
                          <div className="flex items-center  text-gray-700">
                            <i
                              className="fas fa-user"
                              style={{
                                marginTop: 4,
                              }}
                            ></i>
                            <div className="pt-2 ml-2 text-sm">{item.name}</div>
                          </div>
                          <div className="flex items-center  text-gray-700">
                            <i
                              className="fas fa-university"
                              style={{
                                marginTop: 4,
                              }}
                            ></i>
                            <div className="pt-2 ml-2 text-sm">{item.university}</div>
                          </div>
                          <div className="flex items-center  text-gray-700">
                            <i
                              className="fas fa-filter"
                              style={{
                                marginTop: 4,
                              }}
                            ></i>
                            <div className="pt-2 ml-2 text-sm">Jenis Riset : {item.category}</div>
                          </div>
                          {/* <div className="flex items-center  text-gray-700">
                            <i
                              className="fas fa-file"
                              style={{
                                marginTop: 4,
                              }}
                            ></i>
                            <div className="ml-2 text-sm mt-2 px-2 py-1 border-radi bg-green-400  rounded text-white">
                              {`Tersedia ${countFile} File`}
                            </div>
                          </div> */}

                          <div
                            className="flex items-center justify-end  absolute w-full "
                            style={{
                              right: '1em',
                              bottom: '10px',
                            }}
                          >
                            <Link to={`/detail-riset?id=${item.id}`}>
                              <button className=" bg-orange-600 text-white px-5 py-2 rounded-md ">
                                Detail
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </section>
          </div>
        </div>
        {research && research.data.length !== 0 && (
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
                {research.activePage} of {research.totalPage}
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
    </main>
  );
}

export default connect(null, { getRepositorysByUser })(withRouter(ListReserach));
