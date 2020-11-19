import { get } from 'lodash/fp';
import { LOADING } from './reducer';

export const isLoading = resource => state => {
  return get(`resourceStatus.${resource}`, state) === LOADING;
};
