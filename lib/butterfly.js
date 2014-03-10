/*!
 * DataV兼容定义
 */
!(function (name, definition) {
  if (typeof define === 'function') { // Module
    define(definition);
  } else { // Assign to common namespaces or simply the global object (window)
    this[name] = definition(function (id) { return this[id];});
  }
})('butterfly', function (require) {
  /**
   * butterfly全局命名空间对象定义
   */
  var butterfly = function () {};

  /**
   * 版本号
   */
  butterfly.version = "0.1.0";

  /**
   * 合并对象的属性到目标对象上
   */
  butterfly.merge = function (dist, source) {
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        dist[key] = source[key];
      }
    }
  };

  /**
   * 继承
   * @param {Function} parent 父类
   * @param {Object} properties 新属性
   * @return {Function} 新的子类
   */
  butterfly.extend = function (parent, properties) {
    if (typeof parent !== "function") {
      properties = parent;
      parent = function () {};
    }

    properties = properties || {};
    var sub = function () {
      // Call the parent constructor.
      parent.apply(this, arguments);
      // Only call initialize in self constructor.
      if (this.constructor === parent && this.initialize) {
        this.initialize.apply(this, arguments);
      }
    };
    sub.prototype = new parent();
    sub.prototype.constructor = parent;
    butterfly.merge(sub.prototype, properties);
    return sub;
  };

  return butterfly;
});
