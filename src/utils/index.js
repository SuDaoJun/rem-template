import moment from 'moment'

// 当前时间格式化
export function currentDay() {
  return moment().format('YYYY-MM-DD HH:mm:ss')
}
// 缓存设置有效期
export const timeLocalStorage = {
  setItem: function (key, value, dayNum) {
    let data = { value: value, expirse: new Date().getTime() + dayNum * 1000 * 60 * 60 * 24 };
    localStorage.setItem(key, JSON.stringify(data));
  },
  getItem: function (key) {
    if (localStorage.getItem(key)) {
      let data = JSON.parse(localStorage.getItem(key));
      if (data !== null) {
        if (data.expirse != null && data.expirse < new Date().getTime()) {
          localStorage.removeItem(key);
        } else {
          return data.value;
        }
      }
    }
    return null;
  }
}