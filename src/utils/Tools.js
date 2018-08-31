/**
 * @desc 工具类对象
 * @param obj 对象
 * @returns true||false
 */
var Tools = {
  isArray: function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]'
  },
  isObject: function (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
  },
  isNumber: function (obj) {
    return Object.prototype.toString.call(obj) === '[object Number]'
  },
  isString: function (obj) {
    return Object.prototype.toString.call(obj) === '[object String]'
  },
  isFunction: function (obj) {
    return Object.prototype.toString.call(obj) === '[object Function]'
  },
  isBoolean: function (obj) {
    return Object.prototype.toString.call(obj) === '[object Boolean]'
  },
  isNull: function (obj) {
    return obj === null || obj === '' || obj === undefined
  },
  isNotNull: function (obj) {
    return !this.isNull(obj)
  },
  randomNum (min, max) {
    return Math.floor(min + Math.random() * (max - min))
  },
  /**
   * @desc 获取访问路径中某个参数
   * @param paramName 参数名
   * @param url 指定要截取参数的url（可以为空，如果为空url指向当前页面）
   */
  getParamter (paramName, url) {
    var seachUrl = window.location.search.replace('?', '')
    if (url != null) {
      var index = url.indexOf('?')
      url = url.substr(index + 1)
      seachUrl = url
    }
    var ss = seachUrl.split('&')
    var paramNameStr = ''
    var paramNameIndex = -1
    for (var i = 0; i < ss.length; i++) {
      paramNameIndex = ss[i].indexOf('=')
      paramNameStr = ss[i].substring(0, paramNameIndex)
      if (paramNameStr === paramName) {
        var returnValue = ss[i].substring(paramNameIndex + 1, ss[i].length)
        if (typeof (returnValue) === 'undefined') {
          returnValue = ''
        }
        return returnValue
      }
    }
    return ''
  },

  /**
   *
   * @desc 判断两个数组是否相等
   * @param {Array} arr1
   * @param {Array} arr2
   * <a href='http://www.jobbole.com/members/wx1409399284'>@return</a> {Boolean}
   */
  arrayEqual (arr1, arr2) {
    if (arr1 === arr2) return true
    if (arr1.length !== arr2.length) return false
    for (var i = 0; i < arr1.length; ++i) {
      if (arr1[i] !== arr2[i]) return false
    }
    return true
  },
  /**
   * 去掉字符串前后的空格
   * @param str 入参:要去掉空格的字符串
   * @returns
   */
  trimAll (str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
  },
  /**
   * 去掉字符串前的空格
   * @param str 入参:要去掉空格的字符串
   * @returns
   */
  trimLeft (str) {
    return str.replace(/^\s*/g, '')
  },
  /**
   * 去掉字符串后的空格
   * @param str 入参:要去掉空格的字符串
   * @returns
   */
  trimRight (str) {
    return str.replace(/\s*$/, '')
  },
  /**
   * 判断字符串是否为空
   * @param str 传入的字符串
   * @returns
   */
  isEmpty (str) {
    if (str != null && str.length > 0) {
      return true
    }
    return false
  },
  /**
   * 判断两个字符串子否相同
   * @param str1
   * @param str2
   * @returns {Boolean}
   */
  isEquals (str1, str2) {
    if (str1 === str2) {
      return true
    }
    return false
  },
  /**
   * 忽略大小写判断字符串是否相同
   * @param str1
   * @param str2
   * @returns {Boolean}
   */
  isEqualsIgnorecase (str1, str2) {
    if (str1.toUpperCase() === str2.toUpperCase()) {
      return true
    }
    return false
  },
  /**
   * 判断js对象的长度
   * @param obj
   * @param min
   * @param max
   * @returns {Boolean}
   */
  checkLength (obj, min, max) {
    if (obj.length < min || obj.length > max) {
      return false
    } else {
      return true
    }
  },
  /**
   * 判断是否是数字
   * @param value
   * @returns {Boolean}
   */
  isNum (value) {
    if (value != null && value.length > 0 && isNaN(value) === false) {
      return true
    } else {
      return false
    }
  },
  /**
   * 判断是否是中文
   * @param str
   * @returns {Boolean}
   */
  isChine (str) {
    var reg = /^([\u4E00-\u9FA5]|[\uFE30-\uFFA0])*$/
    if (reg.test(str)) {
      return false
    }
    return true
  }

}
// var u = navigator.userAgent
// // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
// // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
// // console.log('zhangwei' + navigator.userAgent)
// // console.log('zhangwei' + navigator.appVersion)

// console.log(navigator)
// if(events.indexOf('Android')>-1 || events.indexOf('Linux')>-1 || events.indexOf('Adr')>-1){
//   console.log("安卓手机");
// }else if(events.indexOf('iPhone')>-1){
//   //根据尺寸进行判断 苹果的型号
//   if(screen.height == 812 && screen.width == 375){
//     console.log("苹果X");
//   }else if(screen.height == 736 && screen.width == 414){
//     console.log("iPhone7P - iPhone8P - iPhone6");
//   }else if(screen.height == 667 && screen.width == 375){
//     console.log("iPhone7 - iPhone8 - iPhone6");
//   }else if(screen.height == 568 && screen.width == 320){
//     console.log("iPhone5");
//   }else{
//     console.log("iPhone4");
//   }
// }else if(events.indexOf('Windows Phone')>-1){
//   console.log("诺基亚手机");
//
// }else if(events.indexOf("iPad")>-1){
//   console.log("平板");
// }

export default Tools
