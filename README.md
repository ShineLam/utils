# 扩展

## `String.prototype.fdate`
#### 根据格式获取日期值

```js
  /*
   * @param {String} field: y,M,d,h,m,s,S
   * @param {String} fmt: DATE_FMTS
   * @call str.fdate(field, fmt, def)
  */
  let str = '2022-06-23 10:53:45'
  console.log(str.fdate('y', 'yyyyMMdd'))  // 2022
```

## `String.prototype.toDate`
#### 根据日期格式format转换为日期对象

```js
  /*
   * @param {String} fmt: DATE_FMTS
   * @call str.toDate(fmt)
  */
    let str = '2022-06-23 10:53:45'
    console.log(str.toDate('yyyy-MM-dd hh:mm')) // Thu Jun 23 2022 10:53:00 GMT+0800 (中国标准时间)
```

## `Date.prototype.field`
#### 获取日期指定域值

```js
  /*
   * @param {String} f: y m d h m s S
   * @calldate.field(f)
  */
    let date = new Date()
    console.log(date.field('y')) // 2022
```

## `Date.prototype.format`
#### 日期格式化

```js
  /*
   * @param {String} fmt: DATE_FMTS
   * @call date.format(fmt)
  */
    let date = new Date()
    console.log(date.format('yyyy-MM-dd')) // 2022-06-23
```

## `Date.prototype.setValue`
#### 更新日期值

```js
  /*
   * @param {String || Number} val: '2022-06-30' || 20220630
   * @param {String} fmt: DATE_FMTS
   * @call date.setValue(val, fmt)
  */
    let date = new Date()
    console.log(date.setValue('2022-06-30')) // Thu Jun 30 2022 00:00:00 GMT+0800 (中国标准时间)
```

## `Date.prototype.yyyyMMdd`
#### 日期格式化(默认)

```js
  /*
   * @call date.yyyyMMdd()
  */
    let date = new Date()
    console.log(date.yyyyMMdd()) // 2022-06-23
```

## `Date.prototype.trim`
#### 清空时分秒

```js
  /*
   * @call date.trim()
  */
    let date = new Date()
    console.log(date.trim()) // Thu Jun 23 2022 00:00:00 GMT+0800 (中国标准时间)
```

## `Date.prototype.toFirstDate`
#### 一个月的第一天

```js
  /*
   * @param {Boolean} trim
   * @call date.toFirstDate(trim)
  */
    let date = new Date()
    console.log(date.toFirstDate()) // Wed Jun 01 2022 17:08:33 GMT+0800 (中国标准时间)
```

## `Date.prototype.toLastDate`
#### 一个月的最后一天

```js
  /*
   * @param {Boolean} trim
   * @call date.toLastDate(trim)
  */
    let date = new Date()
    console.log(date.toLastDate()) // Thu Jun 30 2022 17:09:26 GMT+0800 (中国标准时间)
```

## `Date.prototype.toIntDate`
#### 使用整数表示日期

```js
  /*
   * @call date.toIntDate()
  */
    let date = new Date()
    console.log(date.toIntDate()) // 20220623
```

## `Date.prototype.addDays`
#### 添加天数

```js
  /*
   * @param {Number} days
   * @call date.subDays(days)
  */
    let date = new Date()
    console.log(date.addDays(1)) // Wed Jun 24 2022 17:12:46 GMT+0800 (中国标准时间)
```

## `Date.prototype.subDays`
#### 减少天数

```js
  /*
   * @param {Number} days
   * @call date.subDays(days)
  */
    let date = new Date()
    console.log(date.subDays(1)) // Wed Jun 22 2022 17:12:46 GMT+0800 (中国标准时间)
```

## `Date.prototype.addMonth`
#### 添加月份

```js
  /*
   * @param {Number} m
   * @call date.addMonth(m)
  */
    let date = new Date()
    console.log(date.addMonth(1)) // Sat Jul 23 2022 17:15:09 GMT+0800 (中国标准时间)
```

## `Array.prototype.oneByOne`
#### 按顺序执行

```js
  /*
   * @callback cb
   * @callback done
   * @call arr.oneByOne(cb, done)
  */
  let list = [1, 2, 3]
  list.oneByOne((item, next) => {
    console.log(item)
    next()
  }, done => {
    console.log('done')
  })
  // 1 2 3 done
```

## `Array.prototype.fetch`
#### 提取数组元素中的字段

```js
  /*
   * @param {String} name
   * @call arr.fetch(name)
  */
  let list = [{ name: 'Ethan' }, { name: 'Linna' }, { name: 'Ryan' }]
  console.log(list.fetch('name')) // ["Ethan", "Linna", "Ryan"]
```
