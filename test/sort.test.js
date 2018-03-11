describe("sort algorithm", function() {
	describe("bubbleSort()", function() {
		it("g_algorithm.bubbleSort([1,2,5,3,6]) should return [1,2,3,5,6]", function() {
			assert(g_algorithm.arrayEqual(g_algorithm.bubbleSort([1, 2, 5, 3, 6]), [1, 2, 3, 5, 6]));
		});
	});
	describe("insertSort()", function() {
		it("g_algorithm.insertSort([1,2,5,3,6]) should return [1,2,3,5,6]", function() {
			assert(g_algorithm.arrayEqual(g_algorithm.insertSort([1, 2, 5, 3, 6]), [1, 2, 3, 5, 6]));
		});
	});
	describe("quickSort()", function() {
		it("g_algorithm.quickSort([1,2,5,3,6]) should return [1,2,3,5,6]", function() {
			assert(g_algorithm.arrayEqual(g_algorithm.quickSort([1, 2, 5, 3, 6]), [1, 2, 3, 5, 6]));
		});
	});
});
