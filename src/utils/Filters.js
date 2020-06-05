

//时间格式化
function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }
    return fmt;
  };
  function padLeftZero (str) {
    return ('00' + str).substr(str.length);
  };


//价格过滤
  function money(b) {
    if (typeof b === 'number') {
        return b.toFixed(2);
      }
      return '--';
  }

  //手机号****
  function phone1(phone) {
      phone=phone+''
   // if (typeof phone !== 'string') return '';
    return phone.substring(0, 3) + '****' + phone.substring(7, 11);
  }


  function formatDate1(originVal) {
    const dt = new Date(originVal)
    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')
    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  };
  

  

  
export default{
    formatDate,
    formatDate1,
    money,
    phone1,
}