import { SIGN_IN, SIGN_OUT, USERS, ME } from '../type';

import UserApi from '../../api/UserApi';
import WilayahApi from '../../api/wilayahApi';

export const signIn = user => dispatch => {
  return UserApi.login(user)
    .then(res => {
      if (res) {
        localStorage.setItem('bni_UserRole', res.data.role);
        localStorage.setItem('bni_repoAdmin', res.data.isRepoAdmin);
        localStorage.setItem('access_token_ebni', res.data.accessToken);
        dispatch({ type: SIGN_IN, payload: res.data });
        return { resp: true, msg: '', data: res.data };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};
export const logout = () => dispatch => {
  return UserApi.logout()
    .then(res => {
      if (res) {
        dispatch({ type: SIGN_OUT });
        return { resp: true, msg: '' };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};
// export const signUp = user => () => {
//   return UserApi.register(user)
//     .then(res => {
//       if (res) {
//         return {
//           resp: true,
//           msg: 'Request was successfully, Please check your email to complete the registration!',
//           token: res.verificationToken,
//           email: res.email,
//         };
//       }
//     })
//     .catch(err => {
//       let msg = err.message || 'Something Wrong, request failed !';
//       return { resp: false, msg: msg };
//     });
// };
export const verificationUser = param => () => {
  return UserApi.verificationUser(param)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: 'Registration was successfully, Now you can  login  with your account !',
          token: res.data.verificationToken,
          email: res.data.email,
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const toggleUserIntoAdmin = id => () => {
  return UserApi.toggleUserIntoAdmin(id)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: 'Account User Berhasil di Menjadi Admin',
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};
export const toggleUserIntoRepoAdmin = (id, body) => () => {
  return UserApi.toggleUserIntoRepoAdmin(id, body)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: 'Account User Berhasil di perbarui.',
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const deleteUser = id => () => {
  return UserApi.deleteUserList(id)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: 'Account User Berhasil di dihapus',
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const getMe = () => dispatch => {
  return UserApi.getMe()
    .then(res => {
      if (res) {
        dispatch({ type: ME, payload: res.data });
        return {
          resp: true,
          data: res.data,
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

// export const checkApproveBorrow = () => {
//   return UserApi.getCheckApproveBorrow()
//     .then(res => {
//       console.log('data res', res);
//       if (res) {
//         return {
//           resp: true,
//           data: res,
//         };
//       }
//     })
//     .catch(err => {
//       let msg = err.message || 'Something Wrong, request failed !';
//       return { resp: false, msg: msg };
//     });
// };

export const updateMe = data => () => {
  return UserApi.updateMe(data)
    .then(res => {
      if (res) {
        return {
          resp: true,
          data: res.data,
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const getUsersListToAdmin = param => dispatch => {
  return UserApi.listUserAdmin(param)
    .then(res => {
      if (res) {
        dispatch({ type: USERS, payload: res.data });
        return {
          resp: true,
          msg: '',
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const getBorrowedBookItem = (id, params) => () => {
  return UserApi.getBorrowedBookItem(id, params)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: '',
          data: res.data,
        };
      }
    })
    .catch(err => {
      let msg = err.response.data.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};
export const getBorrowedEbookItem = (id, params) => () => {
  return UserApi.getBorrowedEbookItem(id, params)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: '',
          data: res.data,
        };
      }
    })
    .catch(err => {
      let msg = err.response.data.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const createBookFeeback = userData => () => {
  return UserApi.createBookFeeback(userData)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: '',
          data: res.data,
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};
export const createEbookFeeback = userData => () => {
  return UserApi.createEbookFeeback(userData)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: '',
          data: res.data,
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};
export const toogleIsAdmin = (userData, id) => () => {
  return UserApi.toggleUserIntoAdmin(userData, id)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: '',
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const exportDataUser = (from, to) => () => {
  return UserApi.exportDataUser(from, to)
    .then(response => {
      const filename = 'list_data_user';
      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(response, filename);
      } else {
        let fileURL = window.URL.createObjectURL(response);
        let a = document.createElement('a');

        a.setAttribute('download', filename);
        a.href = fileURL;
        document.body.appendChild(a);
        a.click();
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const getWilayah = () => () => {
  return WilayahApi.list()
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: '',
          data: res.data,
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const forgotPassword = data => () => {
  return UserApi.forgotPassword(data)
    .then(res => {
      if (res) {
        return { resp: true, msg: '' };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};
export const resetPassword = (data, query) => () => {
  return UserApi.resetPassword(data, query)
    .then(res => {
      if (res) {
        return { resp: true, msg: '' };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};
export const contactUs = data => () => {
  return UserApi.contactUs(data)
    .then(res => {
      if (res) {
        return { resp: true, msg: '' };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};
export const isValidToken = () => () => {
  return UserApi.isValidToken()
    .then(res => {
      if (res) {
        return { resp: true, msg: res.data.message };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};
