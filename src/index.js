/**
 * @desc webpack打包入口文件
 */

const arrayEqual = require('./array/arrayEqual')

const binarySearch = require('./binarySearch/binarySearch')

const bubbleSort = require('./sort/bubbleSort')
const quickSort = require('./sort/quickSort')
const insertSort = require('./sort/insertSort')

module.exports = {
	arrayEqual,
	binarySearch,

	bubbleSort,
	quickSort,
	insertSort
}
