import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from 'component';
import { Modal } from '../../../../component';

function Reserach(props) {
  let [showModalDeletion, setShowModalDeletion] = React.useState(false);
  let { history } = props;
  function redirectToLogin() {
    window.location.replace('/auth/login');
  }
  let isUserLogged = localStorage.getItem('bni_UserRole') === null;
  let checkIsUserRepoAdmin = localStorage.getItem('bni_repoAdmin') === '1';

  return (
    <React.Fragment>
      <div className="pt-24">
        <div className="container px-3 mx-auto xl:mx-0 lg:mx-0 flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-3/5 justify-center items-start text-start md:text-left">
            <h1 className="my-4 mobile:pt-0 md:pt-10 lg:pt-10  text-3xl font-bold leading-tight">
              Riset BNI{' '}
            </h1>

            <p className="leading-normal text-2xl mb-8">
              BNI Hi Mover's, pasti kalian tertarik untuk melihat hasil karya mahasiswa yang
              melakukan penelitian di BNI, tentunya mereka adalah mahasiswa jenjang S1 dan S2. Jika
              kamu juga ingin melakukan penelitian, silakan lengkapi ketentuan di bawah.
            </p>

            {checkIsUserRepoAdmin && (
              <Link to="/tambah-riset">
                <button className="mx-auto md:mx-0 xl:mx-0 lg:mx-0 hover:underline bg-orange-500 text-white  rounded-lg my-6 py-2 px-10 shadow-lg">
                  Upload Riset
                </button>
              </Link>
            )}
          </div>

          <div className="w-full md:w-2/5 py-6 text-center">
            <img
              className="w-full md:w-4/5 z-50"
              src={require('../../../../assets/research.png')}
            />
          </div>
        </div>
        <div class="container mx-auto flex items-center  pt-4 pb-12 mt-5">
          <section class="bg-gray-200 py-12 w-full">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 class="text-2xl font-bold leading-tight text-center lg:text-3xl">
                REPOSITORY RISET BNI
              </h2>

              <div class=" text-center mt-8  mx-auto md:flex items-center justify-center">
                <div class="md:w-2/6  bg-white  rounded-lg shadow-lg ">
                  <div class="px-4 py-8">
                    <div class="h-24">
                      <img
                        src={require('../../../../assets/building.png')}
                        alt=""
                        height="100"
                        width="120"
                        class="mx-auto"
                      />
                    </div>
                    <h4 class="mt-10 text-lg font-medium tracking-wide uppercase leading-tight">
                      KANTOR PUSAT
                    </h4>
                    <p class="mt-2 text-sm text-gray-700 px-10">
                      Kumpulan riset Mahasiswa yang melakukan dengan subjek di kantor pusat atau
                      divisi yang ada dalam satuan BNI
                    </p>

                    {!isUserLogged ? (
                      <Link to="/daftar-riset?kategori=pusat">
                        <button className="mx-auto lg:mx-0 hover:underline bg-orange-500 text-white  rounded-lg my-2 py-2 px-5 shadow-lg">
                          Selengkapnya{' '}
                          <span>
                            <i className={`fas fa-arrow-right ml-3`} />
                          </span>
                        </button>
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          if (isUserLogged) {
                            setShowModalDeletion(true);
                          }
                        }}
                        className="mx-auto lg:mx-0 hover:underline bg-orange-500 text-white  rounded-lg my-2 py-2 px-5 shadow-lg"
                      >
                        Selengkapnya{' '}
                        <span>
                          <i className={`fas fa-arrow-right ml-3`} />
                        </span>
                      </button>
                    )}
                  </div>
                </div>

                <div class="md:w-2/6  bg-white rounded-lg shadow-lg m-5">
                  <div class="px-4 py-8">
                    <div class="h-24">
                      <img
                        src={require('../../../../assets/town.png')}
                        alt=""
                        height="100"
                        width="120"
                        class="mx-auto"
                      />
                    </div>
                    <h4 class="mt-10 text-lg font-medium tracking-wide uppercase leading-tight">
                      KANTOR WILAYAH
                    </h4>

                    <p class="mt-2 text-sm text-gray-700 px-10">
                      Kumpulan riset mahasiswa yang melakukan penelitian dengan subjek di kantor
                      wilayah atau ke unit yang ada dalam satuan BNI
                    </p>
                    {!isUserLogged ? (
                      <Link to="/daftar-riset?kategori=wilayah">
                        <button className="mx-auto lg:mx-0 hover:underline bg-orange-500 text-white  rounded-lg my-2 py-2 px-5 shadow-lg">
                          Selengkapnya{' '}
                          <span>
                            <i className={`fas fa-arrow-right ml-3`} />
                          </span>
                        </button>
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          if (isUserLogged) {
                            setShowModalDeletion(true);
                          }
                        }}
                        className="mx-auto lg:mx-0 hover:underline bg-orange-500 text-white  rounded-lg my-2 py-2 px-5 shadow-lg"
                      >
                        Selengkapnya{' '}
                        <span>
                          <i className={`fas fa-arrow-right ml-3`} />
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
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
      <Footer />
    </React.Fragment>
  );
}

export default Reserach;
