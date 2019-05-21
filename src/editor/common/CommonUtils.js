let CommonUtils = {
	// closest: function(el, fn) {
	// 	return el && (fn(el) ? el : this.closest(el.parentNode, fn));
	// },

	closest: function(el, fn) {
		let DEPTH_LIMIT = 5,
			depth = 0;
		while (depth < DEPTH_LIMIT) {
			if (fn(el)) {
				return el;
			}
			el = el.parentNode;
			depth++;
		}
	},

	closestTag: function (target, tagName) {
		return this.closest(target, function(el) {
			return el.nodeName === tagName;
		});
	}
};

export default CommonUtils;