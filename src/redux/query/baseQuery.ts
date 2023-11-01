import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosRequestConfig, AxiosError } from 'axios'
import { BASE_URL } from '@env'
import { ITEM_ASYNC_STORE_AGE } from '@/constants/itemAsycnStoreAge'

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: BASE_URL }
  ): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
      headers?: AxiosRequestConfig['headers']
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    if(headers?.Authorization !== undefined) {
      const token = await AsyncStorage.getItem(ITEM_ASYNC_STORE_AGE.ACCESS_TOKEN);
      headers.Authorization = headers.Authorization + token;
    }

    try {
      const result = await axios({
        url: `${baseUrl}/${url}`,
        method,
        data,
        params,
        headers,
      });

      return {
        data: {
          data: result.data.data,
          error: null,
          success: true,
        }
      }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: {
          data: null,
          error: err,
          success: false,
        },
      }
    }
  }

export default axiosBaseQuery;