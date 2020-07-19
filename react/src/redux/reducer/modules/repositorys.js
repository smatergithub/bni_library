import { REPOSITORYS } from '../../type';

const initialState = {
  repositorys: [],
};

const repositorys = (state = initialState, action) => {
  switch (action.type) {
    case REPOSITORYS:
      return {
        ...state,
        repositorys: action.payload,
      };
    default:
      return state;
  }
};

export default repositorys;
