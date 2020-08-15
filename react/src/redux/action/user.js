import { SIGN_IN, SIGN_OUT, USERS, ME } from '../type';
import UserApi from '../client/UserApi';

export const signIn = user => dispatch => {
  return UserApi.login(user)
    .then(res => {
      if (res) {
        localStorage.setItem('bni_jwtToken', res.accessToken);
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

export const signOut = () => dispatch => {
  return dispatch({ type: SIGN_OUT });
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
export const getBorrowedItem = () => () => {
  return UserApi.getBorrowedItem()
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
