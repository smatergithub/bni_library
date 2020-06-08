import { SIGN_IN } from '../type';

export const signIn = user => dispatch => {
  return dispatch({ type: SIGN_IN, payload: user });
};
