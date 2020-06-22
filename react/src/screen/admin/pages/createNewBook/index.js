import React from 'react';
import { useForm } from 'react-hook-form';

function CreateNewBook() {
  const { handleSubmit, register, errors } = useForm();
  let [image, setImage] = React.useState(null);

  function onSubmit(formData) {
    formData['image'] = image;
    console.log(formData);
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
  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6 mb-20">
        <h1 className="w-full text-3xl text-black pb-6">Biografi Buku</h1>

        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/1 mt-6 pl-0 lg:pl-2">
            <div className="leading-loose">
              <form className="p-10 bg-white rounded shadow-xl" onSubmit={handleSubmit(onSubmit)}>
                <p className="text-lg text-gray-800 font-medium pb-4">Informasi Buku</p>
                <div className="">
                  <label className="block text-sm text-gray-600" htmlFor="cus_name">
                    Judul
                  </label>
                  <input
                    className="w-full px-5 py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline  "
                    type="text"
                    name="title"
                    aria-label="Name"
                    ref={register({
                      required: 'Field tidak boleh kosong',
                    })}
                  />
                  <div className="text-red-700">{errors.title && errors.title.message}</div>
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Pengarang
                  </label>
                  <input
                    name="author"
                    className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                    type="text"
                    ref={register({
                      required: 'Field tidak boleh kosong',
                    })}
                    aria-label="Email"
                  />
                  <div className="text-red-700">{errors.author && errors.author.message}</div>
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Kode Buku
                  </label>
                  <input
                    name="code"
                    className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                    type="text"
                    ref={register({
                      required: 'Field tidak boleh kosong',
                    })}
                    aria-label="Email"
                  />
                  <div className="text-red-700">{errors.code && errors.code.message}</div>
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Pernyataan tanggung jawab
                  </label>
                  <input
                    name="statementResponsibility"
                    className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                    type="text"
                    ref={register({
                      required: 'Field tidak boleh kosong',
                    })}
                    aria-label="Email"
                  />
                  <div className="text-red-700">
                    {errors.statementResponsibility && errors.statementResponsibility.message}
                  </div>
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Kategori Buku
                  </label>
                  <input
                    name="category"
                    className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                    type="text"
                    ref={register({
                      required: 'Field tidak boleh kosong',
                    })}
                    aria-label="Email"
                  />
                  <div className="text-red-700">{errors.category && errors.category.message}</div>
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Stock
                  </label>
                  <input
                    name="stockBook"
                    className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                    type="text"
                    ref={register({
                      required: 'Field tidak boleh kosong',
                    })}
                    aria-label="Email"
                  />
                  <div className="text-red-700">{errors.stockBook && errors.stockBook.message}</div>
                </div>

                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Edisi
                  </label>
                  <input
                    name="dateEbook"
                    className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                    type="text"
                    required=""
                    ref={register({
                      required: 'Field tidak boleh kosong',
                    })}
                    aria-label="Email"
                  />
                  <div className="text-red-700">{errors.dateEbook && errors.dateEbook.message}</div>
                </div>

                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Foto
                  </label>

                  <input
                    name="image"
                    onChange={e => uploadImage(e)}
                    type="file"
                    className="px-2  text-white font-light tracking-wider bg-gray-700 rounded"
                    accept="image/png, image/jpeg"
                    ref={register({
                      required: 'Field tidak boleh kosong',
                    })}
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

export default CreateNewBook;
