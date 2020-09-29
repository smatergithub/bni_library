import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { DatePicker, Space, Checkbox } from 'antd';
import { ToastError, ToastSuccess } from '../../../../component';
import { CreateNewRepositoryUserAction } from '../../../../redux/action/repositorys';
const optionsResearch = [
  { label: 'Pusat', value: 'Pusat' },
  { label: 'Wilayah', value: 'Wilayah' },
];
function CreateNewRepo(props) {
  const { handleSubmit, register, errors } = useForm();
  let [typeResearch, setTypeResearch] = React.useState(null);
  let [releaseYear, setReleaseYear] = React.useState(null);
  let [pdf, setPdf] = React.useState({
    bab1: null,
    bab2: null,
    bab3: null,
    bab4: null,
    bab5: null,
  });
  function onSubmit(formData) {
    formData['bab1'] = pdf.bab1;
    formData['bab2'] = pdf.bab2;
    formData['bab3'] = pdf.bab3;
    formData['bab4'] = pdf.bab4;
    formData['bab5'] = pdf.bab5;
    formData['category'] = typeResearch;
    formData['releaseYear'] = releaseYear;
    props.CreateNewRepositoryUserAction(formData).then(res => {
      if (res.resp) {
        ToastSuccess(res.msg);
        props.history.push('/riset-sukses');
      } else {
        ToastError(res.msg);
      }
    });
  }
  let uploadImage = (e, type) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      switch (type) {
        case 'bab2':
          setPdf({ ...pdf, bab2: file });
          return;
        case 'bab3':
          setPdf({ ...pdf, bab3: file });
          return;
        case 'bab4':
          setPdf({ ...pdf, bab4: file });
          return;
        case 'bab5':
          setPdf({ ...pdf, bab5: file });
          return;
        case 'bab1':
          setPdf({ ...pdf, bab1: file });
          return;
      }
    };

    reader.readAsDataURL(file);
  };
  function onChangeTypeResearch(value) {
    setTypeResearch(value[0]);
  }
  function onChange(date, dateString) {
    setReleaseYear(dateString);
  }
  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6 ">
        <div className="flex flex-wrap justify-center pt-24">
          <div className="w-full lg:w-1/2 mt-6 pl-0 lg:pl-2">
            <h1 className="w-full text-3xl text-black pb-6">Buat Repository Riset BNI</h1>
            <div className="leading-loose">
              <form className="p-10 bg-white rounded shadow-xl" onSubmit={handleSubmit(onSubmit)}>
                <div className="pt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_name">
                    Nama Lengkap
                  </label>
                  <input
                    name="name"
                    className="w-full px-5 py-1 text-gray-700 bg-gray-100 rounded outline-none border "
                    type="text"
                    required=""
                    aria-label="Name"
                    ref={register({
                      required: 'Field tidak boleh kosong',
                    })}
                  />
                </div>
                <div className="pt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_name">
                    Penyunting
                  </label>
                  <input
                    name="editor"
                    className="w-full px-5 py-1 text-gray-700 bg-gray-100 rounded outline-none border "
                    type="text"
                    required=""
                    aria-label="Name"
                    ref={register({
                      required: 'Field tidak boleh kosong',
                    })}
                  />
                </div>
                <div className="pt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_name">
                    Penerjemah
                  </label>
                  <input
                    name="translateBy"
                    className="w-full px-5 py-1 text-gray-700 bg-gray-100 rounded outline-none border "
                    type="text"
                    required=""
                    aria-label="Name"
                    ref={register({
                      required: 'Field tidak boleh kosong',
                    })}
                  />
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Judul Penelitian
                  </label>
                  <input
                    name="title"
                    className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none border"
                    type="text"
                    required=""
                    aria-label="Email"
                    ref={register({
                      required: 'Field tidak boleh kosong',
                    })}
                  />
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Kategori Riset
                  </label>
                  <Checkbox.Group
                    style={{
                      width: '100% ',
                    }}
                    options={optionsResearch}
                    value={typeResearch}
                    onChange={onChangeTypeResearch}
                  />
                  <div className="text-red-700"></div>
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Universitas
                  </label>
                  <input
                    name="university"
                    className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none border"
                    type="text"
                    required=""
                    aria-label="Email"
                    ref={register({
                      required: 'Field tidak boleh kosong',
                    })}
                  />
                </div>

                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Kota
                  </label>
                  <input
                    name="city"
                    className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none border"
                    type="text"
                    required=""
                    aria-label="Email"
                    ref={register({
                      required: 'Field tidak boleh kosong',
                    })}
                  />
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Jenis Riset
                  </label>
                  <input
                    name="type"
                    className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none border"
                    type="text"
                    required=""
                    aria-label="Email"
                    ref={register({
                      required: 'Field tidak boleh kosong',
                    })}
                  />
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Tahun
                  </label>
                  <Space direction="vertical">
                    <DatePicker onChange={onChange} format="DD/MM/YYYY" />
                  </Space>
                </div>

                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Bab1
                  </label>

                  <input
                    onChange={e => uploadImage(e, 'bab1')}
                    type="file"
                    className="px-2  text-white font-light tracking-wider bg-gray-700 rounded"
                    accept="application/pdf"
                    aria-label="Email"
                  />
                  <div className="text-red-700">{errors.dateEbook && errors.dateEbook.message}</div>
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Bab2
                  </label>

                  <input
                    onChange={e => uploadImage(e, 'bab2')}
                    type="file"
                    className="px-2  text-white font-light tracking-wider bg-gray-700 rounded"
                    accept="application/pdf"
                    aria-label="Email"
                  />
                  <div className="text-red-700">{errors.dateEbook && errors.dateEbook.message}</div>
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Bab3
                  </label>

                  <input
                    onChange={e => uploadImage(e, 'bab3')}
                    type="file"
                    className="px-2  text-white font-light tracking-wider bg-gray-700 rounded"
                    accept="application/pdf"
                    aria-label="Email"
                  />
                  <div className="text-red-700">{errors.dateEbook && errors.dateEbook.message}</div>
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Bab4
                  </label>

                  <input
                    onChange={e => uploadImage(e, 'bab4')}
                    type="file"
                    className="px-2  text-white font-light tracking-wider bg-gray-700 rounded"
                    accept="application/pdf"
                    aria-label="Email"
                  />
                  <div className="text-red-700">{errors.dateEbook && errors.dateEbook.message}</div>
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Bab5
                  </label>

                  <input
                    onChange={e => uploadImage(e, 'bab5')}
                    type="file"
                    className="px-2  text-white font-light tracking-wider bg-gray-700 rounded"
                    accept="application/pdf"
                    aria-label="Email"
                  />
                  <div className="text-red-700">{errors.dateEbook && errors.dateEbook.message}</div>
                </div>
                <div className="mt-2">
                  <label className=" block text-sm text-gray-600" htmlFor="message">
                    Deskripsi
                  </label>
                  <textarea
                    name="description"
                    className="w-full px-5 py-2 text-gray-700 bg-gray-100 rounded outline-none border"
                    rows="6"
                    ref={register({
                      required: 'Field tidak boleh kosong',
                    })}
                    placeholder="Masukkan informasi buku"
                    aria-label="Email"
                  />
                  <div className="text-red-700">
                    {errors.description && errors.description.message}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    className="px-4 py-1 text-white font-light tracking-wider bg-orange-500 rounded"
                    type="submit"
                  >
                    SUBMIT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default connect(null, { CreateNewRepositoryUserAction })(withRouter(CreateNewRepo));
