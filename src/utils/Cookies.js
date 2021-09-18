import Cookies from 'js-cookie'

const TokenKey = 'token';
const UserKey = 'user';
const ProUrl = 'prourl';
export function getToken () {
  return Cookies.get(TokenKey);
}

export function setToken (token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken () {
  return Cookies.remove(TokenKey);
}

export function setUser (user) {
  return Cookies.set(UserKey, user);
}

export function getUser () {
  return Cookies.get(UserKey);
}

export function removeUser () {
  return Cookies.remove(UserKey);
}

export function setProUrl(url) {
  return Cookies.set(ProUrl, url);
}

export function getProUrl() {
  return Cookies.get(ProUrl);
}
