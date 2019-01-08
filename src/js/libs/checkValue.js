/**
 * 描述：验证模式基于element-ui
 */
const options = {
	number: /\d{1,10}/,
	string: /[\w+-]/,
	phone: /^1[34578]\d{9}$/,
	mima: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
  chinese: /^[\u4e00-\u9fa5]+$/,                                	// 匹配中文
  price: /^[1-9]\d*$/,
  cardNo: /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/    	// 匹配18为身份证号码
};

// 是否未定义
const isUndef = (v) => {
	return v === undefined || v === null;
};

// 是否为空
const isEmpty = (v) => {
	return isUndef(v) || v === '';
};

// 导出模式
export const handles = (res, msg, config) => {
  config = config || {};
  let delay = config.delay || 1000;
  let timer = null;
  return (rule, value, callback) => {
    let remote = rule.remote || false;
    if (isEmpty(value)) {
      callback(new Error(`请输入${msg}`));
    } else {
      if (timer) {
        clearTimeout(timer);
        timer = null;          // 提高效率
      }
      if (remote) {
        if (!config.service) throw new Error('参数有问题');
        timer = setTimeout(async () => {
          try {
            if (!options[res].test(value)) {
              if (res === 'mima') {
                callback(new Error(`${msg}为数字字母组合，至少6位`));
              } else {
                callback(new Error(`${msg}格式不正确`));
              }
            } else {
              let id = config.id || '';
              let param = {
                [config.props]: value,
                id: id
              };
              let result = await config.service(param);
              if (result.result) {
                callback();
              }
            }
          } catch (e) {
            callback(`${msg}重复`);
          }
        }, delay);
      } else {
        timer = setTimeout(() => {
          if (!options[res].test(value)) {
            if (res === 'mima') {
              callback(new Error(`${msg}为字母数字组合，至少6位`));
            } else {
              callback(new Error(`${msg}格式不正确`));
            }
          } else {
            callback();
          }
        }, delay);
      }
    }
  };
};

// 导出模式(允许为空)
export const allowNull = (res, msg, delay) => {
  delay = delay || 1000;
  let timer = null;
  return (rule, value, callback) => {
    if (isEmpty(value)) {
      callback();
    } else {
      if (timer) {
        clearTimeout(timer);
        timer = null;          // 提高效率
      }
      timer = setTimeout(() => {
        if (!options[res].test(value)) {
          callback(new Error(msg + '格式不正确'));
        } else {
          callback();
        }
      }, delay);
    }
  };
};
