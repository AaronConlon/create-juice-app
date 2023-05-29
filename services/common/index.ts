import { URL_GET_DEMO_DATA } from '../url.list';
import { TDemoResponse } from './types';
import { API } from '~/componsables/request';

export const commonApi = {
  getDemoData: () => API.get<TDemoResponse>(URL_GET_DEMO_DATA),
};
