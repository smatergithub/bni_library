import { SIGN_IN, SIGN_OUT } from '../type';
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
          msg: 'Registration was successfully, Now you can  login  with your account !',
          token: res.verificationToken,
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
