import React from 'react';
import { DatePicker, Space, Checkbox } from 'antd';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  CreateNewBookAction,
  UploadBookFIle,
  getDetailBook,
  EditBookAction,
} from '../../../../redux/action/books';
import { ToastError, ToastSuccess } from '../../../../component';

function CreateNewBook(props) {
  const parsed = queryString.parse(props.location.search);
  let { id } = parsed;
  const { handleSubmit, register, errors } = useForm();
  let [image, setImage] = React.useState(null);
  let [conditionValue, setConditionValue] = React.useState(null);
  let [statusValue, setStatusValue] = React.useState(null);
  let [publishDate, setPublishDate] = React.useState(null);
  let [books, setBooks] = React.useState(null);
  let exportFile = React.useRef(null);

  function onSubmit(formData) {
    if (!id) {
      formData['image'] = image;
      formData['condition'] = conditionValue == 'Baik' ? 'Baik' : 'Wedding';
      formData['tahunTerbit'] = publishDate;
      formData['tanggalTerbit'] = publishDate;
      formData['status'] = statusValue == 'Ada' ? 'Ada' : 'Kosong';
      props.CreateNewBookAction(formData).then(res => {
        if (res.resp) {
          ToastSuccess(res.msg);
          props.history.push('/admin/books');
        } else {
          ToastError(res.msg);
        }
      });
    } else {
      formData['image'] = image ? image : book.image;
      formData['condition'] =
        conditionValue !== null ? (conditionValue == 'Baik' ? 'Baik' : 'Weeding') : book.condition;
      formData['tahunTerbit'] = publishDate ? publishDate : book.tahunTerbit;
      formData['tanggalTerbit'] = publishDate ? publishDate : book.tahunTerbit;
      formData['status'] =
        statusValue !== null ? (statusValue === 'Ada' ? 'Ada' : 'Kosong') : book.status;

      props.EditBookAction(id, formData).then(res => {
        if (res.resp) {
          props.history.push('/admin/books');
          ToastSuccess(res.msg);
        } else {
          ToastError(res.msg);
        }
      });
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
  React.useEffect(() => {
    if (id) {
      props.getDetailBook(id).then(res => {
        if (res.resp) {
          setBooks(res.data);
          setStatusValue(res.data.book.status);
          setConditionValue(res.data.book.condition);
          setPublishDate(res.data.book.tahunTerbit);
        } else {
          setBooks(null);
        }
      });
    }
  }, []);
  function onChange(date, dateString) {
    setPublishDate(dateString);
  }
  function onChangeCondition(value) {
    console.log(value);
    setConditionValue(value[0]);
  }
  function onChangeStatus(value) {
    setStatusValue(value[0]);
  }
  let uploadPdf = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      props.UploadBookFIle({ file }).then(res => {
        if (res) {
          console.log('res', res);
          ToastSuccess(res.msg);
          props.history.push('/admin/books');
        } else {
          ToastError(res.msg);
        }
      });
      // setSourceLink(file);
    };

    reader.readAsDataURL(file);
  };
  const optionsStatus = [
    { label: 'Ada', value: 'Ada' },
    { label: 'Kosong', value: 'Kosong' },
  ];
  const optionsCondition = [
    { label: 'Baik', value: 'Baik' },
    { label: 'Wedding', value: 'Wedding' },
  ];
  if (!books && id) return null;
  let book = id ? books.book : books;
  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6 mb-20">
        <h1 className="w-full text-3xl text-black pb-6">Biografi Buku</h1>

        <div className="flex flex-wrap">
          <div className="w-2/12 absolute" style={{ right: '3em', top: '5em' }}>
            <button
              type="button"
              onClick={() => exportFile.current.click()}
              className="w-full bg-orange-500 text-white font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-700 flex items-center justify-center"
            >
              <i className="fas fa-upload mr-3" /> Import Books
            </button>
          </div>
          <div className="w-full lg:w-1/1 mt-6 pl-0 lg:pl-2">
            <div className="leading-loose">
              <form className="p-10 bg-white rounded shadow-xl" onSubmit={handleSubmit(onSubmit)}>
                <p className="text-lg text-gray-800 font-medium pb-4">Informasi Buku</p>
                <input
                  onChange={e => uploadPdf(e)}
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
                  <div className="text-red-700">{errors.pengarang && errors.pengarang.message}</div>
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
                    Stock
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
                  <div className="text-red-700">{errors.stockBuku && errors.stockBuku.message}</div>
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
                    Kondisi
                  </label>
                  <Checkbox.Group
                    options={optionsCondition}
                    value={conditionValue}
                    onChange={onChangeCondition}
                  />
                  <div className="text-red-700"></div>
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Tahun Terbit
                  </label>
                  <Space direction="vertical">
                    <DatePicker onChange={onChange} placeholder={publishDate} />
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
  CreateNewBookAction,
  UploadBookFIle,
  getDetailBook,
  EditBookAction,
})(CreateNewBook);
