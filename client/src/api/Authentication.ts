import { getCookie, setCookie } from 'typescript-cookie';

export const saveJWTinCookie = ({response}: {response: Response}) => {
  const jwt_token = response.headers.get('authorization');
  if (jwt_token) {
    console.log("saveJWTinCookie", jwt_token);
    setCookie('jwt_token', jwt_token, {
      expires: 7,
      path: '/',
      // httpOnly: true,
      secure: true,
      sameSite: 'strict'
    });
  }
  else {
    console.log('saveJWTinCookie - skipping')
  }
}

export const injectJWTFromCookies = (headers: Headers) => {
  const jwt = getCookie('jwt_token');
  if (!jwt) {
    console.warn('No jwt token');
  } else {
    console.log("injectJWTFromCookies", jwt)
    headers.set('Authorization', jwt);
  }
  return headers;
}
