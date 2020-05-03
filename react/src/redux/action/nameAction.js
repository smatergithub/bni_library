import axios from 'axios';
import { GET_NAMES, SELECT_NAME_BYID } from '../type';

const url = 'https://randomuser.me/api/';
export const getListNameAction = () => dispatch => {
  return axios
    .get(url)
    .then(response => {
      dispatch({ type: GET_NAMES, payload: response.data.results });
      return { resp: true };
    })
    .catch(() => {
      return { resp: false };
    });
};

export const selectedNameAction = payload => {
  return {
    type: SELECT_NAME_BYID,
    payload,
  };
};
