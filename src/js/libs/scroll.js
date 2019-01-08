/**
 * 描述：scroll.js
 */
	var _default = {
		axis: 'xy'
	};

	// 简易复制
	function extend () {
		var target = arguments[0];
		var args = [].slice.call(arguments, 1);
		args.forEach(function (item) {
			for (var i in item) {
				if (i !== undefined) {
					target[i] = item[i];
				}
			}
		});
		return target;
	}

	// 设置样式
	function setStyle (target, opt) {
		let cssText = ';';
		for (var i in opt) {
			if (i !== undefined) {
				cssText += i + ': ' + opt[i] + '; ';
			}
		}
		target.style.cssText = cssText;
	};

	function addEvent (obj, type, handler) {
		if (obj.addEventListener) {
            // 兼容火狐
            if (type === 'mousewheel' && document.mozFullScreen !== undefined) {
                type = 'DOMMouseScroll';
            }
            obj.addEventListener(type, handler, false);
        } else if (obj.attachEvent) {
            obj.attachEvent('on' + type, handler);
        } else {
            obj['on' + type] = handler;
        }
	}

	// 函数防抖
	function debounce (idea, action) {
		var timer = null;
		return function () {
			var that = this;
			var args = arguments;
			if (timer) {
				clearTimeout(timer);
				timer = null;
			}
			timer = setTimeout(function () {
				action && action.apply(that, args);
			}, idea);
		};
	}

	function removeEvent (obj, type, handler) {
		if (obj.removeEventListener) {
            // 兼容火狐
            if (type === 'mousewheel' && document.mozFullScreen !== undefined) {
                type = 'DOMMouseScroll';
            }
            obj.removeEventListener(type, handler, false);
        } else if (obj.detachEvent) {
            obj.detachEvent('on' + type, handler);
        } else {
            obj['on' + type] = null;
        }
	}

	// 获取浏览器滚动的距离
	// function getScroll () {
	// 	var res = {x: 0, y: 0};
	// 	res.x = document.documentElement.scrollLeft || document.body.scrollLeft;
	// 	res.y = document.documentElement.scrollTop || document.body.scrollTop;
	// 	return res;
	// }

	// 自定义滚动条
	function HScroll (el, config) {
		this.el = el;
		if (config) {
			this.setting = extend({}, _default, config);
		} else {
			this.setting = extend({}, _default);
		}
		this.speed = 0;
		this.setting.children = this.el.children[0];
		this.initData();
	}
	// 初始化
	HScroll.prototype.initData = function () {
		var children = this.setting.children;
		setStyle(this.el, {
			position: 'relative',
			overflow: 'hidden'
		});
		setStyle(children, {
			position: 'absolute'
		});
		this.refresh();
	};
	// 刷新
	HScroll.prototype.refresh = function () {
		var children = this.setting.children;
		var pHeight = this.el.offsetHeight;
		var iHeight = children.offsetHeight;
		if (iHeight > pHeight) {
			this._createElement();
			this._drag();
			this._mouseWheel();
			this._fire();
			this._resize();
		}
	};
	// 创建元素
	HScroll.prototype._createElement = function () {
		if (!this.iScrollBox_y) {
			this.iScrollBox_y = document.createElement('div');
			this.iScrollBox_y.className = 'iScrollBox_y';
			this.iScrollBar_y = document.createElement('iScrollBar_y');
			this.iScrollBar_y.className = 'iScrollBar_y';
			this.iScrollBox_y.appendChild(this.iScrollBar_y);
			this.el.appendChild(this.iScrollBox_y);
		}
	};

	// 拖拽
	HScroll.prototype._drag = function () {
		var that = this;
		this.iScrollBar_y.style.height = (this.el.offsetHeight / this.setting.children.offsetHeight) * this.iScrollBox_y.offsetHeight + 'px';
		this.iScrollBar_y.onmousedown = function (ev) {
			// var disx;
			var disy;
			var _this = null;
			ev = ev || window.event;
			// disx = ev.clientX - this.offsetLeft;
			disy = ev.clientY - this.offsetTop;
			if (this.setCapture) {
				_this = this;
				this.setCapture();
			} else {
				_this = document;
			}
			_this.onmousemove = function (ev) {
				ev = ev || window.event;
				// var l = ev.clientX - disx;
				var t = ev.clientY - disy;
				var children = that.setting.children;
				if (t < 0) {
					t = 0;
				} else if (t > that.iScrollBox_y.offsetHeight - that.iScrollBar_y.offsetHeight) {
					t = that.iScrollBox_y.offsetHeight - that.iScrollBar_y.offsetHeight;
				}
				// oBar.style.left = l + 'px';
				that.iScrollBar_y.style.top = t + 'px';
				var iScale = (t / (that.iScrollBox_y.offsetHeight - that.iScrollBar_y.offsetHeight)) * (children.offsetHeight - that.iScrollBox_y.offsetHeight);
				that.speed = -iScale;
				children.style.top = -iScale + 'px';
			};
			_this.onmouseup = function () {
				this.onmouseup = null;
				this.onmousemove = null;
				if (this.releaseCapture) {
		            this.releaseCapture();
		        }
			};
			return false;
		};
	};

	HScroll.prototype._mouseWheel = function () {
		addEvent(this.el, 'mousewheel', _fireEvent.mousewheel.bind(this));
	};

	HScroll.prototype._resize = function () {
		addEvent(window, 'resize', _fireEvent.resize.bind(this));
	};

	// mouseenter, mouseleave
	HScroll.prototype._fire = function () {
		addEvent(this.el, 'mouseenter', _fireEvent.mouseenter.bind(this));
		addEvent(this.el, 'mouseleave', _fireEvent.mouseleave.bind(this));
	};

	// 卸载事件
	HScroll.prototype.destroy = function () {
		removeEvent(this.el, 'mouseenter', _fireEvent.mouseenter.bind(this));
		removeEvent(this.el, 'mousewheel', _fireEvent.mousewheel.bind(this));
		removeEvent(this.el, 'mouseleave', _fireEvent.mouseleave.bind(this));
		removeEvent(window, 'resize', _fireEvent.resize.bind(this));
		if (this.iScrollBox_y) {
			this.el.removeChild(this.iScrollBox_y);
			delete this.iScrollBox_y;
		}
	};

	// 事件
	var _fireEvent = {
		mousewheel: function (ev) {
			var speed = this.speed;
			ev.delta = (ev.wheelDelta)
						? ev.wheelDelta / 120
						: -(ev.detail || 0) / 3;
			speed += ev.delta * 50;
			var children = this.setting.children;
			if (speed > 0) {
				speed = 0;
			} else if (speed < (this.iScrollBox_y.offsetHeight - children.offsetHeight)) {
				speed = this.iScrollBox_y.offsetHeight - children.offsetHeight;
			}
			this.speed = speed; // 保证统一
			children.style.top = speed + 'px';
			var iScale = (speed / (children.offsetHeight - this.iScrollBox_y.offsetHeight)) * (this.iScrollBox_y.offsetHeight - this.iScrollBar_y.offsetHeight);
			this.iScrollBar_y.style.top = -iScale + 'px';
		},
		mouseenter: function () {
			if (this.iScrollBox_y) {
				this.iScrollBox_y.classList.add('active');
			}
		},
		mouseleave: function () {
			if (this.iScrollBox_y) {
				this.iScrollBox_y.classList.remove('active');
			}
		},
		resize: debounce(1000, function () {
			this.refresh();
		})
	};

	export default HScroll;
