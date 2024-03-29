import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from 'component';

function Home() {
  return (
    <React.Fragment>
      <section className="py-16 lg:py-16 lg:mt-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-8">
            <div className="h-64">
              <div className="w-1/1 p-5 ">
                <img src="https://images.unsplash.com/photo-1507738978512-35798112892c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&amp;w=1267&amp;h=800&amp;q=80" />
              </div>
            </div>

            <div className="pr-20 md:mt-0 sm:mt-64">
              <div className="md:flex h-48  ">
                <div className="md:ml-8 mt-4 md:mt-0  ">
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      // paddingTop: '20px',
                    }}
                  >
                    <div style={{ paddingTop: '42px' }}>
                      <h4 className="text-xl font-bold leading-tight">Katalog</h4>
                      <p className="mt-2 leading-relaxed">
                        Ada beberapa pilihan buku yang dapat kamu pinjam dan diantar gratis.
                      </p>
                      <Link to="/books">
                        <button className="mx-auto lg:mx-0 hover:underline bg-green-600 text-white  rounded-lg my-2 py-2 px-6 shadow-lg ">
                          Buku
                          <span>
                            <i className={`fas fa-arrow-right ml-3`} />
                          </span>
                        </button>
                      </Link>
                      <Link to="/ebooks">
                        <button className="ml-4  hover:underline bg-orange-500 text-white  rounded-lg  py-2 px-6 shadow-lg ">
                          Ebook
                          <span>
                            <i className={`fas fa-arrow-right ml-3`} />
                          </span>
                        </button>
                      </Link>
                    </div>
                    {/* <img src={require('../../../../assets/katalog.png')} className="w-64  h-64" /> */}
                  </div>
                </div>
              </div>
              <div style={{ paddingTop: '48px' }}>
                <div className="md:ml-8 mt-10 md:mt-0">
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ paddingTop: '42px' }}>
                      <h4 className="text-xl font-bold leading-tight">Riset</h4>
                      <p className="mt-2 leading-relaxed">
                        Buat kamu yang ingin melakukan riset di BNI, temui detailnya di bagian FAQ,
                        ya!
                      </p>
                      <Link to="/riset">
                        <button className="mx-auto lg:mx-0 hover:underline bg-green-600 text-white  rounded-lg my-2 py-2 px-5 shadow-lg ">
                          Selengkapnya..
                          <span>
                            <i className={`fas fa-arrow-right ml-3`} />
                          </span>
                        </button>
                      </Link>
                    </div>
                    {/* <img src={require('../../../../assets/riset.png')} className="w-64  h-64" /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12 mt-5">
        <section class="py-12 " style={{ marginTop: '96px' }}>
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-2xl font-bold leading-tight text-center lg:text-3xl">Jalan Pintas</h2>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-2 text-center mt-8">
              <div class="bg-white ">
                <div class="px-4 py-8">
                  <div class="h-24">
                    <img
                      src={require('../../../../assets/book.svg')}
                      alt=""
                      height="100"
                      width="120"
                      class="mx-auto"
                    />
                  </div>
                  <h4 class="mt-10 text-lg font-medium tracking-wide uppercase leading-tight">
                    HOT BOOKS
                  </h4>
                  <div class="mt-2 text-sm text-gray-700">
                    Buku-buku populer yang wajib dibaca oleh segenap BNI Hi-Movers untuk
                    meningkatkan kompetensi dan kemampuan.
                  </div>
                  <Link to="/favorite-book">
                    <button className="mx-auto lg:mx-0 hover:underline bg-orange-500 text-white  rounded-lg my-2 py-2 px-5 shadow-lg ">
                      Selengkapnya{' '}
                      <span>
                        <i className={`fas fa-arrow-right ml-3`} />
                      </span>
                    </button>
                  </Link>
                </div>
              </div>

              <div class="bg-white ">
                <div class="px-4 py-8">
                  <div class="h-24">
                    <img
                      src={require('../../../../assets/ebook.svg')}
                      alt=""
                      height="100"
                      width="120"
                      class="mx-auto"
                    />
                  </div>
                  <h4 class="mt-10 text-lg font-medium tracking-wide uppercase leading-tight">
                    EBOOKS
                  </h4>
                  <div class="mt-2 text-sm text-gray-700">
                    Buku elektronik yang dapat dibaca kapan saja, di mana saja. Hanya dengan sekali
                    klik melalui smartphone Anda.
                    {/* Mohon maaf, saat ini sistem masih dalam pengembangan. */}
                  </div>
                  <Link to="/favorite-ebook">
                    <button className="mx-auto lg:mx-0 hover:underline bg-orange-500 text-white  rounded-lg my-2 py-2 px-5 shadow-lg ">
                      Selengkapnya{' '}
                      <span>
                        <i className={`fas fa-arrow-right ml-3`} />
                      </span>
                    </button>
                  </Link>
                </div>
              </div>

              <div class="bg-white ">
                <div class="px-4 py-8">
                  <div class="h-24">
                    <img
                      src={require('../../../../assets/newspaper.svg')}
                      alt=""
                      height="100"
                      width="120"
                      class="mx-auto"
                    />
                  </div>
                  <h4 class="mt-10 text-lg font-medium tracking-wide uppercase leading-tight">
                    Riset
                  </h4>
                  <div class="mt-2 text-sm text-gray-700">
                    Berbagai hasil penelitian yang telah dilakukan oleh mahasiswa dari jenjang S1
                    sampai dengan S3 seputar BNI.
                  </div>
                  <Link to="/riset">
                    <button className="mx-auto lg:mx-0 hover:underline bg-orange-500 text-white  rounded-lg my-2 py-2 px-5 shadow-lg ">
                      Selengkapnya{' '}
                      <span>
                        <i className={`fas fa-arrow-right ml-3`} />
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default Home;
