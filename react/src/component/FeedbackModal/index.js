import React from 'react';
import ReactStars from 'react-rating-stars-component';
export default function Modal({ open, title, handleSubmit }) {
  let [note, setNote] = React.useState('');
  let [rating, setRating] = React.useState(null);
  const ratingChanged = newRating => {
    setRating(newRating);
  };
  const onFormSubmit = e => {
    e.preventDefault();
    let formData = {};
    formData['note'] = note;
    formData['rating'] = rating;
    handleSubmit(formData);
  };
  return (
    <>
      {open ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div
              className={`modal-container bg-white w-11/12 md:max-w-md rounded shadow-lg  overflow-y-auto`}
              style={{
                width: '90% !important',
              }}
            >
              <div className="modal-content py-4 text-left px-6">
                <form onSubmit={e => onFormSubmit(e)}>
                  <div className="flex justify-between items-center pb-3">
                    <p className="text-2xl text-center font-bold">{title}</p>
                  </div>
                  <p
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    Silahkan isi rating terlebih dahulu untuk dapat memesan buku selanjutnya
                  </p>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      for="grid-password"
                    >
                      Komentar
                    </label>
                    <textarea
                      type="text"
                      onChange={e => setNote(e.target.value)}
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                      placeholder="Masukkan komentar"
                      style={{
                        transition: 'all 0.15s ease 0s',
                      }}
                    />
                  </div>
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold"
                    for="grid-password"
                  >
                    Rating
                  </label>
                  <ReactStars count={6} onChange={ratingChanged} size={40} activeColor="#ffd700" />
                  <button
                    className={`${
                      note.trim().length === 0 || rating === null ? 'bg-gray-400' : 'bg-gray-900'
                    } text-white active:bg-gray-700 text-sm mt-10 font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full`}
                    type="submit"
                    disabled={note.trim().length === 0 || rating === null}
                    style={{
                      transition: 'all 0.15s ease 0s',
                    }}
                  >
                    SUBMIT
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
