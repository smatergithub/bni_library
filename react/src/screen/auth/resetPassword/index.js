import React from 'react';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import { DatePicker, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import { connect } from 'react-redux';
import { resetPassword } from 'redux/action/user';
import { ToastError } from 'component';

function ResetPassword(props) {
  const parsed = queryString.parse(props.location.search);
  let { email, token } = parsed;

  const [password, setPassword] = React.useState('');
  const [cpassword, setCpassword] = React.useState('');
  const [sendSuccess, setSendSuccess] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (password.trim().length == 0 || cpassword.trim().length == 0) {
      ToastError('Password tidak boleh kosong !');
    } else if (password !== cpassword) {
      ToastError('Password tidak sama !');
    } else {
      let form = {
        password,
        confirmPassword: cpassword,
      };
      props.resetPassword(form, `?resetToken=${token}&email=${email}`).then(res => {
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
        <title>Ganti Password | E-BNI</title>
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
                    <h4 className="text-gray-600 text-sm font-bold">Reset Password</h4>
                  </div>

                  <hr className="mt-6 border-b-1 border-gray-400" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  {sendSuccess && (
                    <div>
                      <div className="py-5 text-lg text-center">
                        {' '}
                        Password berhasil di ganti. Silahkan login dengan password baru.
                      </div>
                      <button
                        onClick={() => window.location.replace('/auth/login')}
                        className="bg-green-500 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded  hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="submit"
                        style={{
                          transition: 'all 0.15s ease 0s',
                        }}
                      >
                        Login
                      </button>
                    </div>
                  )}
                  {!sendSuccess && (
                    <form onSubmit={e => handleSubmit(e)}>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          for="grid-password"
                        >
                          Password baru
                        </label>
                        <Input.Password
                          style={{
                            height: 45,
                          }}
                          onChange={e => setPassword(e.target.value)}
                          placeholder="New Password"
                          iconRender={visible =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                          }
                        />
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          for="grid-password"
                        >
                          Konfirmasi Password
                        </label>
                        <Input.Password
                          style={{
                            height: 45,
                          }}
                          onChange={e => setCpassword(e.target.value)}
                          placeholder="Confirm password"
                          iconRender={visible =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                          }
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
export default connect(null, { resetPassword })(ResetPassword);
