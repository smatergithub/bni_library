import BookApi from '../client/BookApi';
/**
 * note: for book creation doesn't need to dispatch //
 * any reducer type,
 * just return the response (true/false) to the UI
 */

export const CreateNewBookAction = book => () => {
  var formdata = new FormData();
  for (var key in book) {
    formdata.append(key, book[key]);
  }
  return BookApi.create(formdata)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: 'Buku Berhasil di tambahkan',
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};
export const getBooks = params => () => {
  return BookApi.getBooks(params)
    .then(res => {
      console.log(res);
      // if (res) {
      //   return {
      //     resp: true,
      //     msg: 'Buku Berhasil di tambahkan',
      //   };
      // }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};
