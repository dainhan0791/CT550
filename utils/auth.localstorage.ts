import { IAuth } from './../interfaces/account.interface';

export const saveAccessTokenToLocalStorage = ({ accessToken }: IAuth) => {
  if (accessToken) {
    window.localStorage.setItem('accessToken', JSON.stringify(accessToken));
  }
};

export const getAccessTokenFromLocalStorage = () => {
  return window.localStorage.getItem('accessToken') || null;
};

export const removeAccessTokenFromLocalStorage = () => {
  window.localStorage.removeItem('accessToken');
};
