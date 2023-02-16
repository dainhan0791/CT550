// export const saveUserToLocalStorage = (user: object) => {
//   return window.localStorage.setItem('user', JSON.stringify(user));
// };
// export const getUserFromLocalStorage = () => {
//   return window.localStorage.getItem('user');
// };

export const saveIdTokenToLocalStorage = (idToken: string) => {
  return window.localStorage.setItem('idToken', idToken);
};

export const getIdTokenFromLocalStorage = () => {
  return window.localStorage.getItem('idToken') || null;
};
export const removeIdTokenFromLocalStorage = () => {
  return window.localStorage.removeItem('idToken');
};
