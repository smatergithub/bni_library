import { SIGN_IN, SIGN_OUT } from '../type';

export const signIn = user => dispatch => {
  return dispatch({ type: SIGN_IN, payload: user });
};
export const signOut = () => dispatch => {
  return dispatch({ type: SIGN_OUT });
};
