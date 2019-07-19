/* eslint-disable @typescript-eslint/no-explicit-any */
import * as firebase from 'firebase/app'
import moment from 'moment'
import {AxiosInstance, AxiosRequestConfig} from 'axios'

export interface NuxtAxiosInstance extends AxiosInstance {
  $request<T = any>(config: AxiosRequestConfig): Promise<T>
  $get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  $delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  $head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  $options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  $post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>
  $put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>
  $patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>
}

export interface InjectedByPlugin {
  $axios: NuxtAxiosInstance
  $moment: typeof moment
  $firebase: typeof firebase
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
}
