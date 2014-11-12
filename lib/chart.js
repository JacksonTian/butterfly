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

module.exports = Chart;
