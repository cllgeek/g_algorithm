/**
 * @desc 二分法查找
 * @param {Array} arr
 * @param {Number} low
 * @param {Number} high
 * @param {Number} key
 */
function binarySearch(arr, low, high, key) {
	var mid = low + (high - low) / 2 | 0;
	if (arr[mid] === key) return mid;
	if (arr[mid] > key) {
		high = mid - 1;
		return binarySearch(arr, low, high, key);
	} else if (arr[mid] < key) {
		low = mid + 1;
		return binarySearch(arr, low, high, key);
	}
}

module.exports = binarySearch;
