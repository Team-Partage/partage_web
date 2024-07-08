import merge from 'lodash/merge';
import qs from 'qs';

type FetcherRequestInit = Omit<RequestInit, 'method'>;

type Config = {
  baseURL?: string;
  defaultRequestInit?: FetcherRequestInit;
};

class Fetcher {
  private baseURL: string | URL | undefined;
  private defaultRequestInit: FetcherRequestInit | undefined;

  constructor(config?: Config) {
    this.baseURL = config?.baseURL;
    this.defaultRequestInit = config?.defaultRequestInit;
  }

  async get<T>(endpoint: string, params?: object, options?: FetcherRequestInit): Promise<T> {
    try {
      const url = new URL(endpoint, this.baseURL);

      let requestInit = this.defaultRequestInit;

      if (params) {
        url.search = qs.stringify(params);
      }

      if (options) {
        requestInit = merge(this.defaultRequestInit, options);
      }

      const res = await fetch(url, {
        method: 'GET',
        ...requestInit,
      });
      const data: T = await res.json();

      return data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async post<T>(endpoint: string, params: object, options?: FetcherRequestInit): Promise<T> {
    try {
      const url = new URL(endpoint, this.baseURL);

      let requestInit = this.defaultRequestInit;

      if (options) {
        requestInit = merge(this.defaultRequestInit, options);
      }

      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(params),
        ...requestInit,
      });

      const data: T = await res.json();

      return data;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async put<T>(endpoint: string, params: object, options?: FetcherRequestInit): Promise<T> {
    try {
      const url = new URL(endpoint, this.baseURL);

      let requestInit = this.defaultRequestInit;

      if (options) {
        requestInit = merge(this.defaultRequestInit, options);
      }

      const res = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(params),
        ...requestInit,
      });

      const data: T = await res.json();

      return data;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async patch<T>(endpoint: string, params: object, options?: FetcherRequestInit): Promise<T> {
    try {
      const url = new URL(endpoint, this.baseURL);

      let requestInit = this.defaultRequestInit;

      if (options) {
        requestInit = merge(this.defaultRequestInit, options);
      }

      const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(params),
        ...requestInit,
      });

      const data: T = await res.json();

      return data;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async delete<T>(endpoint: string, options?: FetcherRequestInit): Promise<T> {
    try {
      const url = new URL(endpoint, this.baseURL);

      let requestInit = this.defaultRequestInit;

      if (options) {
        requestInit = merge(this.defaultRequestInit, options);
      }

      const res = await fetch(url, {
        method: 'DELETE',
        ...requestInit,
      });

      const data: T = await res.json();

      return data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  protected handleError(error: unknown) {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }
    return Promise.reject(error);
  }
}

export const fetcher = new Fetcher({
  baseURL: 'http://localhost:9090',
  defaultRequestInit: { headers: { 'Content-Type': 'application/json' } },
});
