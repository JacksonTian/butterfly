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

  var Model = function (value, index) {
    if (typeof value !== 'undefined') {
      this.value = value;
    }
    this.index = index;
  };

  // 实现你自己的render方法
  // Model.prototype.render = function () {};

  Model.prototype.change = function (value) {
    var called = this.hasOwnProperty('value');
    this.value = value;
    // 如果没有设置过value，调用一次render
    if (!called) {
      this.render();
    } else {
      if (this.update) {
        this.update();
      }
    }
  };

  var Collection = function (data, render, update) {
    this.collection = [];
    this.commonRender = render;
    this.commonUpdate = update;
    for (var i = 0; i < data.length; i++) {
      this.add(data[i]);
    }
  };

  Collection.prototype.render = function () {
    if (this.draw) {
      this.draw();
    }
    for (var i = 0; i < this.collection.length; i++) {
      var model = this.collection[i];
      // 设置值后才渲染
      if (model.hasOwnProperty('value')) {
        model.render();
      }
    }
  };

  Collection.prototype.add = function (item) {
    var index = this.collection.length;
    var model;
    if (item instanceof Model) {
      model = item;
      model.index = index;
    } else {
      model = new Model(item, index);
    }

    // 绑定公共方法，不覆盖旧有方法
    if (!model.render) {
      model.render = this.commonRender;
    }

    if (!model.update) {
      model.update = this.commonUpdate;
    }

    this.collection.push(model);
  };
  Collection.prototype.change = function () {
    if (this.update) {
      this.update();
    }
  };

  Collection.prototype.get = function (index) {
    return this.collection[index];
  };

  butterfly.Model = Model;
  butterfly.Collection = Collection;

  return butterfly;
});
