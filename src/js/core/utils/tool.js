/**
 *  描述：tool js
 */

/**
 * 设置cookie
 */
const setCookie = (name, value, expires) => {
    var Days = expires || 7;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
};

/**
 * 获取cookie
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
const getCookie = (name) => {
	if (document.cookie.length > 0) {
	  	let start = document.cookie.indexOf(name + '=');
	  	if (start !== -1) {
		    start = start + name.length + 1;
		    let end = document.cookie.indexOf(';', start);
		    if (end === -1) {
		    	end = document.cookie.length;
		    }
		    return unescape(document.cookie.substring(start, end));
	    }
	}
	return '';
};

/**
 * 存储localStorage/sessionStorage
 */
const setStore = (name, content, deep) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	if (deep) {
		window.localStorage.setItem(name, content);
	} else {
		window.sessionStorage.setItem(name, content);
	}
};

/**
 * 获取localStorage/sessionStorage
 */
const getStore = (name, deep) => {
	if (!name) return;
	if (deep) {
		return window.localStorage.getItem(name);
	} else {
		return window.sessionStorage.getItem(name);
	}
};

/**
 * 删除localStorage/sessionStorage
 */
const removeStore = (name, deep) => {
	if (!name) return;
	if (deep) {
		window.localStorage.removeItem(name);
	} else {
		window.sessionStorage.removeItem(name);
	}
};

/**
 * 格式化日期
 * @param  {[type]} fmt [description]
 * @return {[type]}     [description]
 */
const DateFormat = (str, fmt) => {
    let o = {
        'M+': str.getMonth() + 1,
        'd+': str.getDate(),
        'h+': str.getHours(),
        'm+': str.getMinutes(),
        's+': str.getSeconds(),
        'q+': Math.floor((str.getMonth() + 3) / 3),
        'S': str.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (str.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (let k in o) {
    	if (new RegExp('(' + k + ')').test(fmt)) {
    		fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    	}
    }
    return fmt;
};

// 函数节流
const throttle = (idea, action) => {
    let last = 0;
    return function () {
        let now = +new Date();
        if (now - last > idea) {
            action && action.apply(this, arguments);
            last = now;
        }
    };
};

// 函数防抖
const debounce = (idea, action) => {
    let timer = null;
    let that = this;
    return function () {
        let args = arguments;
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(function () {
            action && action.apply(that, args);
        }, idea);
    };
};

// extend
const extend = (target, source) => {
    for (let attr in source) {
        target[attr] = source[attr];
    }
    return target;
};

// deepCopy
const deepCopy = (obj, cache = []) => {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    const hit = cache.filter(c => c.original === obj)[0];
    if (hit) {
        return hit.copy;
    }
    const copy = Array.isArray(obj)
                    ? []
                    : {};
    cache.push({
        original: obj,
        copy
    });

    Object.keys(obj).forEach(key => {
        copy[key] = deepCopy(obj[key], cache);
    });
    return copy;
};

const checkVIN = (sVIN) => {
  let Arr = [];
  let Brr = [];
  Arr['A'] = 1;
  Arr['B'] = 2;
  Arr['C'] = 3;
  Arr['D'] = 4;
  Arr['E'] = 5;
  Arr['F'] = 6;
  Arr['G'] = 7;
  Arr['H'] = 8;
  Arr['J'] = 1;
  Arr['K'] = 2;
  Arr['L'] = 3;
  Arr['M'] = 4;
  Arr['N'] = 5;
  Arr['P'] = 7;
  Arr['R'] = 9;
  Arr['S'] = 2;
  Arr['T'] = 3;
  Arr['U'] = 4;
  Arr['V'] = 5;
  Arr['W'] = 6;
  Arr['X'] = 7;
  Arr['Y'] = 8;
  Arr['Z'] = 9;
  Arr['1'] = 1;
  Arr['2'] = 2;
  Arr['3'] = 3;
  Arr['4'] = 4;
  Arr['5'] = 5;
  Arr['6'] = 6;
  Arr['7'] = 7;
  Arr['8'] = 8;
  Arr['9'] = 9;
  Arr['0'] = 0;
  Brr[1] = 8;
  Brr[2] = 7;
  Brr[3] = 6;
  Brr[4] = 5;
  Brr[5] = 4;
  Brr[6] = 3;
  Brr[7] = 2;
  Brr[8] = 10;
  Brr[9] = 0;
  Brr[10] = 9;
  Brr[11] = 8;
  Brr[12] = 7;
  Brr[13] = 6;
  Brr[14] = 5;
  Brr[15] = 4;
  Brr[16] = 3;
  Brr[17] = 2;
  var bl = false;
  if (sVIN.length === 17) {
    return true; // 上线时 这里删掉
  }
  return bl;
};

/**
 * 是否存在数组里面
 * @param array
 * @param value
 */
const isInArray = (array, value) => {
  let ret = array.find((item) => {
    return item.value === value;
  });
  if (ret) {
    return ret.value;
  }
  return '';
};

/**
 * 格式化数组
 * @param array
 * @param value
 */
const formatList = (array) => {
  let newArray = [];
  array.forEach(item => {
    newArray.push({value: item.id, label: item.name});
  });
  return newArray;
};

// 抛出
export default {
    setCookie,
    getCookie,
    setStore,
    getStore,
    removeStore,
    DateFormat,
    throttle,
    debounce,
    extend,
    deepCopy,
    checkVIN,
    isInArray,
    formatList
};
