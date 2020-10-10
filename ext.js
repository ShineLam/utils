/**
 * js扩展
 * 请不要把业务相关的方法写在这里
 */

const DATE_FMTS = ['', '', '', '', 'yyyy', '', 'yyyyMM', 'yyyy-MM', 'yyyyMMdd', '', 'yyyy-MM-dd', '', 'yyyyMMddhhmm', '', 'yyyyMMddhhmmss', '', 'yyyy-MM-dd hh:mm', '', '', 'yyyy-MM-dd hh:mm:ss']

// 根据格式获取日期值(field: y,M,d,h,m,s,S, fmt: yyyyMMdd)
String.prototype.fdate = function (field, fmt, def) {
  var str = this,
    l = this.length,
    val = 0,
    fmt = fmt || (l > 19 ? 'yyyy-MM-dd hh:mm:ss.SSS' : DATE_FMTS[l]),
    i = fmt.indexOf(field);
  if (i == -1) {
    return (def || val)
  }
  for (var len = fmt.length, c0_code = '0'.charCodeAt(0), cf_code = field.charCodeAt(0); i < len; i++) {
    if (fmt.charCodeAt(i) === cf_code) {
      val = (val * 10) + (str.charCodeAt(i) - c0_code)
    }
  }
  return val
}

// 根据日期格式format转换为日期对象
String.prototype.toDate = function (fmt) {
  var str = this,
    m = str.fdate('M', fmt, -1);
  return new Date(str.fdate('y', fmt), (m <= 0 ? 0 : m - 1), str.fdate('d', fmt, 1), str.fdate('h', fmt), str.fdate('m', fmt), str.fdate('s', fmt), str.fdate('S', fmt))
}

// 获取指定域值
Date.prototype.field = function (f) {
  return f === 'y' ? this.getFullYear() : (f === 'M' ? this.getMonth() + 1 : (f === 'd' ? this.getDate() : (f === 'h' ? this.getHours() : (f === 'm' ? this.getMinutes() : (f === 's' ? this.getSeconds() : (f === 'S' ? this.getMilliseconds() : -1))))))
}

// 日期格式化(yyyy-MM-dd hh:mm:ss)
Date.prototype.format = function (fmt) {
  fmt = fmt || 'yyyy-MM-dd hh:mm:ss'
  var str = new Array(fmt.length)
  for (var i = fmt.length - 1, ch, val; i >= 0;) {
    ch = fmt.charAt(i)
    val = this.field(ch)
    if (val == -1) {
      str[i--] = ch
    } else {
      while (fmt.charAt(i) === ch) {
        str[i--] = val % 10
        val = Math.floor(val / 10)
      }
    }
  }
  return str.join('')
}

// 更新日期值
Date.prototype.setValue = function (val, fmt) {
  var type = typeof (val)
  if (type === 'string') {
    this.setFullYear(val.fdate('y', fmt), val.fdate('M', fmt) - 1, val.fdate('d', fmt))
    this.setHours(val.fdate('h', fmt), val.fdate('m', fmt), val.fdate('s', fmt), val.fdate('S', fmt))
  } else {
    this.setTime(type === 'number' ? val : val.getTime())
  }
  return this
}

// 日期格式化(默认)
Date.prototype.yyyyMMdd = function () {
  return this.format('yyyy-MM-dd')
}
Date.prototype.yyyy_MM_dd = function () {
  return this.format('yyyy-MM-dd')
}
// 去除时分秒
Date.prototype.trim = function () {
  this.setHours(0, 0, 0, 0)
  return this
}
// 一个月的第一天
Date.prototype.toFirstDate = function (trim) {
  this.setFullYear(this.getFullYear(), this.getMonth(), 1)
  return trim ? this.trim() : this
}
// 一个月的最后一天
Date.prototype.toLastDate = function (trim) {
  this.toFirstDate(trim)
  this.setMonth(this.getMonth() + 1, 1)
  this.setDate(this.getDate() - 1)
  return this
}
// 使用整数表示
Date.prototype.toIntDate = function () {
  return this.getFullYear() * 10000 + (this.getMonth() + 1) * 100 + this.getDate()
}
// 添加天数
Date.prototype.addDays = function (days) {
  this.setDate(this.getDate() + days)
  return this
}
// 减少天数
Date.prototype.subDays = function (days) {
  this.setDate(this.getDate() - days)
  return this
}
// 添加月数
Date.prototype.addMonth = function (m) {
  this.setMonth(this.getMonth() + m)
  return this
}

