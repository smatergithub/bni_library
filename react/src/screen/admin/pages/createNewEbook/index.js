import React from 'react';
import { DatePicker, Space, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import queryString from 'query-string';
import {
  CreateNewEbookAction,
  getDetailEbook,
  EditEbookAction,
  UploadSingleEbookFIle,
} from '../../../../redux/action/ebooks';
import { UploadEbookFIle } from '../../../../redux/action/ebooks';
import { ToastError, ToastSuccess } from '../../../../component';

function CreateNewEBook(props) {
  const { handleSubmit, register, errors } = useForm();
  const parsed = queryString.parse(props.location.search);
  let { id } = parsed;
  let [image, setImage] = React.useState(null);
  let [conditionValue, setConditionValue] = React.useState(null);
  let [statusValue, setStatusValue] = React.useState(null);
  let [publishDate, setPublishDate] = React.useState(null);
  let [ebook, setEbook] = React.useState(null);
  let [ebookFile, setEbookFile] = React.useState(null);
  let exportFile = React.useRef(null);

  function onSubmit(formData) {
    if (!id) {
      formData['image'] = image;
      formData['condition'] = conditionValue == 'Baik' ? 'Baik' : 'Weeding';
      formData['tahunTerbit'] = publishDate;
      formData['tanggalTerbit'] = publishDate;
      formData['status'] = statusValue == 'Ada' ? 'Ada' : 'Kosong';
      if (ebookFile) {
        uploadPdfAndGetLink(formData, 'add');
      } else {
        props.CreateNewEbookAction(formData).then(res => {
          if (res.resp) {
            ToastSuccess(res.msg);
            props.history.push('/admin/ebooks');
          } else {
            ToastError(res.msg);
          }
        });
      }
    } else {
      formData['image'] = image ? image : ebook.image;
      formData['condition'] =
        conditionValue !== null ? (conditionValue == 'Baik' ? 'Baik' : 'Weeding') : ebook.condition;
      formData['tahunTerbit'] = publishDate ? publishDate : ebook.tahunTerbit;
      formData['tanggalTerbit'] = publishDate ? publishDate : ebook.tahunTerbit;
      formData['status'] =
        statusValue !== null ? (statusValue === 'true' ? 'Ada' : 'Kosong') : ebook.status;
      if (ebookFile) {
        uploadPdfAndGetLink(formData, 'edit', id);
      } else {
        props.EditEbookAction(id, formData).then(res => {
          if (res.resp) {
            ToastSuccess(res.msg);
            props.history.push('/admin/ebooks');
          } else {
            ToastError(res.msg);
          }
        });
      }
    }
  }
  let uploadImage = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setImage(file);
    };

    reader.readAsDataURL(file);
  };

  let uploadDocument = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      props.UploadEbookFIle({ file }).then(res => {
        if (res.resp) {
          ToastSuccess(res.msg);
          props.history.push('/admin/ebooks');
        } else {
          ToastError(res.msg);
        }
      });
      // setSourceLink(file);
    };

    reader.readAsDataURL(file);
  };

  let uploadEbookPdf = e => {
    let reader = new FileReader();
    let locationFile = e.target.files[0];
    setEbookFile(locationFile);

    reader.readAsDataURL(locationFile);
  };

  function uploadPdfAndGetLink(formData, type, id) {
    if (ebookFile) {
      return props.UploadSingleEbookFIle({ locationFile: ebookFile }).then(res => {
        if (res) {
          console.log(res);
          if (type === 'add') {
            formData['sourceLink'] = res.data.data.locationFile;
            props.CreateNewEbookAction(formData).then(res => {
              if (res.resp) {
                ToastSuccess(res.msg);
                props.history.push('/admin/ebooks');
              } else {
                ToastError(res.msg);
              }
            });
          } else {
            formData['sourceLink'] = res.data.data.locationFile;
            props.EditEbookAction(id, formData).then(res => {
              if (res.resp) {
                ToastSuccess(res.msg);
                props.history.push('/admin/ebooks');
              } else {
                ToastError(res.msg);
              }
            });
          }
        } else {
          ToastError(res.msg);
        }
      });
    }
  }

  React.useEffect(() => {
    if (id) {
      props.getDetailEbook(id).then(res => {
        if (res.resp) {
          setEbook(res.data);
        } else {
          setEbook(null);
        }
      });
    }
  }, []);
  function onChange(date, dateString) {
    setPublishDate(dateString);
  }
  function onChangeCondition(value) {
    setConditionValue(value[0] ? 'Baik' : 'Weeding');
  }
  function onChangeStatus(value) {
    setStatusValue(value[0] ? 'Ada' : 'Kosong');
  }
  const optionsStatus = [
    { label: 'Ada', value: 'Ada' },
    { label: 'Kosong', value: 'Kosong' },
  ];
  const optionsCondition = [
    { label: 'Baik', value: 'Baik' },
    { label: 'Weeding', value: 'Weeding' },
  ];
  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6 mb-20">
        <h1 className="w-full text-3xl text-black pb-6">Biografi Ebook</h1>

        <div className="flex flex-wrap relative">
          {!id && (
            <div className="w-2/12 absolute" style={{ right: '3em', top: '-5em' }}>
              <button
                type="button"
                onClick={() => exportFile.current.click()}
                className="w-full bg-gray-800 text-white font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-700 flex items-center justify-center"
              >
                <i className="fas fa-upload mr-3" /> Import Ebook
              </button>
            </div>
          )}
          <div className="w-full lg:w-1/1 mt-6 pl-0 lg:pl-2">
            <div className="leading-loose">
              <form className="p-10 bg-white rounded shadow-xl" onSubmit={handleSubmit(onSubmit)}>
                <p className="text-lg text-gray-800 font-medium pb-4">Informasi Ebook</p>
                <input
                  onChange={e => uploadDocument(e)}
                  type="file"
                  style={{
                    display: 'none',
                  }}
                  ref={exportFile}
                  className=""
                  accept=" application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  aria-label="Email"
                />
                <div className="">
                  <label className="block text-sm text-gray-600" htmlFor="cus_name">
                    Judul
                  </label>
                  <input
                    className="w-full px-5 py-1 text-gray-700 bg-gray-100 rounded outline-none border "
                    type="text"
                    name="judul"
                    aria-label="Name"
                    defaultValue={ebook ? ebook.judul : ''}
                    ref={register({
                      required: 'Field tidak boleh kosong',
                    })}
                  />
                  <div className="text-red-700">{errors.judul && errors.judul.message}</div>
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Pengarang
                  </label>
                  <input
                    name="pengarang"
                    defaultValue={ebook ? ebook.pengarang : ''}
                    className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none border"
                    type="text"
                    ref={register({
                      required: 'Field tidak boleh kosong',
                    })}
                    aria-label="Email"
                  />
                  <div className="text-red-700">{errors.pengarang && errors.pengarang.message}</div>
                </div>

                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Kategori Ebook
                  </label>
                  <input
                    name="kategori"
                    defaultValue={ebook ? ebook.kategori : ''}
                    className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none border"
                    type="text"
                    ref={register({
                      required: 'Field tidak boleh kosong',
                    })}
                    aria-label="Email"
                  />
                  <div className="text-red-700">{errors.kategori && errors.kategori.message}</div>
                </div>

                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Bahasa
                  </label>
                  <input
                    name="bahasa"
                    defaultValue={ebook ? ebook.bahasa : ''}
                    className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none border"
                    type="text"
                    required=""
                    ref={register({
                      required: 'Field tidak boleh kosong',
                    })}
                    aria-label="Email"
                  />
                  <div className="text-red-700">{errors.bahasa && errors.bahasa.message}</div>
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    ISBN
                  </label>
                  <input
                    name="isbn"
                    defaultValue={ebook ? ebook.isbn : ''}
                    className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none border"
                    type="text"
                    required=""
                    ref={register({
                      required: 'Field tidak boleh kosong',
                    })}
                    aria-label="Email"
                  />
                  <div className="text-red-700">{errors.isbn && errors.isbn.message}</div>
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Penerbit
                  </label>
                  <input
                    name="penerbit"
                    defaultValue={ebook ? ebook.penerbit : ''}
                    className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none border"
                    type="text"
                    required=""
                    ref={register({
                      required: 'Field tidak boleh kosong',
                    })}
                    aria-label="Email"
                  />
                  <div className="text-red-700">{errors.penerbit && errors.penerbit.message}</div>
                </div>

                <div className="mt-2 flex ">
                  <div className="w-1/2">
                    <label className="block text-sm text-gray-600" htmlFor="cus_email">
                      Link File
                    </label>
                    <input
                      name="sourceLink"
                      defaultValue={ebook ? ebook.sourceLink : ''}
                      className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none border"
                      type="text"
                      required=""
                      ref={register({
                        required: 'Field tidak boleh kosong',
                      })}
                      aria-label="Email"
                    />
                    <div className="text-red-700">
                      {errors.sourceLink && errors.sourceLink.message}
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="ml-5">
                      <label className="block text-sm text-gray-600" htmlFor="cus_email">
                        Atau unggah file
                      </label>
                      <input
                        onChange={e => uploadEbookPdf(e)}
                        type="file"
                        className="px-2  text-white font-light tracking-wider bg-gray-700 rounded"
                        //accept="image/png, image/jpeg"
                        aria-label="Email"
                      />
                      <div className="text-red-700">
                        {errors.dateEbook && errors.dateEbook.message}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Lokasi Perpustakaan
                  </label>
                  <input
                    name="lokasiPerpustakaan"
                    defaultValue={ebook ? ebook.lokasiPerpustakaan : ''}
                    className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none border"
                    type="text"
                    required=""
                    ref={register({
                      required: 'Field tidak boleh kosong',
                    })}
                    aria-label="Email"
                  />
                  <div className="text-red-700">
                    {errors.lokasiPerpustakaan && errors.lokasiPerpustakaan.message}
                  </div>
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Status
                  </label>
                  <Checkbox.Group
                    options={optionsStatus}
                    value={statusValue}
                    onChange={onChangeStatus}
                  />
                  <div className="text-red-700"></div>
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Kondisi
                  </label>
                  <Checkbox.Group
                    options={optionsCondition}
                    value={conditionValue}
                    onChange={optionsCondition}
                  />
                  <div className="text-red-700"></div>
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Tahun Terbit
                  </label>
                  <Space direction="vertical">
                    <DatePicker onChange={onChange} />
                  </Space>
                </div>

                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Foto
                  </label>

                  <input
                    onChange={e => uploadImage(e)}
                    type="file"
                    className="px-2  text-white font-light tracking-wider bg-gray-700 rounded"
                    accept="image/png, image/jpeg"
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
                    defaultValue={ebook ? ebook.description : ''}
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
  CreateNewEbookAction,
  UploadEbookFIle,
  getDetailEbook,
  EditEbookAction,
  UploadSingleEbookFIle,
})(CreateNewEBook);
