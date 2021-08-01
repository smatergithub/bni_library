import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { signIn, getMe } from '../../../redux/action/user';
import { ToastError } from '../../../component';
import { Loader } from 'semantic-ui-react';

const LoadingPreview = () => (
  <Loader active inline="centered">
    Loading
  </Loader>
);

function Login(props) {
  let { history } = props;
  let [user, setUser] = useState({ npp: '', password: '' });
  let [loading, setLoading] = useState(false);

  function onLogin(e) {
    e.preventDefault();

    if (user.npp.trim().length === 0 || user.password.trim().length === 0) {
      ToastError('NPP atau password tidak boleh kosong');
    } else {
      let data = {
        npp: user.npp,
        password: user.password,
      };
      setLoading(true);
      props
        .signIn(data)
        .then((res) => {
          if (res.resp) {
            if (res.data.message === 'firstLogin') {
              props
                .signIn(data)
                .then((res) => {
                  localStorage.setItem('access_token_ebni', res.data.accessToken);

                  if (res.resp) {
                    // history.push('/admin/dashboard');
                    props.getMe().then((res) => {
                      if (res.data.isAdmin || res.data.superAdmin) {
                        history.push('/admin/dashboard');
                      } else {
                        // history.push('/profile/home?edit=true');
                        history.push('/home');
                      }
                    });
                  } else {
                    ToastError(res.msg);
                  }
                })
                .catch((err) => {
                  let msg = err.message || 'Something wrong';
                  if (msg === 'Terjadi Kesalahan Koneksi Ke Database Servers') {
                    ToastError('Username atau password salah.');
                  } else {
                    ToastError(msg);
                  }
                });
            } else {
              localStorage.setItem('access_token_ebni', res.data.accessToken);

              props.getMe().then((res) => {
                console.log('res', res);
                if (res.data.isAdmin || res.data.superAdmin) {
                  history.push('/admin/dashboard');
                } else {
                  history.push('/profile/home?edit=true');
                }
              });
            }
          } else {
            ToastError(res.msg);
          }
          setLoading(false);
        })
        .catch((err) => {
          let msg = err.message || 'Something wrong';
          ToastError(msg);
          setLoading(false);
        });
    }
  }

  console.log('loading', loading);

  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Masuk | E-BNI</title>
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
                    <h4 className="text-gray-600 text-sm font-bold">Masuk</h4>
                  </div>

                  <hr className="mt-6 border-b-1 border-gray-400" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form onSubmit={(e) => onLogin(e)}>
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                        NPP
                      </label>
                      <input
                        disabled={loading}
                        onChange={(e) => setUser({ ...user, npp: e.target.value })}
                        type="text"
                        className="px-3 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm border focus:outline-none  w-full"
                        placeholder="NPP"
                        style={{
                          transition: 'all 0.15s ease 0s',
                        }}
                      />
                      <div
                        className="absolute tracking-wide text-gray-600 text-lg"
                        style={{
                          right: '1em',
                          top: '2em',
                        }}
                      >
                        {/* @bni.co.id */}
                      </div>
                    </div>
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                        Password
                      </label>
                      <Input.Password
                        disabled={loading}
                        style={{
                          height: 45,
                        }}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="Password"
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                      />
                    </div>
                    {/* <div>
                      <label className="inline-flex items-center cursor-pointer hover:text-gray-800 ">
                        <span
                          className="ml-2 text-sm font-semibold text-gray-700 "
                          onClick={() => history.push('/auth/forgot-password')}
                        >
                          Lupa Password?
                        </span>
                      </label>
                    </div> */}
                    {loading ? (
                      LoadingPreview()
                    ) : (
                      <div className="text-center mt-6">
                        <button
                          className="bg-green-500 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{
                            transition: 'all 0.15s ease 0s',
                          }}
                        >
                          Masuk
                        </button>
                      </div>
                    )}
                    {/* <div
                      className="mt-5 text-center outline-none focus:outline-none hover:text-gray-800 cursor-pointer "
                      onClick={() => history.push('/auth/register')}
                    >
                      Daftar
                    </div> */}
                    {loading ? null : (
                      <div
                        className="mt-5 text-center text-orange-500 outline-none focus:outline-none hover:text-red-800 cursor-pointer "
                        onClick={() => history.push('/home')}
                      >
                        Beranda
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
export default connect(null, { signIn, getMe })(Login);
