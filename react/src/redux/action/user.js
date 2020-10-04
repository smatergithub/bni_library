import { SIGN_IN, SIGN_OUT, USERS, ME } from '../type';
import UserApi from '../client/UserApi';
import WilayahApi from '../client/wilayahApi';

export const signIn = user => dispatch => {
  return UserApi.login(user)
    .then(res => {
      if (res) {
        localStorage.setItem('bni_UserRole', res.role);
        dispatch({ type: SIGN_IN, payload: res });
        return { resp: true, msg: '' };
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
export const signUp = user => () => {
  return UserApi.register(user)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: 'Request was successfully, Please check your email to complete the registration!',
          token: res.verificationToken,
          email: res.email,
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};
export const verificationUser = param => () => {
  return UserApi.verificationUser(param)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: 'Registration was successfully, Now you can  login  with your account !',
          token: res.verificationToken,
          email: res.email,
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
        dispatch({ type: ME, payload: res });
        return {
          resp: true,
          data: res,
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};
export const updateMe = data => () => {
  return UserApi.updateMe(data)
    .then(res => {
      if (res) {
        return {
          resp: true,
          data: res,
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
        dispatch({ type: USERS, payload: res });
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
          data: res,
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
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
          data: res,
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
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
          data: res,
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
          data: res,
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

export const getWilayah = () => () => {
  return WilayahApi.list()
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
export const resetPassword = data => () => {
  return UserApi.resetPassword(data)
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
