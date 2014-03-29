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

var hh = new butterfly.Model();
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
var mm = new butterfly.Model();
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

var ss = new butterfly.Model();
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
var collection = new butterfly.Collection(time);
collection.render();

// 定时器
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
