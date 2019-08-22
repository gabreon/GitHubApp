import {
  REPOSITORIES_FETCH_START,
  REPOSITORIES_FETCH_FAIL,
  REPOSITORIES_FETCHED,
} from './consts';

const INITIAL_STATE = {
  repositories: {
    loading: false,
    data: {}
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REPOSITORIES_FETCH_START:
      return { ...state, repositories: { ...INITIAL_STATE.repositories, loading: true } };

    case REPOSITORIES_FETCH_FAIL:
      return { ...state, repositories: { ...INITIAL_STATE.repositories, loading: false } };

    case REPOSITORIES_FETCHED:
      return { ...state, repositories: { loading: false, data: action.payload } };

    default:
      return { ...state };
  };
};