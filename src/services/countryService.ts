import axios from 'axios';
import {API_ENDPOINTS} from './const';
import {BaseResponseType} from './types';

export const getCountryList = async <T>(): Promise<BaseResponseType<T>> => {
  const response = await axios.get(API_ENDPOINTS.GET_COUNTRY_LIST_URL);
  const {status, data} = response;

  return {status, data};
};
