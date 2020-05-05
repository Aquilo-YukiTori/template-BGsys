// 在当前模板下一些常用场景下可用到的功能方法
export default {
  methods: {
    // 验证用于ajax的数据是否存在，并返回相应的值
    // value： 值，父元素的值
    // route： 可选，当要提取父元素的属性时出传入，会在验证父元素的存在性后提取
    // type: 可选，提取后对值的类型的要求
    verifyData: function ({ value, route, type }) {
      let res = ''
      if (value) {
        if (route) {
          res = value[route]
        } else {
          res = value
        }
      } else {
        res = undefined
      }
      if (type === 'Number') {
        return (res === '' || res === undefined) ? undefined : Number(res)
      }
      return res
    },
    // 对Date对象添加格式化方法,用于在进入页面时在时间选择器上设置格式化的默认时间
    operateTime: function (d, format = 'yyyy-MM-dd hh:mm:ss') {
      var date = {
        'M+': d.getMonth() + 1,
        'd+': d.getDate(),
        'h+': d.getHours(),
        'm+': d.getMinutes(),
        's+': d.getSeconds(),
        'q+': Math.floor((d.getMonth() + 3) / 3),
        'S+': d.getMilliseconds()
      }
      if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (var k in date) {
        if (new RegExp('(' + k + ')').test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? date[k] : ('00' + date[k]).substr(('' + date[k]).length))
        }
      }
      return format
    },
    // 用于对时间的关联限制，时间1不能大于时间2，时间2不能小于时间1
    // myStatus 值， 'from' 代表时间一  'to' 代表时间二
    // beforeName 时间一的字段名称
    // afterName 时间二的字段名称
    // 例子chooseDateChange('from', 'choosedDateFrom', 'choosedDateTo')
    choosedDateChange: function (myStatus, beforeName, afterName) {
      let t = this
      let list = ['quickDialogOption', 'inputOption', 'searchOption', 'options']
      let objArr = []
      for (let i of list) {
        if (t[i] && t[i][beforeName]) {
          objArr.push(i)
        }
      }
      if (objArr.length === 0) {
        t.$message.error('没有找到包含时间的数据对象')
        return
      }
      for (let i of objArr) {
        operateFunc(t[i])
      }
      function operateFunc (d) {
        let sec = 0
        sec = new Date(d[beforeName]).getTime() - new Date(d[afterName]).getTime()
        if (myStatus === 'from') {
          if (sec > 0) {
            d[beforeName] = d[afterName]
          }
        }
        if (myStatus === 'to') {
          if (sec > 0) {
            d[afterName] = d[beforeName]
          }
        }
      }
    }
  }
}
