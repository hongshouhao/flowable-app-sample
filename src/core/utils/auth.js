import Cookies from "js-cookie";

const TokenKey = "Admin-Token";
const UserKey = "User-Key";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getUserName() {
  return Cookies.get(UserKey);
}

export function setUserName(name) {
  return Cookies.set(UserKey, name);
}

export function removeUserName() {
  return Cookies.remove(UserKey);
}
