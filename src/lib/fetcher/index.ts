import merge from 'deepmerge';
import qs from 'qs';

type FetcherRequestInit = Omit<RequestInit, 'method'>;

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

  optionMerge(options?: FetcherRequestInit) {
    if (!options) {
      return this.defaultRequestInit;
    } else {
      return merge(this.defaultRequestInit, options);
    }
  }

  async get<T>(endpoint: string, params?: object, options?: FetcherRequestInit): Promise<T> {
    try {
      const url = new URL(endpoint, this.baseURL);

      if (params) {
        url.search = qs.stringify(params);
      }

      const res = await fetch(url, {
        method: 'GET',
        ...this.optionMerge(options),
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

      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(params),
        ...this.optionMerge(options),
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

      const res = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(params),
        ...this.optionMerge(options),
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

      const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(params),
        ...this.optionMerge(options),
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

      const res = await fetch(url, {
        method: 'DELETE',
        ...this.optionMerge(options),
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
