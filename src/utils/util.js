/**
 * 时间戳
 * @param {*} timestamp  时间戳
 */
const timestampToTime = (timestamp) => {
  let date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return Y + M + D + h + m + s
};
/**
 * 存储localStorage
 */
const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
const getStore = name => {
  if (!name) return null;  // 统一返回类型
  return window.localStorage.getItem(name);
};

/**
 * 删除localStorage
 */
const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}

/**
 * 设置cookie
 **/
function setCookie(name, value, day) {
  let date = new Date();
  date.setDate(date.getDate() + day);
  document.cookie = name + '=' + value + ';expires=' + date;
};

/**
 * 获取cookie
 **/
function escapeRegExp(string) {
  return string.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&'); // 转义特殊字符
}

function getCookie(name) {
  // Safely escape the user-provided cookie name
  const escapedName = encodeURIComponent(name);
  // Create a regular expression for matching the cookie name
  const reg = new RegExp('(^|;)\\s*' + escapedName + '=([^;]*)');
  let match = document.cookie.match(reg);
  return match ? decodeURIComponent(match[2]) : ''; // If found, return the cookie value
};


/**
 * 删除cookie
 **/
function delCookie(name) {
  setCookie(name, null, -1);
};

/**
 * 导出
 **/
export {
  timestampToTime, setStore, getStore, removeStore, setCookie, getCookie, delCookie
}
