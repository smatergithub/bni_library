import React from 'react';
import { Link } from 'react-router-dom';

function ReserachSuccess() {
  return (
    <React.Fragment>
      <div className="pt-24">
        <div class="container mx-auto flex items-center  pt-4 pb-12 mt-5">
          <section class="bg-gray-200 py-12 w-full">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 class="text-2xl font-bold leading-tight text-center lg:text-3xl">
                TERIMAKASIH !
              </h2>

              <div class=" text-center mt-8  mx-auto md:flex items-center justify-center">
                <div class="md:w-2/6  bg-white rounded-lg shadow-lg m-5">
                  <div class="px-4 py-8">
                    <div class="h-24">
                      <img
                        src={require('../../../../assets/done.png')}
                        alt=""
                        height="100"
                        width="120"
                        class="mx-auto"
                      />
                    </div>
                    <h4 class="mt-10 md:px-10 text-lg font-medium tracking-wide uppercase leading-tight">
                      Berhasil menambahkan riset ke sistem
                    </h4>
                    <div class="mt-3 md:px-10  font-medium tracking-wide leading-tight">
                      Admin akan meninjau riset ini
                    </div>
                    <Link to="/riset">
                      <button className="mx-auto lg:mx-0 hover:underline bg-orange-500 text-white mt-10 rounded-lg my-5 py-2 px-5 shadow-lg">
                        Lihat Halaman Riset{' '}
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
      </div>
    </React.Fragment>
  );
}

export default ReserachSuccess;
