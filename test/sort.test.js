describe("sort arithemetic", function() {
	describe("bubbleSort()", function() {
		it("g_arithemetic.bubbleSort([1,2,5,3,6]) should return [1,2,3,5,6]", function() {
			assert(g_arithemetic.arrayEqual(g_arithemetic.bubbleSort([1, 2, 5, 3, 6]),[1, 2, 3, 5, 6]));
		});
	});
});
