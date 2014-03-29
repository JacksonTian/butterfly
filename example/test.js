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

Collection.prototype.get = function (index) {
  return this.collection[index];
};

// Creates canvas 320 × 200 at 10, 50
var paper = new Raphael("paper", 300, 300); // paper, 300, 300
// var data = [10, 20, 22, 43];
// var collection = new Collection(data, function () {
//   var i = this.index;
//   this.element = paper.circle((i + 1) * 50, 50, this.value);
// }, function () {
//   this.element.attr({r: this.value});
// });
// collection.render();
// // Creates circle at x = 50, y = 40, with radius 10
// setInterval(function () {
//   collection.get(2).change(Math.round(Math.random() * 100));
// }, 1000);

var hh = new Model();
hh.render = function () {
  var value = this.value;
  this.element = paper.rect(98, 60, 5, 40);
  this.element.toBack();
  this.element.transform('r' + 360 / 12 * value + ', 100, 100');
};
hh.update = function () {
  var value = this.value;
  this.element.transform('r' + 360 / 12 * value + ', 100, 100');
};
var mm = new Model();
mm.render = function () {
  var value = this.value;
  this.element = paper.rect(99, 50, 3, 50);
  this.element.toBack();
  this.element.transform('r' + 360 / 60 * value + ', 100, 100');
};
mm.update = function () {
  var value = this.value;
  this.element.transform('r' + 360 / 60 * value + ', 100, 100');
};

var ss = new Model();
ss.render = function () {
  var value = this.value;
  this.element = paper.rect(100, 40, 1, 60).attr('stroke', 'red');
  this.element.toFront();
  this.element.transform('r' + 360 / 60 * value + ', 100, 100');
};
ss.update = function () {
  var value = this.value;
  this.element.transform('r' + 360 / 60 * value + ', 100, 100');
};

var time = [hh, mm, ss];

paper.circle(100, 100, 95);
for (var i = 0; i < 12; i++) {
  paper.text(100, 20, (i + 1)).transform('r' + 360 / 12 * (i + 1) + ', 100, 100');
}
paper.circle(100, 100, 5).attr('fill', 'black');
paper.text(100, 120, 'love lina');
var collection = new Collection(time);
collection.render();
setInterval(function () {
  var now = new Date();
  var second = now.getSeconds();
  if (second !== ss.value) {
    ss.change(second);
  }
  var hour = now.getHours();
  if (hour !== hh.value) {
    hh.change(hour);
  }
  var minute = now.getMinutes();
  if (minute !== mm.value) {
    mm.change(minute);
  }
}, 1000);
