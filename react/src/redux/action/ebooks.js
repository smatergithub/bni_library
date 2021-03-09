import EbookApi from '../../api/EbookApi';
/**
 * note: for book creation doesn't need to dispatch //
 * any reducer type,
 * just return the response (true/false) to the UI
 */

export const CreateNewEbookAction = Ebook => () => {
  var formdata = new FormData();
  for (var key in Ebook) {
    formdata.append(key, Ebook[key]);
  }
  return EbookApi.create(formdata)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: 'Ebook Berhasil di tambahkan',
        };
      }
    })
    .catch(err => {
      let msg = err.response.data.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};
export const UploadEbookFIle = book => () => {
  var formdata = new FormData();
  for (var key in book) {
    formdata.append(key, book[key]);
  }

  return EbookApi.uploadEbookFile(formdata)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: 'Ebook Berhasil di tambahkan',
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const UploadSingleEbookFIle = book => () => {
  var formdata = new FormData();
  for (var key in book) {
    formdata.append(key, book[key]);
  }

  return EbookApi.uploadSingleEbookFile(formdata)
    .then(res => {
      if (res) {
        return {
          resp: true,
          data: res,
          msg: 'Ebook Berhasil di tambahkan',
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const EditEbookAction = (id, Ebook) => () => {
  var formdata = new FormData();
  for (var key in Ebook) {
    formdata.append(key, Ebook[key]);
  }
  return EbookApi.update(id, formdata)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: 'Ebook Berhasil di diubah',
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const getfavorite = () => dispatch => {
  return EbookApi.favorite()
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
