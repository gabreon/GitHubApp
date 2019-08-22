import api from '../../services/api';

import { Alert } from 'react-native';

import{
  REPOSITORIES_FETCH_START,
  REPOSITORIES_FETCH_FAIL,
  REPOSITORIES_FETCHED,
} from './consts';

export const getRepositories = user => {
  return async dispatch => {
    dispatch({ type: REPOSITORIES_FETCH_START });

    try{
      const response = await api.get(`/users/${user}/repos`)

      const { data } = response;

      dispatch({ type: REPOSITORIES_FETCHED, payload: data });
      
      return true;
    } catch (e) {
      dispatch({ type: REPOSITORIES_FETCH_FAIL });

      Alert.alert('Atenção!', e.message, [{ text: 'Ok' }]);

      return false;
    }
  };
};