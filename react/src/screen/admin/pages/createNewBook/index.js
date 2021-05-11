import React from 'react';
import { DatePicker, Space, Checkbox } from 'antd';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import BookAPI from '../../../../api/BookApi';
import { CreateNewBookAction, EditBookAction } from '../../../../redux/action/books';
import swal from 'sweetalert';
import Loader from '../../component/Loader';
function CreateNewBook(props) {
  const parsed = queryString.parse(props.location.search);
  let { id } = parsed;
  const { handleSubmit, register, errors } = useForm();
  let [image, setImage] = React.useState(null);
  let [statusValue, setStatusValue] = React.useState(null);
  let [publishDate, setPublishDate] = React.useState(null);
  let [books, setBooks] = React.useState(null);
  let [isLoading, setIsLoading] = React.useState(false);

  function onSubmit(formData) {
    if (!id) {
      formData['image'] = image;

      formData['tahunTerbit'] = publishDate;
      formData['tanggalTerbit'] = publishDate;
      formData['status'] = statusValue == 'Ada' ? 'Ada' : 'Kosong';
      props.CreateNewBookAction(formData).then((res) => {
        if (res.resp) {
          swal('Message!', res.msg, 'success');
          props.history.push('/admin/books');
        } else {
          swal('Error!', res.msg, 'error');
        }
      });
    } else {
      formData['image'] = image ? image : book.image;
      formData['tahunTerbit'] = publishDate ? publishDate : book.tahunTerbit;
      formData['tanggalTerbit'] = publishDate ? publishDate : book.tahunTerbit;
      formData['status'] =
        statusValue !== null ? (statusValue === 'Ada' ? 'Ada' : 'Kosong') : book.status;

      props.EditBookAction(id, formData).then((res) => {
        if (res.resp) {
          props.history.push('/admin/books');
          swal('Message!', res.msg, 'success');
        } else {
          swal('Error!', res.msg, 'error');
        }
      });
    }
  }

  let uploadImage = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setImage(file);
    };

    reader.readAsDataURL(file);
  };

  React.useEffect(() => {
    if (id) {
      BookAPI.detail(id).then((res) => {
        if (res.data) {
          setBooks(res.data);
          setStatusValue(res.data.status);
          setPublishDate(res.data.tahunTerbit);
        } else {
          setBooks(null);
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

  if (!books && id) return null;
  let book = id ? books : books;
  let titleFormat = id ? 'Ubah Buku' : 'Buku Baru';
  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6 mb-20">
        <p style={{ fontSize: '24px' }} className="text-black">
          {titleFormat}
        </p>

        <div className="flex flex-wrap">
          {isLoading ? (
            <div className="w-full lg:w-1/1 mt-32 pl-0 lg:pl-2">
              <Loader />
            </div>
          ) : (
            <div className="w-full lg:w-1/1 mt-6 pl-0 lg:pl-2">
              <div className="leading-loose">
                <form className="p-10 bg-white rounded shadow-xl" onSubmit={handleSubmit(onSubmit)}>
                  <p className="text-lg text-gray-800 font-medium pb-4">Informasi Buku</p>

                  <div className="">
                    <label className="block text-sm text-gray-600" htmlFor="cus_name">
                      Judul
                    </label>
                    <input
                      className="w-full px-2 py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline  "
                      type="text"
                      name="judul"
                      defaultValue={book ? book.judul : ''}
                      aria-label="Name"
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
                      defaultValue={book ? book.pengarang : ''}
                      className="w-full px-2  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
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
                    <label className="block text-sm text-gray-600" htmlFor="cus_email">
                      Kategori Buku
                    </label>
                    <input
                      name="kategori"
                      defaultValue={book ? book.kategori : ''}
                      className="w-full px-2  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
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
                      Stock Buku
                    </label>
                    <input
                      name="stockBuku"
                      defaultValue={book ? book.stockBuku : ''}
                      className="w-full px-2  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                      type="number"
                      ref={register({
                        required: 'Field tidak boleh kosong',
                      })}
                      aria-label="Email"
                    />
                    <div className="text-red-700">
                      {errors.stockBuku && errors.stockBuku.message}
                    </div>
                  </div>

                  <div className="mt-2">
                    <label className="block text-sm text-gray-600" htmlFor="cus_email">
                      Bahasa
                    </label>
                    <input
                      name="bahasa"
                      defaultValue={book ? book.bahasa : ''}
                      className="w-full px-2  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
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
                      defaultValue={book ? book.isbn : ''}
                      className="w-full px-2  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
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
                      defaultValue={book ? book.penerbit : ''}
                      className="w-full px-2  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                      type="text"
                      required=""
                      ref={register({
                        required: 'Field tidak boleh kosong',
                      })}
                      aria-label="Email"
                    />
                    <div className="text-red-700">{errors.penerbit && errors.penerbit.message}</div>
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm text-gray-600" htmlFor="cus_email">
                      Nomor Lemari
                    </label>
                    <input
                      name="nomorLemari"
                      defaultValue={book ? book.nomorLemari : ''}
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
                    <label className="block text-sm text-gray-600" htmlFor="cus_email">
                      Rak
                    </label>
                    <input
                      name="rakLemari"
                      defaultValue={book ? book.rakLemari : ''}
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
                    <label className="block text-sm text-gray-600" htmlFor="cus_email">
                      Lokasi Perpustakaan
                    </label>
                    <input
                      name="lokasiPerpustakaan"
                      defaultValue={book ? book.lokasiPerpustakaan : ''}
                      className="w-full px-2  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
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
                      defaultValue={['Weeding']}
                      onChange={onChangeStatus}
                    />
                    <div className="text-red-700"></div>
                  </div>

                  <div className="mt-2">
                    <label className="block text-sm text-gray-600" htmlFor="cus_email">
                      Tahun Terbit
                    </label>
                    <Space direction="vertical">
                      <DatePicker onChange={onChange} placeholder={publishDate} picker="year" />
                    </Space>
                  </div>

                  <div className="mt-2">
                    <label className="block text-sm text-gray-600" htmlFor="cus_email">
                      Foto
                    </label>

                    <input
                      onChange={(e) => uploadImage(e)}
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
                    <label className="block text-sm text-gray-600" htmlFor="cus_email">
                      Keterangan
                    </label>
                    <input
                      name="keterangan"
                      defaultValue={book ? book.keterangan : ''}
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
                      defaultValue={book ? book.description : ''}
                      className="w-full px-2 py-2 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
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
                            props.history.push('/admin/books');
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
          )}
        </div>
      </main>
    </div>
  );
}

export default connect(null, {
  CreateNewBookAction,
  EditBookAction,
})(CreateNewBook);
