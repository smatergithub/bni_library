import React from 'react';

function Home() {
  return (
    <React.Fragment>
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <div className="w-4/6">
              <div className="w-1/1 p-5 h-24">
                <img src="https://images.unsplash.com/photo-1507738978512-35798112892c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&amp;w=1267&amp;h=600&amp;q=80" />
              </div>
            </div>

            <div className="w-2/6">
              <div className="md:flex h-48 mb-16">
                <div className="md:ml-8 mt-4 md:mt-0  ">
                  <h4 className="text-xl font-bold leading-tight">Katalog</h4>
                  <p className="mt-2 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse mattis
                  </p>
                  <button className="mx-auto lg:mx-0 hover:underline bg-blue-600 text-white  rounded-full my-2 py-2 px-6 shadow-lg">
                    Selengkapnya..
                  </button>
                </div>
                <div>
                  <div className="w-48 h-24 bg-blue-600 rounded-full">
                    <img src={require('../../../../assets/home.svg')} />
                  </div>
                </div>
              </div>
              <div className="md:flex  h-34 ">
                <div className="md:ml-8 mt-10 md:mt-0">
                  <h4 className="text-xl font-bold leading-tight">Riset</h4>
                  <p className="mt-2 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse mattis
                  </p>
                  <button className="mx-auto lg:mx-0 hover:underline bg-blue-600 text-white  rounded-full my-2 py-2 px-5 shadow-lg">
                    Selengkapnya..
                  </button>
                </div>
                <div>
                  <div className="w-48 h-24 bg-blue-600 rounded-full">
                    <img src={require('../../../../assets/home2.svg')} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12 mt-20">
        <section class="bg-gray-100 py-12">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-2xl font-bold leading-tight text-center lg:text-3xl">Jalan Pintas</h2>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-center mt-8">
              <div class="bg-white rounded-lg shadow-lg">
                <div class="px-4 py-8">
                  <div class="h-24">
                    {/* <img src="images/icon-home-1.svg" alt="" class="mx-auto" /> */}
                  </div>
                  <h4 class="mt-10 text-lg font-medium tracking-wide uppercase leading-tight">
                    HOT BOOKS
                  </h4>
                  <p class="mt-2 text-sm text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>

              <div class="bg-white rounded-lg shadow-lg">
                <div class="px-4 py-8">
                  <div class="h-24">
                    {/* <img src="images/icon-home-2.svg" alt="" class="mx-auto" /> */}
                  </div>
                  <h4 class="mt-10 text-lg font-medium tracking-wide uppercase leading-tight">
                    EBOOKS
                  </h4>
                  <p class="mt-2 text-sm text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>

              <div class="bg-white rounded-lg shadow-lg">
                <div class="px-4 py-8">
                  <div class="h-24">
                    {/* <img src="images/icon-home-3.svg" alt="" class="mx-auto" /> */}
                  </div>
                  <h4 class="mt-10 text-lg font-medium tracking-wide uppercase leading-tight">
                    NEWS
                  </h4>
                  <p class="mt-2 text-sm text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
}

export default Home;
