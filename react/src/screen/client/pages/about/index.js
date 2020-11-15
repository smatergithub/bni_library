import React from 'react';
import { Helmet } from 'react-helmet';
// https://images.unsplash.com/photo-1503901813544-0b22efb6ba5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80

function About() {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Tentang | Ebni</title>
      </Helmet>
      <div
        className="relative pt-16 pb-32 flex content-center items-center justify-center"
        style={{
          minHeight: '75vh',
        }}
      >
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1503901813544-0b22efb6ba5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1267&amp;q=80")',
          }}
        >
          <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black "></span>
        </div>
        <div className="container relative mx-auto">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div className="pr-12">
                <h1 className="text-white font-semibold text-5xl">E Library</h1>
                <p className="mt-4 text-lg text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu accumsan elit.
                  Nam hendrerit massa leo, quis congue orci vestibulum vel. Nunc sem nisl, volutpat
                  ut felis in, feugiat ornare quam.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
          style={{
            height: '70px',
            transform: 'translateZ(0px)',
          }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-orange-500 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </div>
      <section className="pb-20 bg-gray-300 -mt-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center mt-32">
            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
              <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-100">
                <i className="fas fa-user-friends text-xl"></i>
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal">FASILITAS</h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu accumsan elit. Nam
                hendrerit massa leo, quis congue orci vestibulum vel. Nunc sem nisl, volutpat ut
                felis in, feugiat ornare quam
              </p>
              <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu accumsan elit. Nam
                hendrerit massa leo, quis congue orci vestibulum vel. Nunc sem nisl, volutpat ut
                felis in, feugiat ornare quam
              </p>
              <a
                href="https://www.creative-tim.com/learning-lab/tailwind-starter-kit#/presentation"
                className="font-bold text-gray-800 mt-8 underline"
              >
                Selengkapnya
              </a>
            </div>
            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-orange-500">
                <img
                  alt="..."
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1051&amp;q=80"
                  className="w-full align-middle rounded-t-lg"
                />
                <blockquote className="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block"
                    style={{
                      height: '95px',
                      top: '-94px',
                    }}
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      className="text-orange-500 fill-current"
                    ></polygon>
                  </svg>
                  <h4 className="text-xl font-bold text-white">Services</h4>
                  <p className="text-md font-light mt-2 text-white">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu accumsan elit.
                    Nam hendrerit massa leo, quis congue orci vestibulum vel. Nunc sem nisl,
                    volutpat ut felis in, feugiat ornare quam
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative py-20">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
          style={{
            height: '80px',
            transform: 'translateZ(0px)',
          }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon className="text-white fill-current" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
        <div className="container mx-auto px-4">
          <div className="items-center flex flex-wrap">
            <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
              <img
                alt="..."
                className="max-w-full rounded-lg shadow-lg"
                src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=634&amp;q=80"
              />
            </div>
            <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
              <div className="md:pr-12">
                <div className="text-pink-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-pink-300">
                  <i className="fas fa-rocket text-xl"></i>
                </div>
                <h3 className="text-3xl font-semibold">Layanan Kami</h3>
                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu accumsan elit.
                  Nam hendrerit massa leo, quis congue orci vestibulum vel. Nunc sem nisl, volutpat
                  ut felis in, feugiat ornare quam
                </p>
                <ul className="list-none mt-6">
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                          <i className="fas fa-fingerprint"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-gray-600">Cafe</h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                          <i className="fab fa-html5"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-gray-600">TV</h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                          <i className="far fa-paper-plane"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-gray-600">Wifi</h4>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-20 bg-orange-400 mt-24 pt-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                    <i className="fas fa-award"></i>
                  </div>
                  <h6 className="text-xl font-semibold">Kontak Kami</h6>
                  <p className="mt-2 mb-4 text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu accumsan elit.
                    Nam hendrerit massa leo
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                    <i className="fas fa-retweet"></i>
                  </div>
                  <h6 className="text-xl font-semibold">Download</h6>
                  <p className="mt-2 mb-4 text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu accumsan elit.
                    Nam hendrerit massa leo
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-6 w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-400">
                    <i className="fas fa-fingerprint"></i>
                  </div>
                  <h6 className="text-xl font-semibold">Lokasi</h6>
                  <p className="mt-2 mb-4 text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu accumsan elit.
                    Nam hendrerit massa leo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default About;
