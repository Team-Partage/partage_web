import merge from 'deepmerge';
import qs from 'qs';

import { CustomError } from '../customError';

type FetcherRequestInit = Omit<RequestInit, 'method'>;

type FetcherErrorResponse = {
  code: number;
  message: string;
  status: string;
  timestamp: string;
};

type Config = {
  baseURL?: string;
  defaultRequestInit?: FetcherRequestInit;
};

class Fetcher {
  private baseURL: string | URL | undefined;
  private defaultRequestInit: FetcherRequestInit;

  constructor(config?: Config) {
    this.baseURL = config?.baseURL;
    this.defaultRequestInit = config?.defaultRequestInit ? config?.defaultRequestInit : {};
  }

  private optionMerge(options?: FetcherRequestInit): FetcherRequestInit {
    if (!options) {
      return this.defaultRequestInit;
    } else {
      return merge(this.defaultRequestInit, options);
    }
  }

  async get<T>(endpoint: string, params?: object, options?: FetcherRequestInit): Promise<T> {
    const url = new URL(endpoint, this.baseURL);

    if (params) {
      url.search = qs.stringify(params);
    }

    const res = await fetch(url, {
      method: 'GET',
      ...this.optionMerge(options),
    });
    const data: T = await this.handleResponse<T>(res);

    return data;
  }

  async post<T>(endpoint: string, params: object, options?: FetcherRequestInit): Promise<T> {
    const url = new URL(endpoint, this.baseURL);

    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(params),
      ...this.optionMerge(options),
    });

    const data: T = await this.handleResponse<T>(res);

    return data;
  }

  async put<T>(endpoint: string, params: object, options?: FetcherRequestInit): Promise<T> {
    const url = new URL(endpoint, this.baseURL);

    const res = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(params),
      ...this.optionMerge(options),
    });

    const data: T = await this.handleResponse<T>(res);

    return data;
  }

  async patch<T>(endpoint: string, params: object, options?: FetcherRequestInit): Promise<T> {
    const url = new URL(endpoint, this.baseURL);

    const res = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(params),
      ...this.optionMerge(options),
    });

    const data: T = await this.handleResponse<T>(res);

    return data;
  }

  async delete<T>(endpoint: string, options?: FetcherRequestInit): Promise<T> {
    const url = new URL(endpoint, this.baseURL);

    const res = await fetch(url, {
      method: 'DELETE',
      ...this.optionMerge(options),
    });

    const data: T = await this.handleResponse<T>(res);

    return data;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const res = (await response.json()) as FetcherErrorResponse;
      const error = new CustomError(`${res.code}, ${res.status} ${res.message}`);
      error.stack = `${error.stack}`;
      error.response = res;
      return Promise.reject(error);
    }
    return response.json() as Promise<T>;
  }
}

export const fetcher = new Fetcher({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  defaultRequestInit: { headers: { 'Content-Type': 'application/json' } },
});
