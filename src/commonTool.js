/**
 * Created by qiujian on 5/29/17.
 */
import $ from 'jquery'

export function getItemInArray (arrayObj, attrValue, attrName) {
  if (arrayObj == null || attrValue == null) {
    return null
  }
  if (attrName && typeof attrName == 'string') {
    if ($.trim(attrName) === '') {
      return null
    }
    for (var p in arrayObj) {
      if (arrayObj[p].hasOwnProperty(attrName) && arrayObj[p][attrName] == attrValue) {
        return arrayObj[p]
      }
    }
    return null
  } else {
    for (var v in arrayObj) {
      if (arrayObj[v] == attrValue) {
        return arrayObj[v]
      }
    }
  }
}
