const fs = require('fs')
const md5 = require('md5')

// rename
// 	imagesNameArr.forEach((file, idx) => {
// 		let temp = md5(file) + '.png'
// 		fs.rename(`${_path}/${imagesNameArr[idx]}`, `${_path}/${temp}`, err => {
// 			if (!err) {
// 				console.log('rename');
// 			}
// 		})
// 	})

function randomAvatar () {
	const _path = __dirname + '/../static/images/avatar/222'
	let imagesNameArr = fs.readdirSync(_path)
	let index = Math.floor(Math.random() * imagesNameArr.length + 1) - 1
	console.log(imagesNameArr[index]);
	return imagesNameArr[index]
}

module.exports = {
	randomAvatar
}