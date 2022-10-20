// Poetry API Service

import call from './api.services';

export const getPoetry = (num, callback) => {
  return call(num, callback);
};
