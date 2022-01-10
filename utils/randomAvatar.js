const fs = require('fs')

module.exports = (function () {
    let imagesNameArr = fs.readdirSync(__dirname + '/../static/images')
    let index = Math.floor(Math.random() * imagesNameArr.length + 1)-1
    return imagesNameArr[index]
})()