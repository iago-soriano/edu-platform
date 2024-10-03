import { IHTTPClient } from "@edu-platform/common/api";
import { getServerSession } from "next-auth";

export interface FetchResponse<T> {
  data?: T | undefined;
  status: number;
  error?: boolean;
  message?: string;
}

const headersHandler = () => {
  return {
    Authorization: `Bearer ${getServerSession()}`,
    "Content-Type": "application/json",
  };
};

export class Fetcher implements IHTTPClient {
  constructor() {}

  async handleError(response: any) {
    let message = response.statusText;
    try {
      const resp = await response.json();
      message = resp.message;
    } catch (e) {
      throw new Error(e.message);
    }

    throw new Error(message);
  }

  async get(endpoint: string) {
    const response = await fetch(endpoint.toString(), {
      method: "GET",
      headers: headersHandler(),
    });

    if (!response.ok) this.handleError(response);
  }

  async put(endpoint: string, body: unknown) {
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: headersHandler(),
      body: JSON.stringify(body),
    });

    if (!response.ok) this.handleError(response);

    return await response.json();
  }

  async post(endpoint: string, body: unknown) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: headersHandler(),
      body: JSON.stringify(body),
    });

    if (!response.ok) this.handleError(response);

    return {
      data: await response.json(),
      status: response.status,
    };
  }

  async delete(endpoint: string) {
    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: headersHandler(),
    });

    if (!response.ok) this.handleError(response);

    return {
      data: await response.json(),
      status: response.status,
    };
  }
}
