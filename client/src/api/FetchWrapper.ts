import {injectJWTFromCookies, saveJWTinCookie} from "./Authentication";


async function handleResponse(response: Response) {
  const json = await response.json()
  console.log('handleResponse json', json)
  console.log('handleResponse response.statusText', response.statusText)
  if (!response.ok) {
    const message = 'error' in json ? json.error : JSON.stringify(json)
    return Promise.reject(message || response.statusText);
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
