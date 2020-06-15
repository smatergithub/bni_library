import { SIGN_IN, SIGN_OUT } from '../type';
import UserApi from '../client/UserApi';

export const signIn = user => dispatch => {
  return dispatch({ type: SIGN_IN, payload: user });
};
export const signUp = user => dispatch => {
  UserApi.register(user).then(res => {
    console.log(res);
  });
  return dispatch({ type: SIGN_IN, payload: user });
};
export const signOut = () => dispatch => {
  return dispatch({ type: SIGN_OUT });
};
