import React from 'react';
import { DatePicker, Space, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { CreateNewEbookAction } from '../../../../redux/action/ebooks';
import { UploadEbookFIle } from '../../../../redux/action/ebooks';
import { ToastError, ToastSuccess } from '../../../../component';

function CreateNewEBook(props) {
  const { handleSubmit, register, errors } = useForm();
  let [image, setImage] = React.useState(null);
  let [promotionValue, setPromotionValue] = React.useState('false');
  let [statusValue, setStatusValue] = React.useState('false');
  let [publishDate, setPublishDate] = React.useState('');
  let exportFile = React.useRef(null);

  function onSubmit(formData) {
    formData['image'] = image;
    formData['isPromotion'] = promotionValue == 'true' ? true : false;
    formData['tahunTerbit'] = publishDate;
    formData['tanggalTerbit'] = publishDate;
    formData['status'] = statusValue == 'true' ? true : false;
    props.CreateNewEbookAction(formData).then(res => {
      if (res.resp) {
        ToastSuccess(res.msg);
        props.history.push('/admin/ebooks');
      } else {
        ToastError(res.msg);
      }
    });
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
  let uploadPdf = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      props.UploadEbookFIle({ file }).then(res => {
        console.log(res);
      });
      // setSourceLink(file);
    };

    reader.readAsDataURL(file);
  };
  function onChange(date, dateString) {
    setPublishDate(dateString);
  }
  function onChangePromotion(value) {
    setPromotionValue(value[0] ? 'true' : 'false');
  }
  function onChangeStatus(value) {
    setStatusValue(value[0] ? 'true' : 'false');
  }
  const optionsStatus = [
    { label: 'Aktif', value: true },
    { label: 'Non Aktif', value: false },
  ];
  const optionsPromotion = [
    { label: 'Ya', value: true },
    { label: 'Tidak', value: false },
  ];
  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6 mb-20">
        <h1 className="w-full text-3xl text-black pb-6">Biografi Ebook</h1>

        <div className="flex flex-wrap">
          <div className="w-2/12 absolute" style={{ right: '3em', top: '5em' }}>
            <button
              type="button"
              onClick={() => exportFile.current.click()}
              className="w-full bg-gray-800 text-white font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-700 flex items-center justify-center"
            >
              <i className="fas fa-upload mr-3" /> Import Ebook
            </button>
          </div>
          <div className="w-full lg:w-1/1 mt-6 pl-0 lg:pl-2">
            <div className="leading-loose">
              <form className="p-10 bg-white rounded shadow-xl" onSubmit={handleSubmit(onSubmit)}>
                <p className="text-lg text-gray-800 font-medium pb-4">Informasi Ebook</p>
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
                    className="w-full px-5 py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline  "
                    type="text"
                    name="judul"
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
                    className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
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
                    className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
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
                    className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                    type="text"
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
                    className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
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
                    className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
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
                    className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                    type="text"
                    required=""
                    ref={register({
                      required: 'Field tidak boleh kosong',
                    })}
                    aria-label="Email"
                  />
                  <div className="text-red-700">{errors.penerbit && errors.penerbit.message}</div>
                </div>

                <div className="mt-2 ">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Link File
                  </label>
                  <input
                    name="sourceLink"
                    className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
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
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Lokasi Perpustakaan
                  </label>
                  <input
                    name="lokasiPerpustakaan"
                    className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
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
                    Diskon
                  </label>
                  <Checkbox.Group
                    options={optionsPromotion}
                    value={promotionValue}
                    onChange={onChangePromotion}
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
                    className="w-full px-5 py-2 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
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

export default connect(null, { CreateNewEbookAction, UploadEbookFIle })(CreateNewEBook);
