/**
 *  描述：Global directive js
 */
import tool from '@/js/core/utils/tool';

const install = Vue => {
    // 自动高度
	Vue.directive('height', {
		bind: (el, {value}) => {
			let options = {
				value: 0,
				props: 'height'
			};

			function toUpCase (str) {
				let reg = /-(\w)/g;
				return str.replace(reg, function (ret, res) {
					return res.toUpperCase();
				});
			}

			if (typeof value === 'number') {
				options.value = value;
			} else {
				for (let i in value) {
					if (i !== undefined) {
						options[i] = value[i];
					}
				}
			}

			if (options.props.indexOf('-') !== -1) {
				options.props = toUpCase(options.props);
			}

			Vue.nextTick(() => {
				// 防止闪烁
				setTimeout(() => {
					let disH = document.documentElement.clientHeight || document.body.clientHeight;
					el.style[options.props] = disH - options.value + 'px';
				}, 0);
				el.__vueClickOutside__ = tool.debounce(500, (ev) => {
					let disH = document.documentElement.clientHeight || document.body.clientHeight;
					el.style[options.props] = disH - options.value + 'px';
				});
				window.addEventListener('resize', el.__vueClickOutside__, false);
			});
		},
		unbind: (el) => {
			window.removeEventListener('resize', el.__vueClickOutside__, false);
			delete el.__vueClickOutside__;
		}
	});

	// 后退
	Vue.directive('goBack', {
		bind: (el, binding) => {
			el.__vueClickOutside__ = () => {
				window.history.back(-1);
			};
			el.addEventListener('click', el.__vueClickOutside__, false);
		},
		unbind: (el) => {
			el.removeEventListener('click', el.__vueClickOutside__, false);
			delete el.__vueClickOutside__;
		}
	});

	// 气泡动画
	Vue.directive('bubble', {
		inserted (el, {value}) {
			let cacheData = '';        // 缓冲数据 兼容ie
			value = value || {};
			let setting = {
				duration: 3000,
				end: 100,
				top: 0,
				color: '#757575'
			};
			if (typeof value === 'number') {
				setting.duration = value;
			} else {
				for (let i in value) {
					setting[i] = value[i];
				}
			}
			// 创建元素
			function _createElement (val) {
				if (!val) return;
				let oSpan = document.createElement('span');
				oSpan.innerHTML = val;
				oSpan.style.position = 'absolute';
				oSpan.style.color = setting.color;
				return oSpan;
			};
			// 匀速运动
			function linear (t, b, c, d) {
				return c * t / d + b;
			}
			// 获取随机
			function getRandom (min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}
			// 绑定动画
			function _bindAnimate (el, start, end, cb, duration) {
				start = start || 0;
				let startTime = 0;
				let val;
				const step = () => {
					startTime += 1000 / 60;
					val = linear(startTime, start, end - start, duration);
					if (startTime >= duration) {
						cb.call(el, end, true);
					} else {
						cb.call(el, val, false);
						window.requestAnimationFrame(step);
					}
				};
				step();
			};
			let type = el.type;
			let oParent = el.parentNode;
			oParent.style.position = 'relative';
			// 移除元素
			function _removeElement (ele) {
				oParent.removeChild(ele);
			}
			// 获取最后一个值 兼容ie
			function _getData (ev) {
				let data = '';
				let ele = ev.target || ev.srcElement;
				// if (ev.data) {
				// 	data = ev.data;
				// } else {
					if (ele.value && ele.value.length > cacheData.length) {
						data = ele.value.slice(ele.value.length - 1);
					} else {
						data = '';
					}
				// }
				cacheData = ele.value;
				return data;
			}
			// 绑定事件
			el.__vueInputChange__ = (ev) => {
				try {
					let data = _getData(ev);
					if (!data) return false;
					if (type === 'password') {
						data = '*';
					}
					let oEle = _createElement(data);
					let oLeft = getRandom(1, el.offsetWidth - 1);
					// 防止中文输入法下报错
					if (!oEle) return false;
					oParent.appendChild(oEle);
					oEle.style.top = setting.top + 'px';
					oEle.style.left = oLeft + 'px';
					_bindAnimate(oEle, -setting.top, setting.end, function (value, status) {
						this.style.transform = `translate(0, -${value}px)`;
						this.style.opacity = (setting.end - value) / setting.end;
						if (status) {
							_removeElement(this);
						}
					}, setting.duration);
				} catch (e) {
					throw new Error(e);
				}
			};
			el.addEventListener('input', el.__vueInputChange__);
		},
		unbind (el) {
			el.removeEventListener('input', el.__vueInputChange__);
			delete el.__vueInputChange__;
		}
	});

	// input监听
	Vue.directive('input', {
		bind: (el, {value, modifiers}) => {
			let time = 1000;
			function toNumber (val) {
				let n = parseFloat(val);
				return isNaN(n) ? val : n;
			}
			for (let i in modifiers) {
				let ret = toNumber(i);
				if (typeof ret === 'number') {
					time = ret;
					break;
				}
			}
			let debounce = el.__vueClickOutside__ = tool.debounce(time, value);
			el.addEventListener('input', debounce);
		},
		unbind: (el) => {
			el.removeEventListener('input', el.__vueClickOutside__);
			delete el.__vueClickOutside__;
		}
	});

	// scrollbar
	// Vue.directive('scroll', {
	// 	bind: (el, binding) => {
	// 		// 创建元素
	// 		function createElement () {
	// 			let oDiv = document.createElement('div');
	// 			oDiv.className = 'hy_scroll_box';
	// 		}
	// 		let tpl = '<div class="hy_scroll_box">' +
	// 						'<div class="hy_scroll_bar"></div>' +
	// 					'</div>';
	// 		let param = binding.modifiers;
	// 		el.innerHTML += tpl;
	// 		// if (param.x) {

	// 		// } else if (param.y) {

	// 		// }
	// 	}
	// });
};

export default install;
