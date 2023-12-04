import { getServerSession } from "@infrastructure";
import axiosClient, { AxiosInstance } from "axios";
import { IHTTPClient } from "@edu-platform/common/api";

export class AxiosFetcher implements IHTTPClient {
  private _instance: AxiosInstance;

  constructor(baseURL: string) {
    this._instance = axiosClient.create({ baseURL });
    this._instance.interceptors.request.use(async (config) => {
      let token = "";
      if (typeof window == "undefined") {
        try {
          const serverSession = await getServerSession();
          token = serverSession.token;
        } catch (e) {
          console.error("Error getting server session", e);
        }
      }

      if (token != "") {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });
  }

  private _successHandler(res) {
    return res.data;
  }

  private _errorHandler(e) {
    // console.error({e});
    // if(e instanceof AxiosError) {
    //   throw {
    //     status: 500,
    //     message: e.cause
    //   }
    // }
    if (e.response) {
      throw {
        status: e.response.status,
        message: e.response.data || e.message,
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

  async del(url: string, query?: { [k: string]: string }) {
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

  setInterceptor(response: (args) => any) {
    this._instance.interceptors.response.use(response);
  }
}

export const axios = new AxiosFetcher(process.env.NEXT_PUBLIC_API_HOST);
