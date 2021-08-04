import React from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import queryString from 'query-string';
import { DatePicker, Space, Checkbox, Select } from 'antd';
import {
  CreateNewRepositoryAction,
  EditRepositoryAction,
} from '../../../../redux/action/repositorys';
import RepoAPI from '../../../../api/RepositoryApi';
import swal from 'sweetalert';

const { Option } = Select;
const optionsResearch = [
  { label: 'Pusat', value: 'Pusat' },
  { label: 'Wilayah', value: 'Wilayah' },
];
const methodology = [
  {
    label: 'Kualitatif',
    value: 'Kualitatif',
  },
  {
    label: 'Kuantitatif',
    value: 'Kuantitatif',
  },
];
const strataOpt = [
  {
    label: 'S1',
    value: 'S1',
  },
  {
    label: 'S2',
    value: 'S2',
  },
  {
    label: 'S3',
    value: 'S3',
  },
];
function CreateNewRepo(props) {
  const parsed = queryString.parse(props.location.search);
  let { id } = parsed;
  const { handleSubmit, register, errors } = useForm();
  let [typeResearch, setTypeResearch] = React.useState(null);
  let [releaseYear, setReleaseYear] = React.useState(null);
  let [methodologyResearch, setMethodoloyResearch] = React.useState(null);
  let [strata, setStrata] = React.useState(null);
  let [pdf, setPdf] = React.useState({
    document: null,
    abstrack: null,
  });
  let [repo, setRepo] = React.useState(null);

  function onSubmit(formData) {
    if (!id) {
      formData['document'] = pdf.document;
      formData['abstrack'] = pdf.abstrack;
      formData['category'] = typeResearch;
      formData['methodology'] = methodologyResearch;
      formData['strata'] = strata;
      formData['releaseYear'] = releaseYear;
      formData['isApproved'] = true;
      props.CreateNewRepositoryAction(formData).then((res) => {
        if (res.resp) {
          swal('Message!', res.msg, 'success');
          props.history.push('/admin/repository');
        } else {
          swal('Error!', res.msg, 'error');
        }
      });
    } else {
      formData['document'] = pdf.document ? pdf.document : repo.document;
      formData['abstrack'] = pdf.abstrack ? pdf.abstrack : repo.abstrack;
      formData['category'] = typeResearch ? typeResearch : repo.category;
      formData['methodology'] = methodologyResearch ? methodologyResearch : repo.methodology;
      formData['strata'] = strata ? strata : repo.strata;
      formData['releaseYear'] = releaseYear ? releaseYear : repo.releaseYear;
      formData['isApproved'] = true;

      props.EditRepositoryAction(id, formData).then((res) => {
        if (res.resp) {
          swal('Message!', res.msg, 'success');
          props.history.push('/admin/repository');
        } else {
          swal('Error!', res.msg, 'error');
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
        case 'document':
          setPdf({ ...pdf, document: file });
          return;
        case 'abstrack':
          setPdf({ ...pdf, abstrack: file });
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

  React.useEffect(() => {
    if (id) {
      RepoAPI.detail(id).then((res) => {
        if (res.data) {
          setRepo(res.data);
        } else {
          setRepo(null);
        }
      });
    }
  }, []);

  console.log('aa', repo);

  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6 mb-20">
        <h1 className="w-full text-3xl text-black pb-6">Repository</h1>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/1 mt-6 pl-0 lg:pl-2">
            <div className="leading-loose">
              <form className="p-10 bg-white rounded shadow-xl" onSubmit={handleSubmit(onSubmit)}>
                <div className="pt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_name">
                    Nama Lengkap
                  </label>
                  <input
                    className="w-full px-2 py-1 text-gray-700 bg-gray-100 rounded outline-none border "
                    type="text"
                    name="name"
                    aria-label="Name"
                    defaultValue={repo ? repo.name : ''}
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
                    defaultValue={repo ? repo.title : ''}
                    className="w-full px-2  py-1 text-gray-700 bg-gray-100 rounded outline-none border"
                    type="text"
                    required=""
                    aria-label="Email"
                    ref={register({
                      required: 'Field tidak boleh kosong',
                    })}
                  />
                </div>
                <div className="mt-2">
                  {repo ? (
                    <label className="block text-sm text-gray-600" htmlFor="cus_email">
                      Kategori Riset Sebelumnya : {repo && repo.category}
                    </label>
                  ) : (
                    <label className="block text-sm text-gray-600" htmlFor="cus_email">
                      Kategori Riset
                    </label>
                  )}
                  <Checkbox.Group
                    defaultValue={[typeResearch]}
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
                    defaultValue={repo ? repo.university : ''}
                    className="w-full px-2  py-1 text-gray-700 bg-gray-100 rounded outline-none border"
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
                    Fakultas
                  </label>
                  <input
                    name="faculty"
                    defaultValue={repo ? repo.faculty : ''}
                    className="w-full px-2  py-1 text-gray-700 bg-gray-100 rounded outline-none border"
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
                    defaultValue={repo ? repo.city : ''}
                    className="w-full px-2  py-1 text-gray-700 bg-gray-100 rounded outline-none border"
                    type="text"
                    required=""
                    aria-label="Email"
                    ref={register({
                      required: 'Field tidak boleh kosong',
                    })}
                  />
                </div>

                <div className="mt-2">
                  <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                    Metodologi Riset
                  </label>
                  <Select
                    placeholder={repo ? repo.methodology : ''}
                    style={{ width: '100%' }}
                    ref={register('methodology')}
                    className="wilayah"
                    name="methodology"
                    onSelect={(e) => setMethodoloyResearch(e)}
                  >
                    {methodology.map((op) => {
                      return <Option value={op.label}>{op.label}</Option>;
                    })}
                  </Select>
                </div>
                <div className="mt-2">
                  <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                    Strata
                  </label>
                  <Select
                    placeholder={repo ? repo.strata : ''}
                    style={{ width: '100%' }}
                    className="wilayah"
                    ref={register('strata')}
                    name="strata"
                    onSelect={(e) => setStrata(e)}
                  >
                    {strataOpt.map((op) => {
                      return <Option value={op.label}>{op.label}</Option>;
                    })}
                  </Select>
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Tahun
                  </label>
                  <Space direction="vertical">
                    <DatePicker
                      onChange={onChange}
                      placeholder={repo ? repo.releaseYear : ''}
                      picker="year"
                    />
                  </Space>
                </div>

                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Surat Penelitian
                  </label>

                  <input
                    onChange={(e) => uploadImage(e, 'abstrack')}
                    type="file"
                    className="px-2  text-white font-light tracking-wider bg-gray-700 rounded"
                    accept="application/pdf"
                    aria-label="Email"
                  />
                  <div className="text-red-700">{errors.dateEbook && errors.dateEbook.message}</div>
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Skripsi / Tugas Akhir / Tesis
                  </label>

                  <input
                    onChange={(e) => uploadImage(e, 'document')}
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
                    defaultValue={repo ? repo.description : ''}
                    className="w-full px-2 py-2 text-gray-700 bg-gray-100 rounded outline-none border"
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
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div>
                      {' '}
                      <button
                        className="px-4 py-1 text-black font-light tracking-wider bg-gray-400 rounded"
                        type="submit"
                        onClick={() => {
                          props.history.push('/admin/repository');
                        }}
                      >
                        BACK
                      </button>
                    </div>
                    <div style={{ paddingLeft: '24px' }}>
                      <button
                        className="px-4 py-1 text-white font-light tracking-wider bg-orange-500 rounded"
                        type="submit"
                      >
                        SUBMIT
                      </button>
                    </div>
                  </div>
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
  EditRepositoryAction,
})(CreateNewRepo);
