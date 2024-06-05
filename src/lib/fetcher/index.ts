type FetcherRequestInit = Omit<RequestInit, 'method'>;

type Config = {
  baseURL?: string;
  defaultRequestInit?: FetcherRequestInit;
};

// type DeepPartial<T> = {
//   [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
// };

// const deepMerge = <T extends object>(origin: T, source: DeepPartial<T>): T => {};

class Fetcher {
  private baseURL: string | URL | undefined;
  private defaultRequestInit: FetcherRequestInit | undefined;

  constructor(config?: Config) {
    this.baseURL = config?.baseURL;
    this.defaultRequestInit = config?.defaultRequestInit;
  }

  async get<T>(endpoint: string): Promise<T> {
    try {
      const url = new URL(endpoint, this.baseURL);

      const res = await fetch(url, {
        ...this.defaultRequestInit,
        method: 'GET',
      });

      if (!res.ok) {
        throw new Error(`HTTP ERROR status: ${res.status}`);
      }

      const data: T = await res.json();

      return data;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
      return Promise.reject(error);
    }
  }
  async post<T>(endpoint: string, params: object): Promise<T> {
    try {
      const url = new URL(endpoint, this.baseURL);

      const res = await fetch(url, {
        ...this.defaultRequestInit,
        method: 'POST',
        body: JSON.stringify(params),
      });

      if (!res.ok) {
        throw new Error(`HTTP ERROR status: ${res.status}`);
      }

      const data: T = await res.json();

      return data;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
      return Promise.reject(error);
    }
  }
  async put<T>(endpoint: string, params: object): Promise<T> {
    try {
      const url = new URL(endpoint, this.baseURL);

      const res = await fetch(url, {
        ...this.defaultRequestInit,
        method: 'PUT',
        body: JSON.stringify(params),
      });

      if (!res.ok) {
        throw new Error(`HTTP ERROR status: ${res.status}`);
      }

      const data: T = await res.json();

      return data;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
      return Promise.reject(error);
    }
  }
  async patch<T>(endpoint: string, params: object): Promise<T> {
    try {
      const url = new URL(endpoint, this.baseURL);

      const res = await fetch(url, {
        ...this.defaultRequestInit,
        method: 'PATCH',
        body: JSON.stringify(params),
      });

      if (!res.ok) {
        throw new Error(`HTTP ERROR status: ${res.status}`);
      }

      const data: T = await res.json();

      return data;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
      return Promise.reject(error);
    }
  }
  async delete<T>(endpoint: string): Promise<T> {
    try {
      const url = new URL(endpoint, this.baseURL);

      const res = await fetch(url, {
        ...this.defaultRequestInit,
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error(`HTTP ERROR status: ${res.status}`);
      }

      const data: T = await res.json();

      return data;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
      return Promise.reject(error);
    }
  }
}

export const fetcher = new Fetcher({
  baseURL: 'http://localhost:9090',
  defaultRequestInit: { headers: { 'Content-Type': 'application/json' } },
});
