var util = require('util');
var EventEmitter = require('events').EventEmitter;

/**
 * 所有Chart的源定义
 */
var Chart = function () {
  EventEmitter.call(this);
  // 默认设置
  this.defaults = {};
  // 纬度
  this.dimension = {};
  // 格式化
  this.formatter = {};
};

util.inherits(Chart, EventEmitter);

/**
 * 优先返回用户传入的值或者方法，如果不存在，取实例方法返回
 * @param {String} key 方法或值的名称
 * @param {Mix} 值或方法
 */
Chart.prototype.getFormatter = function (key) {
  var noop = function (input) {
    // 转为字符串
    return '' + input;
  };
  return this.defaults[key] || this.formatter[key] || noop;
};

/**
 * 设置自定义选项
 * Examples:
 * Set width 500px, height 600px;
 * ```
 * {"width": 500, "height": 600}
 * ```
 * @param {Object} options 自定义选项对象
 * @return {Object} 覆盖后的图表选项对象
 */
Chart.prototype.setOptions = function (options) {
  util._extend(this.defaults, options);
};

/**
 * 数据源映射
 */
Chart.prototype.setMap = function (map) {
  util._extend(this.dimension, map);
};

Chart.prototype.addFloatTag = function () {
  var container = this.node;
  var floatTag = document.createElement('div');
  util._extend(floatTag.style, {
    "border": "1px solid rgba(0, 0, 0, 0.8)",
    "background-color": "rgba(0, 0, 0, 0.75)",
    "color": "white",
    "border-radius": "2px",
    "padding": "12px 8px",
    "font-size": "12px",
    "box-shadow": "3px 3px 6px 0px rgba(0,0,0,0.58)",
    "z-index": 1000,
    "text-align": "center",
    "visibility": "hidden",
    "position": "absolute"
  });
  container.appendChild(floatTag);

  this.position = {x: 20, y: 20};
  var that = this;
  var changeLoc = function (x, y) {
    var floatTagWidth = floatTag.outerWidth;
    var floatTagHeight = floatTag.outerHeight;

    if (floatTagWidth + x + 2 * that.position.x <=  container.innerWidth) {
      x += that.position.x;
    } else {
      x = x - floatTagWidth - that.position.x;
    }
    if (y >= floatTagHeight + that.position.y) {
        y = y - that.position.y - floatTagHeight;
    } else {
        y += that.position.y;
    }
    floatTag.style.left = x;
    floatTag.style.top = y;
  };

  var mousemove = function (e) {
    if (!(e.pageX && e.pageY)) { return false;}
    var x = e.pageX - container.offsetLeft,
      y = e.pageY - container.offsetTop;

    changeLoc(x, y);
  };
  container.addEventListener('mousemove', mousemove, false);
  container.addEventListener('tap', mousemove, false);

  this.floatTag = floatTag;
};

Chart.prototype.moveFloatTag = function (x, y) {
  this.position.x = x;
  this.position.y = y;
};

Chart.prototype.setFloatTag = function (content) {
  this.floatTag.innerHTML = content;
};

module.exports = Chart;
