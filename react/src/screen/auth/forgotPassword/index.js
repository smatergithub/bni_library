import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { forgotPassword } from 'redux/action/user';
import { ToastError } from 'component';

function ForgotPassword(props) {
  const [email, setEmail] = React.useState('');
  const [sendSuccess, setSendSuccess] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (email.trim().length == 0) {
      ToastError('Email tidak boleh kosong');
    } else if (
      /^(([^<>()%[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
        `${email}`
      ) === false
    ) {
      ToastError('Email tidak valid');
    } else {
      props.forgotPassword({ email }).then(res => {
        if (res.resp) {
          setSendSuccess(true);
        }
      });
    }
  }
  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Lupa Sandi | E-BNI</title>
      </Helmet>
      <section className="absolute w-full h-full">
        <div
          className="absolute top-0 w-full h-full bg-orange-500"
          // style="background-image: url(./assets/img/register_bg_2.png); background-size: 100%; background-repeat: no-repeat;"
        ></div>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h4 className="text-gray-600 text-sm font-bold">Lupa Password</h4>
                  </div>

                  <hr className="mt-6 border-b-1 border-gray-400" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  {sendSuccess && (
                    <div>
                      <div className="py-5 text-lg text-center">
                        {' '}
                        Silahkan periksa email anda, jika email terdaftar ke sistem maka akan
                        menerima kode untuk melakukan pembuatan password baru
                      </div>
                      <button
                        onClick={() => window.location.replace('/')}
                        className="bg-green-500 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded  hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="submit"
                        style={{
                          transition: 'all 0.15s ease 0s',
                        }}
                      >
                        Ke Beranda
                      </button>
                    </div>
                  )}
                  {!sendSuccess && (
                    <form onSubmit={e => handleSubmit(e)}>
                      <div className="mt-10 mb-10 text-center">
                        <div className="text-gray-700 mt-5">
                          Masukkan email yang telah terdaftar untuk menerima kode untuk melakukan
                          pembuatan password baru.
                        </div>
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          for="grid-password"
                        >
                          Email
                        </label>

                        <input
                          type="email"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm focus:outline-none border w-full"
                          placeholder="Email"
                          onChange={e => setEmail(e.target.value)}
                          style={{
                            transition: 'all 0.15s ease 0s',
                          }}
                        />
                      </div>

                      <div className="text-center mt-12">
                        <button
                          className="bg-green-500 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{
                            transition: 'all 0.15s ease 0s',
                          }}
                        >
                          KIRIM
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
export default connect(null, { forgotPassword })(ForgotPassword);
