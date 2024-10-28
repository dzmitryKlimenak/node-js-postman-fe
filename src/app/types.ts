export interface ApiRequestOptions {
  headers?: { [header: string]: string | string[] };
  body?: any;
  params?: { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> };
  withCredentials?: boolean;
  reportProgress?: boolean;
}

export interface ApiRequest {
  method: 'GET' | 'POST';  // The two supported HTTP methods
  url: string;             // The URL of the request
  options?: ApiRequestOptions;
}

export interface ApiResponse {
  message: string;         // Response message (for saving)
  data?: ApiRequest[];      // Array of saved API requests (for loading)
}
