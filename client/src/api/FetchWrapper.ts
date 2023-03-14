import {injectJWTFromCookies, saveJWTinCookie} from "./Authentication";

export class FetchNotOkError extends Error {
  payload: object

  constructor(message: string, payload: object) {
    super(message)
    this.name = this.constructor.name
    this.payload = payload
  }
}

async function handleResponse(response: Response) {
  const json = await response.json()
  if (!response.ok) {
    throw new FetchNotOkError(response.statusText, json);
  }

  saveJWTinCookie({ response });

  return json;
}


interface RequestOptions {
  body?: object
  useJIT?: boolean
}

const defaultRequestOptions: RequestOptions = {
  useJIT: true
}

function request(method: string) {
  return (url: string, options = defaultRequestOptions) => {
    const userOptions = {
      ...defaultRequestOptions,
      ...options
    }
    const requestOptions = {
      method,
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      ...(userOptions.body && {body: JSON.stringify(userOptions.body)})
    };

    if (userOptions.useJIT) {
      injectJWTFromCookies(requestOptions.headers);
    }
    return fetch(url, requestOptions).then(handleResponse);
  }
}

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE')
}
