import React from 'react';
import { useForm } from 'react-hook-form';

function EditUser({ changePages }) {
  const { handleSubmit, register, errors } = useForm();
  function onSubmit(formData) {
    // formData['image'] = image;
    formData['isPromotion'] = 1;
    formData['dateBook'] = new Date();
    formData['stockBook'] = 10;
    console.log(formData);
    changePages(false);
  }
  return (
    <div class="bg-white rounded-lg shadow-lg pl-10 relative">
      <div class="px-4 py-8 flex">
        <div className="w-full lg:w-1/1 mt-6 pl-0 lg:pl-2">
          <form className="p-10 bg-white rounded shadow-xl" onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <label className="block text-sm text-gray-600" htmlFor="cus_name">
                Nama
              </label>
              <input
                className="w-full px-5 py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline  "
                type="text"
                name="title"
                aria-label="Name"
                ref={register({
                  required: false,
                })}
              />
              <div className="text-red-700">{errors.title && errors.title.message}</div>
            </div>
            <div className="mt-2">
              <label className="block text-sm text-gray-600" htmlFor="cus_email">
                Tanggal Lahir
              </label>
              <input
                name="author"
                className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                type="text"
                ref={register({
                  required: false,
                })}
                aria-label="Email"
              />
              <div className="text-red-700">{errors.author && errors.author.message}</div>
            </div>
            <div className="mt-2">
              <label className="block text-sm text-gray-600" htmlFor="cus_email">
                Alamat
              </label>
              <input
                name="code"
                className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                type="text"
                ref={register({
                  required: false,
                })}
                aria-label="Email"
              />
              <div className="text-red-700">{errors.code && errors.code.message}</div>
            </div>

            {/* <div className="mt-2">
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
                </div> */}

            <div className="mt-6">
              <button
                className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                type="submit"
              >
                UPDATE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default EditUser;
