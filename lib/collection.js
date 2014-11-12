var Model = require('./model');

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

module.exports = Collection;
