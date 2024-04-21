import axiosClient, { AxiosInstance } from "axios";
import { IHTTPClient } from "@edu-platform/common/api";

export class AxiosFetcher implements IHTTPClient {
  public _instance: AxiosInstance;

  constructor(baseURL: string) {
    this._instance = axiosClient.create({ baseURL });
    // instance.interceptors.request.use((config) => {
    //   if(config.url?.includes('auth')) config.url = '';

    //   return config
    // });
    // this._instance = instance;
  }

  private _successHandler(res) {
    return res.data;
  }

  private _errorHandler(e) {
    console.log("axios error", e.message);
    if (e.response) {
      throw {
        status: e.response?.status,
        message: e.response?.data?.message || e.message,
        errors: e.response?.data?.errors,
      };
    } else {
      throw {
        status: 500,
        message: e.message,
      };
    }
  }

  async get(url: string, query?: { [k: string]: string }) {
    return this._instance
      .get(url, { params: { ...query } })
      .then(this._successHandler)
      .catch(this._errorHandler);
  }

  async put(url: string, body: unknown, query?: { [k: string]: string }) {
    return this._instance
      .put(url, body, { params: { ...query } })
      .then(this._successHandler)
      .catch(this._errorHandler);
  }

  async post(url: string, body: unknown, query?: { [k: string]: string }) {
    return this._instance
      .post(url, body, { params: { ...query } })
      .then(this._successHandler)
      .catch(this._errorHandler);
  }

  async delete(url: string, query?: { [k: string]: string }) {
    return this._instance
      .delete(url, { params: { ...query } })
      .then(this._successHandler)
      .catch(this._errorHandler);
  }

  async patch(url: string, body: unknown, query?: { [k: string]: string }) {
    return this._instance
      .patch(url, body, { params: { ...query } })
      .then(this._successHandler)
      .catch(this._errorHandler);
  }

  setHeader(header: string, value: string) {
    this._instance.defaults.headers.common[header] = value;
  }

  setInterceptor(
    side: "response" | "request",
    onFulfilled: (args) => any,
    onRejected: (error) => any
  ) {
    // console.log(this._instance.interceptors);
    return this._instance.interceptors[side].use(onFulfilled, onRejected);
  }

  ejectInterceptor(side: "response" | "request", interceptor: any) {
    this._instance.interceptors[side].eject(interceptor);
  }
}
