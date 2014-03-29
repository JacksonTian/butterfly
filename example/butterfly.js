var run = function (fn) {
  var source = fn.toString();
  var lines = source.split(/\n/);
  var cache = {};
  lines.forEach(function (line, i) {
    line.replace(/'<%([^=]+)=([^%]*)%>'/g, function (match, vari) {
      console.log(arguments);
      cache[vari] = i;
    });
  });
  console.log(cache);
  fn();
};

var vars = {};
var nodes = {};
var save = function (id) {
  if (!nodes[id]) {
    nodes[id] = {};
  }
  var attrs = [].slice.call(arguments, 1);
  attrs.forEach(function (attr) {
    var parts = attr.split("=");
    nodes[id][parts[0]] = parts[1];
    (vars[parts] = vars[parts] || []).push(id);
  });
};

var id = 1;
var generateUID = function () {
  return 'uid_' + id++;
};

run(function (obj) {
  // // Creates canvas 320 × 200 at 10, 50
  // var paper = new Raphael("paper", 300, 300); // paper, 300, 300

  // // Creates circle at x = 50, y = 40, with radius 10
  // var circle = paper.circle('<%cx=x%>', '<%cy=y%>', '<%r=radius%>');
  // var uid = generateUID();
  // circle.id = uid;
  // save(uid, 'cx=x', 'cy=y', 'r=radius');
});

// var Butterfly = function () {

// };

// Butterfly.prototype.update = function (key, value) {
//   var elements = getRelativeElements(key);
// };
// var -> line -> element(attr, text)
var save = function () {};
var foo;
save(foo = 'bar', 'x', 'y');
