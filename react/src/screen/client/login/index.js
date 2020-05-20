import React, { useState } from 'react';
import UserApi from '../../../redux/action/user';
import { ToastError, ToastSuccess } from '../../../component';

function Login() {
  let [user, setUser] = useState({ username: '', password: '' });

  async function onLogin() {
    if (user.username.trim().length === 0 && user.password.trim().length === 0) {
      return ToastError('Email atau password tidak boleh kosong');
    } else {
      UserApi.login(user)
        .then(res => {
          if (res) {
            ToastSuccess('Login berhasil');
          }
        })
        .catch(err => {
          let msg = err.message || 'Something wrong';
          ToastError(msg);
        });
    }
  }
  return (
    <main>
      <section className="absolute w-full h-full">
        <div
          className="absolute top-0 w-full h-full bg-gray-900"
          // style="background-image: url(./assets/img/register_bg_2.png); background-size: 100%; background-repeat: no-repeat;"
        ></div>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h4 className="text-gray-600 text-sm font-bold">Login</h4>
                  </div>

                  <hr className="mt-6 border-b-1 border-gray-400" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                      >
                        Email
                      </label>
                      <input
                        onChange={e => setUser({ ...user, username: e.target.value })}
                        type="email"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                        placeholder="Email"
                        style={{
                          transition: 'all 0.15s ease 0s',
                        }}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        onChange={e => setUser({ ...user, password: e.target.value })}
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                        placeholder="Password"
                        style={{
                          transition: 'all 0.15s ease 0s',
                        }}
                      />
                    </div>
                    <div>
                      <label className="inline-flex items-center cursor-pointer hover:text-gray-800 ">
                        <span className="ml-2 text-sm font-semibold text-gray-700 ">
                          Lupa Password?
                        </span>
                      </label>
                    </div>
                    <div className="text-center mt-6">
                      <button
                        onClick={() => onLogin()}
                        className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="button"
                        style={{
                          transition: 'all 0.15s ease 0s',
                        }}
                      >
                        Sign In
                      </button>
                    </div>

                    <div className="mt-5 text-center outline-none focus:outline-none hover:text-gray-800 cursor-pointer ">
                      Daftar
                    </div>
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
export default Login;