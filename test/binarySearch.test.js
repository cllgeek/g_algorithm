describe("binarySearch arithmetic:", function() {
	describe("binarySearch()", function() {
		it("g_arithmetic.binarySearch([1,2,3,4,6],0,5,6) should return 4", function() {
			assert(g_arithemetic.binarySearch([1, 2, 3, 4, 6], 0, 5, 6) === 4);
		});
		it("g_arithmetic.binarySearch([1],0,1,1) should return 0", function() {
			assert(g_arithemetic.binarySearch([1],0,1,1) === 0);
		});
	});
});
