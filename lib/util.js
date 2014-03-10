
  /**
   * 将一个对象集合转化为二维表格，第一行为key，后续为每个对象的数据
   * Examples:
   * ```
   *  [
   *    {"username": "JacksonTian", "nick": "朴灵", "hometown": "Chongqing"},
   *    {"username": "Fengmk2", "nick": "苏千", "hometown": "Guangzhou"}
   *  ];
   * =>
   *  [
   *    ["username", "nick", "hometown"],
   *    ["JacksonTian", "朴灵", "Chongqing"],
   *    ["Fengmk2", "苏千", "Guangzhou"]
   *  ]
   * ```
   * @param {Array} list 待转化的二维表集合
   */
  butterfly.tablify = function (list) {
    if (!list.length) {
      return [];
    }
    var keys = _.keys(list[0]);
    var ret = [keys];
    _.each(list, function (obj) {
      ret.push(_.values(obj));
    });
    return ret;
  };

  /**
   * tablify的反向工程，如果不传入head，那么第一行取出作为key，后续当作数据
   * Examples:
   * ```
   *  [
   *    ["username", "nick", "hometown"],
   *    ["JacksonTian", "朴灵", "Chongqing"],
   *    ["Fengmk2", "苏千", "Guangzhou"]
   *  ]
   * =>
   *  [
   *    {"username": "JacksonTian", "nick": "朴灵", "hometown": "Chongqing"},
   *    {"username": "Fengmk2", "nick": "苏千", "hometown": "Guangzhou"}
   *  ];
   * ```
   * @param {Array} table 二维表数据
   * @param {Array} head 可选的表头数组，如果不指定，将取出二维表数据第一行作为表头
   */
  butterfly.collectionify = function (table, head) {
    var ret = [];
    if (table.length < 2) {
      return ret;
    }
    var keys = head || table[0];
    _.each(table.slice(1), function (row) {
      var obj = {};
      _.each(keys, function (key, index) {
        obj[key] = row[index];
      });
      ret.push(obj);
    });
    return ret;
  };

  /**
   * 判断输入是否是数字
   * @param {Mix} obj 输入内容
   * @return {Boolean} 返回输入是否是数字
   */
  DataV.isNumeric = function (obj) {
    return !isNaN(parseFloat(obj)) && isFinite(obj);
  };

  butterfly.sum = function (list, iterator) {
    var count = 0;
    var i, l;
    if (typeof iterator === 'undefined') {
      for (i = 0, l = list.length; i < l; i++) {
        count += list[i];
      }
    } else if (typeof iterator === "function") {
      for (i = 0, l = list.length; i < l; i++) {
        count += iterator(list[i]);
      }
    } else if (typeof iterator === "string" || typeof iterator === 'number') {
      for (i = 0, l = list.length; i < l; i++) {
        count += list[i][iterator];
      }
    } else {
      throw new Error("iterator error");
    }
    return count;
  };
