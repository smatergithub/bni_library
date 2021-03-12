import BookApi from '../../api/BookApi';

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
      let msg = err.response.data.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const UploadBookFIle = book => () => {
  var formdata = new FormData();
  for (var key in book) {
    formdata.append(key, book[key]);
  }

  return BookApi.uploadbookFile(formdata)
    .then(res => {
      return {
        msg: 'Buku Berhasil di tambahkan',
      };
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { msg: msg };
    });
};

export const EditBookAction = (id, book) => () => {
  var formdata = new FormData();
  for (var key in book) {
    formdata.append(key, book[key]);
  }
  return BookApi.update(id, formdata)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: 'Buku Berhasil di diubah',
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const getfavorite = () => dispatch => {
  return BookApi.favorite()
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: '',
          data: res,
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};
