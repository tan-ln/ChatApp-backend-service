/**
 * @param {array} arr 排序数组
 * @param {string} attr 字段/属性
 * @returns array
 */

const { pinyin } = require('pinyin-pro')

function sortByFirstLetter (arr, attr) {
  if (attr) {
    arr.forEach(function (item) {
      let temp = item[attr]
      item.sortName = temp
      item.firstLetter = pinyin(temp[0], { pattern: 'first' })
    })
    return arr.sort((a, b) => a.sortName.localeCompare(b.sortName, "zh"))
  } else {
    return arr.sort((a, b) => a.localeCompare(b, "zh"))
  }
}

module.exports = function (arr, attr) {
  const res = sortByFirstLetter(arr, attr)
  return res.reduce((total, curItem, curIdx) => {
    if (total[curItem.firstLetter] && total[curItem.firstLetter][0].firstLetter === curItem.firstLetter) {
      total[curItem.firstLetter].push(curItem)
    } else {
      total[curItem.firstLetter] = [curItem]
    }
    return total
  }, {})
}
