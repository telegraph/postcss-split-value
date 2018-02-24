'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createUpdaterFn = exports.matchAny = exports.matchAll = exports.createContainer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createContainer = exports.createContainer = option => {
	return _extends({}, option, { result: _postcss2.default.root() });
};

const matchAll = exports.matchAll = (arr, str) => {
	return arr.filter(regex => {
		return regex.test(str);
	}).length === arr.length;
};

const matchAny = exports.matchAny = (arr, str) => {
	return !!arr.find(regex => {
		return regex.test(str);
	});
};

const createUpdaterFn = exports.createUpdaterFn = containers => rule => {
	const declsToRemove = [];

	containers.forEach(({ skip, match, result }) => {
		if (matchAny(skip, rule)) {
			return;
		}

		let clone = rule.clone();
		clone.removeAll();

		let atRule = rule.parent.type == 'atrule' ? rule.parent.clone() : null;

		if (atRule) {
			atRule.removeAll();
			atRule.append(clone);
		}

		rule.walkDecls(decl => {
			if (matchAny(match, decl)) {
				let newDecl = decl.clone();
				clone.append(newDecl);
				declsToRemove.push(decl);
			}
		});

		if (clone.nodes.length > 0) {
			if (atRule) {
				result.append(atRule);
			} else {
				result.append(clone);
			}
		}
	});

	declsToRemove.forEach(decl => decl.remove());
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvY29udGFpbmVyLmpzIl0sIm5hbWVzIjpbImNyZWF0ZUNvbnRhaW5lciIsIm9wdGlvbiIsInJlc3VsdCIsInJvb3QiLCJtYXRjaEFsbCIsImFyciIsInN0ciIsImZpbHRlciIsInJlZ2V4IiwidGVzdCIsImxlbmd0aCIsIm1hdGNoQW55IiwiZmluZCIsImNyZWF0ZVVwZGF0ZXJGbiIsImNvbnRhaW5lcnMiLCJydWxlIiwiZGVjbHNUb1JlbW92ZSIsImZvckVhY2giLCJza2lwIiwibWF0Y2giLCJjbG9uZSIsInJlbW92ZUFsbCIsImF0UnVsZSIsInBhcmVudCIsInR5cGUiLCJhcHBlbmQiLCJ3YWxrRGVjbHMiLCJkZWNsIiwibmV3RGVjbCIsInB1c2giLCJub2RlcyIsInJlbW92ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7OztBQUVPLE1BQU1BLDRDQUFrQkMsVUFBVTtBQUN4QyxxQkFBWUEsTUFBWixJQUFvQkMsUUFBUSxrQkFBUUMsSUFBUixFQUE1QjtBQUNBLENBRk07O0FBSUEsTUFBTUMsOEJBQVcsQ0FBRUMsR0FBRixFQUFPQyxHQUFQLEtBQWdCO0FBQ3ZDLFFBQU9ELElBQUlFLE1BQUosQ0FBV0MsU0FBUztBQUN6QixTQUFPQSxNQUFNQyxJQUFOLENBQVdILEdBQVgsQ0FBUDtBQUNBLEVBRkssRUFFSEksTUFGRyxLQUVRTCxJQUFJSyxNQUZuQjtBQUdBLENBSk07O0FBTUEsTUFBTUMsOEJBQVcsQ0FBRU4sR0FBRixFQUFPQyxHQUFQLEtBQWdCO0FBQ3ZDLFFBQU8sQ0FBQyxDQUFDRCxJQUFJTyxJQUFKLENBQVNKLFNBQVM7QUFDMUIsU0FBT0EsTUFBTUMsSUFBTixDQUFXSCxHQUFYLENBQVA7QUFDQSxFQUZRLENBQVQ7QUFHQSxDQUpNOztBQU1BLE1BQU1PLDRDQUFrQkMsY0FBY0MsUUFBUTtBQUNwRCxPQUFNQyxnQkFBZ0IsRUFBdEI7O0FBRUFGLFlBQVdHLE9BQVgsQ0FBbUIsQ0FBRSxFQUFFQyxJQUFGLEVBQVFDLEtBQVIsRUFBZWpCLE1BQWYsRUFBRixLQUErQjtBQUNqRCxNQUFLUyxTQUFTTyxJQUFULEVBQWVILElBQWYsQ0FBTCxFQUE0QjtBQUMzQjtBQUNBOztBQUVELE1BQUlLLFFBQVFMLEtBQUtLLEtBQUwsRUFBWjtBQUNBQSxRQUFNQyxTQUFOOztBQUVBLE1BQUlDLFNBQVNQLEtBQUtRLE1BQUwsQ0FBWUMsSUFBWixJQUFvQixRQUFwQixHQUErQlQsS0FBS1EsTUFBTCxDQUFZSCxLQUFaLEVBQS9CLEdBQXFELElBQWxFOztBQUVBLE1BQUtFLE1BQUwsRUFBYztBQUNiQSxVQUFPRCxTQUFQO0FBQ0FDLFVBQU9HLE1BQVAsQ0FBY0wsS0FBZDtBQUNBOztBQUVETCxPQUFLVyxTQUFMLENBQWVDLFFBQVE7QUFDdEIsT0FBS2hCLFNBQVNRLEtBQVQsRUFBZ0JRLElBQWhCLENBQUwsRUFBNkI7QUFDNUIsUUFBSUMsVUFBVUQsS0FBS1AsS0FBTCxFQUFkO0FBQ0FBLFVBQU1LLE1BQU4sQ0FBYUcsT0FBYjtBQUNBWixrQkFBY2EsSUFBZCxDQUFtQkYsSUFBbkI7QUFDQTtBQUNELEdBTkQ7O0FBUUEsTUFBS1AsTUFBTVUsS0FBTixDQUFZcEIsTUFBWixHQUFxQixDQUExQixFQUE4QjtBQUM3QixPQUFLWSxNQUFMLEVBQWM7QUFDYnBCLFdBQU91QixNQUFQLENBQWNILE1BQWQ7QUFDQSxJQUZELE1BR0s7QUFDSnBCLFdBQU91QixNQUFQLENBQWNMLEtBQWQ7QUFDQTtBQUNEO0FBQ0QsRUEvQkQ7O0FBaUNBSixlQUFjQyxPQUFkLENBQXNCVSxRQUFRQSxLQUFLSSxNQUFMLEVBQTlCO0FBQ0EsQ0FyQ00iLCJmaWxlIjoiY29udGFpbmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBvc3Rjc3MgZnJvbSAncG9zdGNzcyc7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDb250YWluZXIgPSBvcHRpb24gPT4ge1xuXHRyZXR1cm4geyAuLi5vcHRpb24sIHJlc3VsdDogcG9zdGNzcy5yb290KCkgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBtYXRjaEFsbCA9ICggYXJyLCBzdHIgKSA9PiB7XG5cdHJldHVybiBhcnIuZmlsdGVyKHJlZ2V4ID0+IHtcblx0XHRcdHJldHVybiByZWdleC50ZXN0KHN0cilcblx0XHR9KS5sZW5ndGggPT09IGFyci5sZW5ndGg7XG59O1xuXG5leHBvcnQgY29uc3QgbWF0Y2hBbnkgPSAoIGFyciwgc3RyICkgPT4ge1xuXHRyZXR1cm4gISFhcnIuZmluZChyZWdleCA9PiB7XG5cdFx0cmV0dXJuIHJlZ2V4LnRlc3Qoc3RyKVxuXHR9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVVcGRhdGVyRm4gPSBjb250YWluZXJzID0+IHJ1bGUgPT4ge1xuXHRjb25zdCBkZWNsc1RvUmVtb3ZlID0gW107XG5cblx0Y29udGFpbmVycy5mb3JFYWNoKCggeyBza2lwLCBtYXRjaCwgcmVzdWx0IH0gKSA9PiB7XG5cdFx0aWYgKCBtYXRjaEFueShza2lwLCBydWxlKSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRsZXQgY2xvbmUgPSBydWxlLmNsb25lKCk7XG5cdFx0Y2xvbmUucmVtb3ZlQWxsKCk7XG5cblx0XHRsZXQgYXRSdWxlID0gcnVsZS5wYXJlbnQudHlwZSA9PSAnYXRydWxlJyA/IHJ1bGUucGFyZW50LmNsb25lKCkgOiBudWxsO1xuXG5cdFx0aWYgKCBhdFJ1bGUgKSB7XG5cdFx0XHRhdFJ1bGUucmVtb3ZlQWxsKCk7XG5cdFx0XHRhdFJ1bGUuYXBwZW5kKGNsb25lKTtcblx0XHR9XG5cblx0XHRydWxlLndhbGtEZWNscyhkZWNsID0+IHtcblx0XHRcdGlmICggbWF0Y2hBbnkobWF0Y2gsIGRlY2wpICkge1xuXHRcdFx0XHRsZXQgbmV3RGVjbCA9IGRlY2wuY2xvbmUoKTtcblx0XHRcdFx0Y2xvbmUuYXBwZW5kKG5ld0RlY2wpO1xuXHRcdFx0XHRkZWNsc1RvUmVtb3ZlLnB1c2goZGVjbCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRpZiAoIGNsb25lLm5vZGVzLmxlbmd0aCA+IDAgKSB7XG5cdFx0XHRpZiAoIGF0UnVsZSApIHtcblx0XHRcdFx0cmVzdWx0LmFwcGVuZChhdFJ1bGUpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHJlc3VsdC5hcHBlbmQoY2xvbmUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cblx0ZGVjbHNUb1JlbW92ZS5mb3JFYWNoKGRlY2wgPT4gZGVjbC5yZW1vdmUoKSk7XG59OyJdfQ==