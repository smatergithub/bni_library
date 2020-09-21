import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Select } from 'antd';
import { Helmet } from 'react-helmet';
const { Search } = Input;

function ListReserach(props) {
  let { history } = props;
  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Riset | BNI</title>
      </Helmet>
      <section className="bg-white py-8 ">
        <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12 ">
          <nav id="buku" className="w-full z-30 top-0 px-6 py-1">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0  py-3 mt-16">
              <Link to="/tambah-riset">
                <button className="mx-auto lg:mx-0 hover:underline bg-gray-800 text-white  rounded-lg my-6 py-2 px-10 shadow-lg">
                  Upload Riset
                </button>
              </Link>

              <div className="flex items-center" id="buku-nav-content">
                <div className="pl-3 text-gray-800 inline-block no-underline hover:text-black"></div>

                <div className="text-gray-800 px-1 bg-purple-white ">
                  <Search
                    placeholder="input search title"
                    enterButton="Cari"
                    size="large"
                    id="searchEBook"
                    allowClear
                    // onSearch={value => handleSearch(value)}
                  />
                </div>
                <div
                  className="ml-10 cursor-pointer"
                  // onClick={}
                >
                  Reset Filter
                </div>
              </div>
            </div>
          </nav>
          <div className="container mx-auto flex items-center  pt-4 pb-12 mt-5">
            <section className="bg-gray-200 py-12 w-full">
              <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="md:flex shadow-lg  mx-6  my-5 max-w-lg md:max-w-4xl h-64">
                  <img
                    className="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6"
                    src="https://ik.imagekit.io/q5edmtudmz/FB_IMG_15658659197157667_wOd8n5yFyXI.jpg"
                    alt="bag"
                  />
                  <div className="w-full md:w-2/3 px-4 py-4 bg-white rounded-lg relative">
                    <div className="items-center ">
                      <h2 className="text-xl text-gray-800 font-medium mr-auto">
                        Rounding corners separa tely Ro unding corners separately
                      </h2>
                      <div className="text-gray-500 font-semibold tracking-tighter">
                        12 Agustus 2020
                      </div>
                    </div>
                    <div className="flex items-center  text-gray-700">
                      <i
                        className="fas fa-user"
                        style={{
                          marginTop: 4,
                        }}
                      ></i>
                      <div className="pt-2 ml-2 text-sm">Darvin Sinaga</div>
                    </div>
                    <div className="flex items-center  text-gray-700">
                      <i
                        className="fas fa-university"
                        style={{
                          marginTop: 4,
                        }}
                      ></i>
                      <div className="pt-2 ml-2 text-sm">Universitas Indonesia</div>
                    </div>
                    <div className="flex items-center  text-gray-700">
                      <i
                        className="fas fa-filter"
                        style={{
                          marginTop: 4,
                        }}
                      ></i>
                      <div className="pt-2 ml-2 text-sm">Skripsi</div>
                    </div>
                    <div className="flex items-center  text-gray-700">
                      <i
                        className="fas fa-file"
                        style={{
                          marginTop: 4,
                        }}
                      ></i>
                      <div className="ml-2 text-sm mt-2 px-2 py-1 border-radi bg-green-400  rounded text-white">
                        Tersedia 5 File
                      </div>
                    </div>

                    <div
                      className="flex items-center justify-end  absolute w-full "
                      style={{
                        right: '1em',
                        bottom: '10px',
                      }}
                    >
                      <Link to="/detail-riset">
                        <button className=" bg-gray-800 text-white px-5 py-2 rounded-md ">
                          Detail
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="flex justify-center  mt-10">
          <nav className="relative z-0 inline-flex shadow-sm">
            <div
              // onClick={prev}
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
              1 of 3
            </div>

            <div
              // onClick={next}
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

        {/* <Modal
          title="Authentication required"
          open={showModalDeletion}
          onCLose={() => {
            setShowModalDeletion(false);
          }}
          handleSubmit={redirectToLogin}
        >
          <div className="my-5">Silahkan Login terlebih dahulu</div>
        </Modal> */}
      </section>
    </main>
  );
}

export default ListReserach;
