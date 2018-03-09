const binarySearch = (arr, low, high, key) => {
	let mid = parseInt((low + high) / 2);
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
