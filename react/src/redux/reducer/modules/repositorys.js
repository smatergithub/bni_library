import { REPOSITORYS, REPOSITORYS_APPROVAL } from '../../type';

const initialState = {
  repositorys: [],
  approval: [],
};

const repositorys = (state = initialState, action) => {
  switch (action.type) {
    case REPOSITORYS:
      return {
        ...state,
        repositorys: action.payload,
      };
    case REPOSITORYS_APPROVAL:
      return {
        ...state,
        approval: action.payload,
      };
    default:
      return state;
  }
};

export default repositorys;
