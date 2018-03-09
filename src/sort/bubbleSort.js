/**
 * @desc 排序算法中的冒泡排序
 * @param {Array} arr
 */
function bubbleSort(arr) {
	for (var i = 0; i < arr.length - 1; i++) {
		for (var j = 0; j < arr.length - i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				var swap = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = swap;
			}
		}
	}
	return arr;
}

module.exports = bubbleSort;
