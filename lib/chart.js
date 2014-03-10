  /**
   * 所有Chart的源定义
   * Examples:
   * ```
   *    var Stream = DataV.extend(DataV.Chart, {
   *        initialize: function () {
   *            this.type = "Stream";
   *        },
   *        clearCanvas: function () {
   *            this.canvas.clear();
   *            this.legend.innerHTML = "";
   *        }
   *    });
   * ```
   */
  var Chart = butterfly.extend(EventBase, {
    type: "Chart",
    initialize: function () {
      // 默认设置
      this.defaults = {};
      // 插件
      this.plugins = {};
      // 纬度
      this.dimension = {};
      // 格式化
      this.formatter = {};
      // 挂件
      this.widgets = [];
    }
  });

  /**
   * 返回当前Chart的类型
   * @return {String} Chart类型
   */
  Chart.prototype.getType = function () {
    return this.type;
  };

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
   * 如果node是字符串，会当作ID进行查找。
   * 如果是DOM元素，直接返回该元素。
   * 如果是jQuery对象，返回对象中的第一个元素。
   * 如果节点不存在，则抛出异常
   * Examples:
   * ```
   * chart.checkContainer("id");
   * chart.checkContainer(document.getElementById("id"));
   * chart.checkContainer($("#id"));
   * ```
   * @param {Mix} node The element Id or Dom element
   * @return {Object} 返回找到的DOM节点
   */
  Chart.prototype.checkContainer = function (node) {
    var ret;

    if (typeof node === "string") {
      ret = document.getElementById(node);
    } else if (node.nodeName) { //DOM-element
      ret = node;
    } else if (node.size() > 0) {
      ret = node[0];
    }
    if (!ret) {
      throw new Error("Please specify which node to render.");
    }
    return ret;
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
    return _.extend(this.defaults, options);
  };

  /**
   * 添加插件方法到实例对象上
   * @param {String} name plugin name
   * @param {Function} fn plugin function
   * @return {Object} A reference to the host object
   */
  Chart.prototype.plug = function (name, fn) {
    this[name] = fn;
    this.plugins[name] = fn;
    return this;
  };

  /**
   * 从实例上移除插件方法
   * @param {String} plugin The namespace of the plugin
   * @return {Object} A reference to the host object
   */
  Chart.prototype.unplug = function (name) {
    if (this.plugins.hasOwnProperty(name)) {
      delete this.plugins[name];
      delete this[name];
    }
    return this;
  };

  /**
   * 数据源映射
   */
  Chart.prototype.map = function (map) {
      var that = this;
      _.forEach(map, function (val, key) {
          if (that.dimension.hasOwnProperty(key)) {
              that.dimension[key].index = map[key];
          }
      });
      var ret = {};
      _.forEach(that.dimension, function (val, key) {
          ret[key] = val.index;
      });

      ret.hasField = _.any(ret, function (val) {
          return typeof val === 'string';
      });
      this.mapping = ret;
      return ret;
  };

  /**
   * 创建画布
   */
  Chart.prototype.createCanvas = function () {
      var conf = this.defaults;
      this.node.style.position = "relative";
      this.paper = new Raphael(this.node, conf.width, conf.height);
  };

  /**
   * 拥有一个组件
   */
  Chart.prototype.own = function (widget) {
      // 传递defaults给子组件
      widget.setOptions(this.defaults);
      widget.owner = this;
      this.widgets.push(widget);
      return widget;
  };

  Chart.prototype.show = function () {
      $(this.node).unwall();
      return this;
  };

  Chart.prototype.hidden = function () {
      $(this.node).wall();
      return this;
  };

  DataV.Chart = Chart;
