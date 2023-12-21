import { getServerSession } from "@infrastructure";
import axiosClient, { AxiosInstance } from "axios";
import {
  IHTTPClient,
  RefreshTokenRequestBody,
  RefreshTokenResponseBody,
} from "@edu-platform/common/api";

const refreshToken = async (refreshToken: string) => {
  const res: RefreshTokenResponseBody = await axios.post("/refresh-token", {
    refreshToken,
  } as RefreshTokenRequestBody);

  return res.accessToken;
};

export class AxiosFetcher implements IHTTPClient {
  public _instance: AxiosInstance;

  constructor(baseURL: string) {
    this._instance = axiosClient.create({ baseURL });
    this._instance.interceptors.request.use(
      async (config) => {
        if (typeof window == "undefined") {
          const session = await getServerSession();
          if (!config.headers["Authorization"]) {
            config.headers["Authorization"] = `Bearer ${session?.accessToken}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this._instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (typeof window == "undefined") {
          const prevRequest = error?.config;
          if (error?.response?.status === 401 && !prevRequest?.sent) {
            const session = await getServerSession();
            prevRequest.sent = true;
            const accessToken = await refreshToken(session.refreshToken);
            prevRequest.headers["Authorization"] = `Bearer ${accessToken}`;
            return this._instance(prevRequest);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private _successHandler(res) {
    return res.data;
  }

  private _errorHandler(e) {
    console.log("axios error", e.message);
    if (e.response) {
      throw {
        status: e.response.status,
        message: e.response.data.message || e.message,
        errors: e.response.data.errors,
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

  setInterceptor(
    side: "response" | "request",
    onFulfilled: (args) => any,
    onRejected: (error) => any
  ) {
    this._instance.interceptors[side].use(onFulfilled, onRejected);
  }

  ejectInterceptor(side: "response" | "request", interceptor: any) {
    this._instance.interceptors[side].eject(interceptor);
  }
}

export const axios = new AxiosFetcher(process.env.NEXT_PUBLIC_API_HOST);
