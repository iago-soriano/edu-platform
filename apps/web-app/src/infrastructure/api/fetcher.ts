import { IHTTPClient } from "@edu-platform/common/api";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { doKeycloakSignOut } from "../../app/api/auth/logout/route";
import { redirect } from "next/navigation";

export interface FetchResponse<T> {
  data?: T | undefined;
  status: number;
  error?: boolean;
  message?: string;
}

const headersHandler = async () => {
  const token = await getServerSession(authOptions);
  //console.log({ token });
  return {
    Authorization: `Bearer ${token.access_token}`,
    "Content-Type": "application/json",
  };
};

export class Fetcher implements IHTTPClient {
  constructor() {}

  async handleResponse(response: Response) {
    const resp = await response.json();

    if (!response.ok) {
      console.error("Error status", response.status);

      if (response.status === 401) {
        // await doKeycloakSignOut();
        // await signOut();
        redirect("/auth/logout");
      }

      throw new Error(resp);
    }

    return resp;
  }

  async get(endpoint: string) {
    const response = await fetch(endpoint.toString(), {
      method: "GET",
      headers: await headersHandler(),
    });

    return this.handleResponse(response);
  }

  async put(endpoint: string, body: unknown) {
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: await headersHandler(),
      body: JSON.stringify(body),
    });

    return this.handleResponse(response);
  }

  async post(endpoint: string, body: unknown) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: await headersHandler(),
      body: JSON.stringify(body),
    });

    return this.handleResponse(response);
  }

  async delete(endpoint: string) {
    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: await headersHandler(),
    });

    return this.handleResponse(response);
  }
}
