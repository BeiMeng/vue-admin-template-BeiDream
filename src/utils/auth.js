import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const per = 'Admin-Permission'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setPermissions(permissions) {
  //return Cookies.set(per, permissions)
  localStorage.setItem(per,permissions);
}
export function getPermissions() {
  return localStorage.getItem(per);
}