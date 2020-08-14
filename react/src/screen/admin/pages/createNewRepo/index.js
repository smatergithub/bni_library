import React from 'react';
import { DatePicker, Space, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import queryString from 'query-string';
import {
  CreateNewRepositoryAction,
  getDetailRepository,
  EditRepositoryAction,
} from '../../../../redux/action/repositorys';

import { ToastError, ToastSuccess } from '../../../../component';

function CreateNewRepo(props) {
  const { handleSubmit, register, errors } = useForm();
  const parsed = queryString.parse(props.location.search);
  let { id } = parsed;
  let [pdf, setPdf] = React.useState({
    bab1: null,
    bab2: null,
    bab3: null,
    bab4: null,
    bab5: null,
  });
  let [repo, setRepo] = React.useState(null);

  function onSubmit(formData) {
    if (!id) {
      formData['bab1'] = pdf.bab1;
      formData['bab2'] = pdf.bab2;
      formData['bab3'] = pdf.bab3;
      formData['bab4'] = pdf.bab4;
      formData['bab5'] = pdf.bab5;
      props.CreateNewRepositoryAction(formData).then(res => {
        if (res.resp) {
          ToastSuccess(res.msg);
          props.history.push('/admin/repository');
        } else {
          ToastError(res.msg);
        }
      });
    } else {
      formData['bab1'] = pdf.bab1 ? pdf.bab1 : repo.bab1;
      formData['bab2'] = pdf.bab2 ? pdf.bab2 : repo.bab2;
      formData['bab3'] = pdf.bab3 ? pdf.bab3 : repo.bab3;
      formData['bab4'] = pdf.bab4 ? pdf.bab4 : repo.bab4;
      formData['bab5'] = pdf.bab5 ? pdf.bab5 : repo.bab5;
      props.EditRepositoryAction(id, formData).then(res => {
        if (res.resp) {
          ToastSuccess(res.msg);
          props.history.push('/admin/repository');
        } else {
          ToastError(res.msg);
        }
      });
    }
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

  React.useEffect(() => {
    if (id) {
      props.getDetailRepository(id).then(res => {
        if (res.resp) {
          setRepo(res.data);
        } else {
          setRepo(null);
        }
      });
    }
  }, []);

  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6 mb-20">
        <h1 className="w-full text-3xl text-black pb-6">Repository</h1>

        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/1 mt-6 pl-0 lg:pl-2">
            <div className="leading-loose">
              <form className="p-10 bg-white rounded shadow-xl" onSubmit={handleSubmit(onSubmit)}>
                <p className="text-lg text-gray-800 font-medium pb-4">Informasi Repository</p>

                <div className="">
                  <label className="block text-sm text-gray-600" htmlFor="cus_name">
                    Judul Repository
                  </label>
                  <input
                    className="w-full px-5 py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline  "
                    type="text"
                    name="titleRepository"
                    aria-label="Name"
                    defaultValue={repo ? repo.titleRepository : ''}
                    ref={register({
                      required: 'Field tidak boleh kosong',
                    })}
                  />
                  <div className="text-red-700">
                    {errors.titleRepository && errors.titleRepository.message}
                  </div>
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Universitas
                  </label>
                  <input
                    name="university"
                    defaultValue={repo ? repo.university : ''}
                    className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                    type="text"
                    ref={register({
                      required: 'Field tidak boleh kosong',
                    })}
                    aria-label="Email"
                  />
                  <div className="text-red-700">
                    {errors.university && errors.university.message}
                  </div>
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

                <div className="mt-6">
                  <button
                    className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
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

export default connect(null, {
  CreateNewRepositoryAction,
  getDetailRepository,
  EditRepositoryAction,
})(CreateNewRepo);
