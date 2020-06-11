import React from 'react';

function Home() {
  return (
    <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12 mt-20">
      <section class="bg-gray-100 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-2xl font-bold leading-tight text-center lg:text-3xl">
            How FairRate works you ask?
          </h2>

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
  );
}

export default Home;
