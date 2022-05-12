const fs = require('fs')
const md5 = require('md5')

// rename
// function rename () {
// 	const file_path = __dirname + '/../static/images/avatar/111'
// 	let imagesNameArr = fs.readdirSync(file_path)
// 	imagesNameArr.forEach((file, idx) => {
// 		let temp = md5(file) + '.jpg'
// 		fs.rename(`${file_path}/${imagesNameArr[idx]}`, `${file_path}/${temp}`, err => {
// 			if (!err) {
// 				console.log('rename');
// 			}
// 		})
// 	})
// }
// rename()


function randomAvatar () {
	const file_path = __dirname + '/../static/images/avatar'
	let imagesNameArr = fs.readdirSync(file_path)
	let index = Math.floor(Math.random() * imagesNameArr.length + 1) - 1
	console.log(imagesNameArr[index]);
	return imagesNameArr[index]
}

module.exports = {
	randomAvatar
}