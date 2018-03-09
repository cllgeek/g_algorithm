/**
 * @desc 插入排序
 * @param {Array} arr
 */
function insertSort(arr) {
	var i = 1,
		len = arr.length,
		key;

	for (; i < len; i++) {
		var j = i;
		var key = arr[j];
		while (--j > -1) {
			if (arr[j] > key) {
				arr[j + 1] = arr[j];
			} else {
				break;
			}
		}

		arr[j + 1] = key;
	}

	return arr;
}

module.exports = insertSort;
