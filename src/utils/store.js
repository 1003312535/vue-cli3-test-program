/**
 * 配置本地存储工具
 */
import { validatenull } from '@/utils/validate';
import website from '@/config/website';

const prefixName = website.prefixKey + '-';
/**
 * 存储localStorage
 * @param params{Object}
 *  dataType: 内容类型
 *  content: 内容
 *  type:{} 存储方式:存储到session 还是 local中
 *  datetime: 存储时间戳
 * @example setStore({
        name: 'isLock',
        content: state.isLock,
        type: 'session'
      })
 */
export const setStore = (params = {}) => {
  let { name, content, type } = params;
  name = prefixName + name;
  let obj = {
    dataType: typeof content,
    content: content,
    type: type,
    datetime: new Date().getTime(),
  };
  if (type) window.sessionStorage.setItem(name, JSON.stringify(obj));
  else window.localStorage.setItem(name, JSON.stringify(obj));
};
/**
 * 获取localStorage
 * @param params{Object}
 * @return {}
 */

export const getStore = (params = {}) => {
  let { name, debug } = params;
  name = prefixName + name;
  let obj = {},
    content;
  obj = window.sessionStorage.getItem(name);
  if (validatenull(obj)) obj = window.localStorage.getItem(name);
  if (validatenull(obj)) return;
  try {
    obj = JSON.parse(obj);
  } catch {
    return obj;
  }
  if (debug) {
    return obj;
  }
  if (obj.dataType == 'string') {
    content = obj.content;
  } else if (obj.dataType == 'number') {
    content = Number(obj.content);
  } else if (obj.dataType == 'boolean') {
    content = eval(obj.content);
  } else if (obj.dataType == 'object') {
    content = obj.content;
  }
  return content;
};
/**
 * 删除localStorage
 */
export const removeStore = (params = {}) => {
  let { name, type } = params;
  name = prefixName + name;
  if (type) {
    window.sessionStorage.removeItem(name);
  } else {
    window.localStorage.removeItem(name);
  }
};

/**
 * 获取全部localStorage
 */
export const getAllStore = (params = {}) => {
  let list = [];
  let { type } = params;
  if (type) {
    for (let i = 0; i <= window.sessionStorage.length; i++) {
      list.push({
        name: window.sessionStorage.key(i),
        content: getStore({
          name: window.sessionStorage.key(i),
          type: 'session',
        }),
      });
    }
  } else {
    for (let i = 0; i <= window.localStorage.length; i++) {
      list.push({
        name: window.localStorage.key(i),
        content: getStore({
          name: window.localStorage.key(i),
        }),
      });
    }
  }
  return list;
};

/**
 * 清空全部localStorage
 */
export const clearStore = (params = {}) => {
  let { type } = params;
  if (type) {
    window.sessionStorage.clear();
  } else {
    window.localStorage.clear();
  }
};
