import { SIGN_IN, SIGN_OUT } from '../type';
import UserApi from '../client/UserApi';

export const signIn = user => dispatch => {
  UserApi.login(user).then(res => {
    console.log(res);
  });
  // return dispatch({ type: SIGN_IN, payload: user });
};
export const signUp = user => () => {
  return UserApi.register(user)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: 'Registration was successfully, Now you can  login  with your account !',
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
