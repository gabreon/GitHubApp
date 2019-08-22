import { combineReducers } from 'redux';

import repositoriesReducer from '../modules/Repositories/reducer';

const reducers = combineReducers({
  repos: repositoriesReducer,
});

export default reducers;