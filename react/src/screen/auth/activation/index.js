import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { ToastError, ToastSuccess } from '../../../component';
import { verificationUser } from '../../../redux/action/user';

function Activation(props) {
  let { history } = props;
  const parsed = queryString.parse(props.location.search);
  let { email, token } = parsed;

  function onFormSubmit(e) {
    e.preventDefault();
    props.verificationUser(`email=${email}&token=${token}`).then(res => {
      if (res.resp) {
        ToastSuccess(res.msg);
        history.push('/auth/login');
      } else {
        ToastError(res.msg);
      }
    });
    // console.log(formData);
  }

  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Aktivasi | Ebni</title>
      </Helmet>
      <section className="absolute w-full h-full">
        <div
          className="absolute top-0 w-full h-full bg-gray-900"
          // style="background-image: url(./assets/img/register_bg_2.png); background-size: 100%; background-repeat: no-repeat;"
        ></div>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-5/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h4 className="text-gray-600 text-sm font-bold">User Activation</h4>
                  </div>
                  <hr className="mt-6 border-b-1 border-gray-400" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form onSubmit={e => onFormSubmit(e)}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        disabled
                        value={email}
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                        placeholder="Email"
                        style={{
                          transition: 'all 0.15s ease 0s',
                        }}
                      />
                    </div>
                    <div className="text-center mt-10">
                      <button
                        className="bg-green-500 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="submit"
                        style={{
                          transition: 'all 0.15s ease 0s',
                        }}
                      >
                        Verifikasi
                      </button>
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
export default connect(null, { verificationUser })(Activation);
