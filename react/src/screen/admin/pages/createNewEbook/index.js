import React from 'react';
import { DatePicker, Space, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import queryString from 'query-string';
import {
  CreateNewEbookAction,
  EditEbookAction,
  UploadSingleEbookFIle,
} from '../../../../redux/action/ebooks';
import EbookAPI from '../../../../api/EbookApi';
import Loader from '../../component/Loader';
import swal from 'sweetalert';

function CreateNewEBook(props) {
  const { handleSubmit, register, errors } = useForm();
  const parsed = queryString.parse(props.location.search);
  let { id } = parsed;
  let [image, setImage] = React.useState(null);
  let [statusValue, setStatusValue] = React.useState(null);
  let [publishDate, setPublishDate] = React.useState(null);
  let [ebooks, setEbooks] = React.useState(null);
  let [ebookFile, setEbookFile] = React.useState(null);
  let [isLoading, setIsLoading] = React.useState(false);
  let exportFile = React.useRef(null);

  function onSubmit(formData) {
    if (!id) {
      formData['image'] = image;

      formData['tahunTerbit'] = publishDate;
      formData['tanggalTerbit'] = publishDate;
      formData['status'] = statusValue == 'Ada' ? 'Ada' : 'Kosong';
      if (ebookFile) {
        uploadPdfAndGetLink(formData, 'add');
      } else {
        props.CreateNewEbookAction(formData).then(res => {
          if (res.resp) {
            swal('Message!', res.msg, 'success');
            props.history.push('/admin/ebooks');
          } else {
            swal('Error!', res.msg, 'error');
          }
        });
      }
    } else {
      formData['image'] = image ? image : ebook.image;
      formData['tahunTerbit'] = publishDate ? publishDate : ebook.tahunTerbit;
      formData['tanggalTerbit'] = publishDate ? publishDate : ebook.tahunTerbit;
      formData['status'] =
        statusValue !== null ? (statusValue === 'true' ? 'Ada' : 'Kosong') : ebook.status;
      if (ebookFile) {
        uploadPdfAndGetLink(formData, 'edit', id);
      } else {
        props.EditEbookAction(id, formData).then(res => {
          if (res.resp) {
            swal('Message!', res.msg, 'success');
            props.history.push('/admin/ebooks');
          } else {
            swal('Error!', res.msg, 'error');
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

  function uploadPdfAndGetLink(formData, type, id) {
    if (ebookFile) {
      return props.UploadSingleEbookFIle({ locationFile: ebookFile }).then(res => {
        if (res) {
          if (type === 'add') {
            formData['sourceLink'] = res.data.data.locationFile;
            props.CreateNewEbookAction(formData).then(res => {
              if (res.resp) {
                swal('Message!', res.msg, 'success');
                props.history.push('/admin/ebooks');
              } else {
                swal('Error!', res.msg, 'error');
              }
            });
          } else {
            formData['sourceLink'] = res.data.data.locationFile;
            props.EditEbookAction(id, formData).then(res => {
              if (res.resp) {
                swal('Message!', res.msg, 'success');
                props.history.push('/admin/ebooks');
              } else {
                swal('Error!', res.msg, 'error');
              }
            });
          }
        } else {
          swal('Error!', res.msg, 'error');
        }
      });
    }
  }

  React.useEffect(() => {
    if (id) {
      EbookAPI.detail(id).then(res => {
        if (res.data) {
          setEbooks(res.data);
          setStatusValue(res.data.status);

          setPublishDate(res.data.tahunTerbit);
        } else {
          setEbooks(null);
        }
      });
    }
  }, []);
  function onChange(date, dateString) {
    setPublishDate(dateString);
  }

  function onChangeStatus(value) {
    setStatusValue(value[0]);
  }
  const optionsStatus = [
    { label: 'Ada', value: 'Ada' },
    { label: 'Kosong', value: 'Kosong' },
  ];
  if (id && !ebooks) return null;
  let ebook = id ? ebooks : ebooks;

  let titleFormat = id ? 'Ubah Ebook' : 'Ebook Baru';
  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6 mb-20">
        <h1 className="w-full text-3xl text-black pb-6">{titleFormat}</h1>

        <div className="flex flex-wrap relative">
          {isLoading ? (
            <div className="w-full lg:w-1/1 mt-32 pl-0 lg:pl-2">
              <Loader />
            </div>
          ) : (
            <div className="w-full lg:w-1/1 mt-6 pl-0 lg:pl-2">
              <div className="leading-loose">
                <form className="p-10 bg-white rounded shadow-xl" onSubmit={handleSubmit(onSubmit)}>
                  <p className="text-lg text-gray-800 font-medium pb-4">Informasi Ebook</p>
                  <div className="">
                    <label className="block text-sm text-gray-600" htmlFor="cus_name">
                      Judul
                    </label>
                    <input
                      className="w-full px-2 py-1 text-gray-700 bg-gray-100 rounded outline-none border "
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
                    <label className="block text-sm text-gray-600">Pengarang</label>
                    <input
                      name="pengarang"
                      defaultValue={ebook ? ebook.pengarang : ''}
                      className="w-full px-2  py-1 text-gray-700 bg-gray-100 rounded outline-none border"
                      type="text"
                      ref={register({
                        required: 'Field tidak boleh kosong',
                      })}
                      aria-label="Email"
                    />
                    <div className="text-red-700">
                      {errors.pengarang && errors.pengarang.message}
                    </div>
                  </div>

                  <div className="mt-2">
                    <label className="block text-sm text-gray-600">Kategori Ebook</label>
                    <input
                      name="kategori"
                      defaultValue={ebook ? ebook.kategori : ''}
                      className="w-full px-2  py-1 text-gray-700 bg-gray-100 rounded outline-none border"
                      type="text"
                      ref={register({
                        required: 'Field tidak boleh kosong',
                      })}
                      aria-label="Email"
                    />
                    <div className="text-red-700">{errors.kategori && errors.kategori.message}</div>
                  </div>

                  <div className="mt-2">
                    <label className="block text-sm text-gray-600">Bahasa</label>
                    <input
                      name="bahasa"
                      defaultValue={ebook ? ebook.bahasa : ''}
                      className="w-full px-2  py-1 text-gray-700 bg-gray-100 rounded outline-none border"
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
                    <label className="block text-sm text-gray-600">ISBN</label>
                    <input
                      name="isbn"
                      defaultValue={ebook ? ebook.isbn : ''}
                      className="w-full px-2  py-1 text-gray-700 bg-gray-100 rounded outline-none border"
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
                    <label className="block text-sm text-gray-600">Penerbit</label>
                    <input
                      name="penerbit"
                      defaultValue={ebook ? ebook.penerbit : ''}
                      className="w-full px-2  py-1 text-gray-700 bg-gray-100 rounded outline-none border"
                      type="text"
                      required=""
                      ref={register({
                        required: 'Field tidak boleh kosong',
                      })}
                      aria-label="Email"
                    />
                    <div className="text-red-700">{errors.penerbit && errors.penerbit.message}</div>
                  </div>

                  <div className="mt-2  ">
                    <label className="block text-sm text-gray-600">Link File</label>
                    <input
                      name="sourceLink"
                      defaultValue={ebook ? ebook.sourceLink : ''}
                      className="w-full px-2  py-1 text-gray-700 bg-gray-100 rounded outline-none border"
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
                  <div className="mt-2">
                    <label className="block text-sm text-gray-600">Nomor Lemari</label>
                    <input
                      name="nomorLemari"
                      defaultValue={ebook ? ebook.nomorLemari : ''}
                      className="w-full px-2  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                      type="text"
                      required=""
                      ref={register({
                        required: 'Field tidak boleh kosong',
                      })}
                      aria-label="Email"
                    />
                    <div className="text-red-700">
                      {errors.nomorLemari && errors.nomorLemari.message}
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm text-gray-600">Rak</label>
                    <input
                      name="rakLemari"
                      defaultValue={ebook ? ebook.rakLemari : ''}
                      className="w-full px-2  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                      type="text"
                      required=""
                      ref={register({
                        required: 'Field tidak boleh kosong',
                      })}
                      aria-label="Email"
                    />
                    <div className="text-red-700">
                      {errors.rakLemari && errors.rakLemari.message}
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm text-gray-600">Lokasi Perpustakaan</label>
                    <input
                      name="lokasiPerpustakaan"
                      defaultValue={ebook ? ebook.lokasiPerpustakaan : ''}
                      className="w-full px-2  py-1 text-gray-700 bg-gray-100 rounded outline-none border"
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
                    <label className="block text-sm text-gray-600">Status</label>
                    <Checkbox.Group
                      options={optionsStatus}
                      value={statusValue}
                      onChange={onChangeStatus}
                    />
                    <div className="text-red-700"></div>
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm text-gray-600">Tahun Terbit</label>
                    <Space direction="vertical">
                      <DatePicker onChange={onChange} placeholder={publishDate} picker="year" />
                    </Space>
                  </div>

                  <div className="mt-2">
                    <label className="block text-sm text-gray-600">Image</label>

                    <input
                      onChange={e => uploadImage(e)}
                      type="file"
                      className="px-2  text-white font-light tracking-wider bg-gray-700 rounded"
                      accept="image/png, image/jpeg"
                      aria-label="Email"
                    />
                    <div className="text-red-700">
                      {errors.dateEbook && errors.dateEbook.message}
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm text-gray-600">Keterangan</label>
                    <input
                      name="keterangan"
                      defaultValue={ebook ? ebook.keterangan : ''}
                      className="w-full px-2  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                      type="text"
                      required=""
                      ref={register({
                        required: 'Field tidak boleh kosong',
                      })}
                      aria-label="Email"
                    />
                    <div className="text-red-700">
                      {errors.keterangan && errors.keterangan.message}
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className=" block text-sm text-gray-600" htmlFor="message">
                      Deskripsi
                    </label>
                    <textarea
                      name="description"
                      defaultValue={ebook ? ebook.description : ''}
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
          )}
        </div>
      </main>
    </div>
  );
}

export default connect(null, {
  CreateNewEbookAction,

  EditEbookAction,
  UploadSingleEbookFIle,
})(CreateNewEBook);
