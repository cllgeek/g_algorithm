/**
 * @desc 快速排序,是对冒泡排序的一种改进
 * @param {Array} arr
 */
function quickSort(arr) {
	if (arr.length <= 1) return arr;
	var pivotIndex = Math.floor(arr.length / 2);
	var pivot = arr.splice(pivotIndex, 1)[0];

	var left = [];
	var right = [];
	for (i = 0; i < arr.length; i++) {
		if (arr[i] < pivot) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}

	return quickSort(left).concat([pivot], quickSort(right));
}

module.exports = quickSort;