/**
 * 按顺序执行
 * @param {Object} fnName
 * @param {Object} i
 * @param {Object} oneDone
 * @param {Object} allDone
 */
Array.prototype.oneByOne = function (cb, done) {
  let values = this
  if (values.length) {
    let val = values[0]
    let subValues = values.slice(1)
    cb (val, () => subValues.oneByOne(cb, done))
  } else {
    done ()
  }
}

/**
 * 提取其中的字段
 * @param {Object} name
 */
Array.prototype.fetch = function (name) {
  var list = []
  for (var i = 0, item; item = this[i++];) {
    list.push(item[name])
  }
  return list
}

// 非空映射
Array.prototype.nmap = function (cb, rstList, unshift) {
  var list = rstList || []
  for (var i = 0, val, item; item = this[i++];) {
    val = cb (item, i, this)
    if (val !== null && val != undefined && val !== '') {
      if (unshift) {
        list.unshift(val)
      } else {
        list.push(val)
      }
    }
  }
  return list
}

Function.prototype.saturate = function (scope /*, args */ ) {
  var fn = this
  var afters = [].slice.call(arguments, 1)
  return function () {
    return fn.apply(scope, [].slice.call(arguments, 0).concat(afters))
  }
}

// 追加参数
Function.prototype.args = Function.prototype.saturate

// 混入
Function.prototype.mixin = function (rawfn) {
  var fn = this
  return function () {
    var args = [].slice.call(arguments, 0)
    try {
      fn.apply(this, args)
    } catch (e) {
      console.log(e)
    }
    rawfn.apply(this, args)
  }
}

// 延时执行
Function.prototype.timeout = function (time /*scope*/ ) {
  let fn = this
  let afters = [].slice.call(arguments, 1)
  let scope = (afters.length ? afters[afters.length - 1] : fn) || fn
  return function () {
    let args = [].slice.call(arguments, 0)
    setTimeout(function () {
      fn.apply(scope, args)
    }, time || 1000)
  }
}

/**
 * 将一维数据进行分组
 *
 * @param {Object} name
 */
Array.prototype.groupBy = function (name, filter) {
  let groups = [],
    grp, mapping = {};
  for (let i = 0, item, v, rtn; item = this[i++];) {
    v = item[name]
    grp = mapping[v]
    if (!grp) {
      grp = {
        name: v,
        count: 0,
        subs: []
      }
      mapping[v] = grp
      groups.push(grp)
    }
    rtn = filter && f.call(grp, item, mapping)
    // 返回false表示过滤掉，返回null表示使用原来的值，否则使用返回的值
    if (rtn !== false) {
      item = rtn || item
      grp.subs.push(item)
      grp.count++
    }
  }
  return groups
}

/**
 * 倒计时
 * @param {Object} count 运行的次数
 * @param {Object} delay 间隔时间(毫秒)
 */
Function.prototype.countdown = function (count, delay /*, args,scope */ ) {
  let fn = this
  let afters = [].slice.call(arguments, 0)
  let scope = (afters.length ? afters[afters.length - 1] : fn) || fn
  let delaySecs = arguments.length > 1 ? arguments[1] : 1000  // 延迟时间
  let exefn = function (c, args, nextfn) {
    if (c >= 1) {
      let ret = fn.apply(scope, args);
      if (ret != 'stop') {
        setTimeout(function() {
          nextfn(c - 1, args, nextfn)
        }, delaySecs)
      }
    }
  }
  return function (/* arguments */) {
    let args = [].slice.call(arguments, 0)
    setTimeout(function() {
      exefn(count, args, exefn)
    }, delaySecs)
  }
}


module.exports = {
  DATE_FMTS
}