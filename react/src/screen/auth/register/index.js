import React, { useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { DatePicker, Input } from 'antd';
import { Helmet } from 'react-helmet';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { ToastError, ToastSuccess } from '../../../component';
import { signUp } from '../../../redux/action/user';

const dateFormat = 'DD/MM/YYYY';
function Register(props) {
  let { history } = props;
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    confirmPassword: '',
    tanggalLahir: '',
  });
  let [dateBorn, setDateBorn] = React.useState(null);
  let [isRegisterSuccess, setIsRequestSuccess] = React.useState(false);
  let [token, setToken] = React.useState('');
  let [email, setEmail] = React.useState('');

  function onFormSubmit(e) {
    e.preventDefault();
    formData.tanggalLahir = dateBorn;
    let checkemail = formData.email.split('@');

    if (formData.email.trim().length === 0 && formData.password.trim().length === 0) {
      ToastError('Email atau password tidak boleh kosong');
    } else if (formData.password !== formData.confirmPassword) {
      ToastError('Konfirmasi Password tidak sesuai !');
    } else if (checkemail.length === 2 && checkemail[1] !== 'bni.co.id') {
      ToastError('Anda belum menginput alamat email BNI Anda');
    } else {
      formData.email =
        checkemail.length === 2 && checkemail[1] === 'bni.co.id'
          ? formData.email
          : formData.email + '@bni.co.id';

      props.signUp(formData).then(res => {
        if (res.resp) {
          ToastSuccess(res.msg);

          setIsRequestSuccess(true);
          setToken(res.token);
          setEmail(res.email);
          // history.push('/auth/login');
        } else {
          ToastError(res.msg);
        }
      });
    }
    // console.log(formData);
  }
  function handleDate(e, date) {
    console.log(date);
    setDateBorn(date);
  }

  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Registrasi | E-BNI</title>
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
                    <h4 className="text-gray-600 text-sm font-bold">Register</h4>
                  </div>
                  <hr className="mt-6 border-b-1 border-gray-400" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  {isRegisterSuccess && (
                    <div>
                      Klik link ini untuk aktivasi akun{' '}
                      <span
                        style={{
                          color: 'red',
                          cursor: 'pointer',
                        }}
                        onClick={() =>
                          props.history.push(`/auth/activation?email=${email}&token=${token}`)
                        }
                      >
                        click here!
                      </span>
                    </div>
                  )}

                  {!isRegisterSuccess && (
                    <form onSubmit={e => onFormSubmit(e)}>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          for="grid-password"
                        >
                          Nama
                        </label>
                        <input
                          type="text"
                          onChange={e => setFormData({ ...formData, nama: e.target.value })}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm  focus:outline-none border w-full"
                          placeholder="Nama"
                          style={{
                            transition: 'all 0.15s ease 0s',
                          }}
                        />
                      </div>
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                          Email
                        </label>
                        <input
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          type="text"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm border focus:outline-none  w-full"
                          placeholder="Email"
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
                          @bni.co.id
                        </div>
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          for="grid-password"
                        >
                          Tanggal Lahir
                        </label>
                        <DatePicker
                          style={{
                            height: 45,
                          }}
                          defaultValue={moment('15/01/2010', dateFormat)}
                          format={dateFormat}
                          onChange={handleDate}
                        />
                        {/* <DatePicker
                          selected={dateBorn}
                          onChange={setDateBorn}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm  focus:outline-none border w-full"
                        /> */}
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          for="grid-password"
                        >
                          Password
                        </label>
                        <Input.Password
                          style={{
                            height: 45,
                          }}
                          onChange={e => setFormData({ ...formData, password: e.target.value })}
                          placeholder="input password"
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
                          onChange={e =>
                            setFormData({ ...formData, confirmPassword: e.target.value })
                          }
                          placeholder="input password"
                          iconRender={visible =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                          }
                        />
                      </div>

                      <div className="text-center mt-10">
                        <button
                          className="bg-green-500 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded  hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{
                            transition: 'all 0.15s ease 0s',
                          }}
                        >
                          Daftar
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
export default connect(null, { signUp })(Register);
