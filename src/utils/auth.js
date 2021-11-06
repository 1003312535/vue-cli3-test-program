import Cookies from 'js-cookie';
const TokenKey = 'saber-access-token';
const RefreshTokenKey = 'saber-refresh-token';
/**
 * 获取token
 * @returns token
 */
export function getToken() {
  return Cookies.get(TokenKey);
}
/**
 * 设置token
 * @returns token
 */
export function setToken(token) {
  return Cookies.set(TokenKey, token);
}
/**
 * 获取刷新得token
 * @returns token
 */
export function getRefreshToken() {
  return Cookies.get(RefreshTokenKey);
}
/**
 * 设置刷新得token
 * @returns token
 */
export function setRefreshToken(token) {
  return Cookies.set(RefreshTokenKey, token);
}
/**
 * 移除token
 * @returns token
 */
export function removeToken() {
  return Cookies.remove(TokenKey);
}
/**
 * 移除刷新得token
 * @returns token
 */
export function removeRefreshToken() {
  return Cookies.remove(RefreshTokenKey);
}
