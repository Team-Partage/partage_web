type Config = {
  baseURL?: string;
  defaultRequestInit?: RequestInit;
};

// type FetcherRequestInit = Omit<RequestInit, 'method'>;

// type DeepPartial<T> = {
//   [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
// };

// const deepMerge = <T extends object>(origin: T, source: DeepPartial<T>): T => {};

class Fetcher {
  private baseURL: string | URL | undefined;
  private defaultRequestInit: RequestInit | undefined;
  constructor(config?: Config) {
    this.baseURL = config?.baseURL;
    this.defaultRequestInit = config?.defaultRequestInit;
  }

  // async get<T>(endpoint: string, options?: FetcherRequestInit): Promise<T> {
  //   try {
  //     const url = new URL(endpoint, this.baseURL);

  //     const res = await fetch(url, {
  //       method: 'GET',
  //     });

  //     if (!res.ok) {
  //       throw new Error(`HTTP ERROR status: ${res.status}`);
  //     }

  //     const data: T = await res.json();

  //     return data;
  //   } catch (error) {
  //     if (process.env.NODE_ENV === 'development') {
  //       console.error(error);
  //     }
  //     return Promise.reject(error);
  //   }
  // }
  // async post<T>(endpoint: string, params: object): Promise<T> {}
  // async put<T>(endpoint: string, params: object): Promise<T> {}
  // async patch<T>(endpoint: string): Promise<T> {}
  // async delete<T>(endpoint: string): Promise<T> {}
}

export const fetcher = new Fetcher();
