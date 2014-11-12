var Model = function (value, index) {
  if (typeof value !== 'undefined') {
    this.value = value;
  }
  this.index = index;
};

// 实现你自己的render方法
Model.prototype.render = function () {
  throw new Error('please implement your render method!');
};

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

module.exports = Model;
