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
	return _extends({}, option, { result: _postcss2.default.root(), files: [] });
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

	containers.forEach(({ skip, match, result, fd }) => {
		if (matchAny(skip, rule)) {
			return;
		}

		fd++;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvY29udGFpbmVyLmpzIl0sIm5hbWVzIjpbImNyZWF0ZUNvbnRhaW5lciIsIm9wdGlvbiIsInJlc3VsdCIsInJvb3QiLCJmaWxlcyIsIm1hdGNoQWxsIiwiYXJyIiwic3RyIiwiZmlsdGVyIiwicmVnZXgiLCJ0ZXN0IiwibGVuZ3RoIiwibWF0Y2hBbnkiLCJmaW5kIiwiY3JlYXRlVXBkYXRlckZuIiwiY29udGFpbmVycyIsInJ1bGUiLCJkZWNsc1RvUmVtb3ZlIiwiZm9yRWFjaCIsInNraXAiLCJtYXRjaCIsImZkIiwiY2xvbmUiLCJyZW1vdmVBbGwiLCJhdFJ1bGUiLCJwYXJlbnQiLCJ0eXBlIiwiYXBwZW5kIiwid2Fsa0RlY2xzIiwiZGVjbCIsIm5ld0RlY2wiLCJwdXNoIiwibm9kZXMiLCJyZW1vdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFTyxNQUFNQSw0Q0FBa0JDLFVBQVU7QUFDeEMscUJBQVlBLE1BQVosSUFBb0JDLFFBQVEsa0JBQVFDLElBQVIsRUFBNUIsRUFBNENDLE9BQU8sRUFBbkQ7QUFDQSxDQUZNOztBQUlBLE1BQU1DLDhCQUFXLENBQUVDLEdBQUYsRUFBT0MsR0FBUCxLQUFnQjtBQUN2QyxRQUFPRCxJQUFJRSxNQUFKLENBQVdDLFNBQVM7QUFDekIsU0FBT0EsTUFBTUMsSUFBTixDQUFXSCxHQUFYLENBQVA7QUFDQSxFQUZLLEVBRUhJLE1BRkcsS0FFUUwsSUFBSUssTUFGbkI7QUFHQSxDQUpNOztBQU1BLE1BQU1DLDhCQUFXLENBQUVOLEdBQUYsRUFBT0MsR0FBUCxLQUFnQjtBQUN2QyxRQUFPLENBQUMsQ0FBQ0QsSUFBSU8sSUFBSixDQUFTSixTQUFTO0FBQzFCLFNBQU9BLE1BQU1DLElBQU4sQ0FBV0gsR0FBWCxDQUFQO0FBQ0EsRUFGUSxDQUFUO0FBR0EsQ0FKTTs7QUFNQSxNQUFNTyw0Q0FBa0JDLGNBQWNDLFFBQVE7QUFDcEQsT0FBTUMsZ0JBQWdCLEVBQXRCOztBQUVBRixZQUFXRyxPQUFYLENBQW1CLENBQUUsRUFBRUMsSUFBRixFQUFRQyxLQUFSLEVBQWVsQixNQUFmLEVBQXVCbUIsRUFBdkIsRUFBRixLQUFtQztBQUNyRCxNQUFLVCxTQUFTTyxJQUFULEVBQWVILElBQWYsQ0FBTCxFQUE0QjtBQUMzQjtBQUNBOztBQUVESzs7QUFFQSxNQUFJQyxRQUFRTixLQUFLTSxLQUFMLEVBQVo7QUFDQUEsUUFBTUMsU0FBTjs7QUFFQSxNQUFJQyxTQUFTUixLQUFLUyxNQUFMLENBQVlDLElBQVosSUFBb0IsUUFBcEIsR0FBK0JWLEtBQUtTLE1BQUwsQ0FBWUgsS0FBWixFQUEvQixHQUFxRCxJQUFsRTs7QUFFQSxNQUFLRSxNQUFMLEVBQWM7QUFDYkEsVUFBT0QsU0FBUDtBQUNBQyxVQUFPRyxNQUFQLENBQWNMLEtBQWQ7QUFDQTs7QUFFRE4sT0FBS1ksU0FBTCxDQUFlQyxRQUFRO0FBQ3RCLE9BQUtqQixTQUFTUSxLQUFULEVBQWdCUyxJQUFoQixDQUFMLEVBQTZCO0FBQzVCLFFBQUlDLFVBQVVELEtBQUtQLEtBQUwsRUFBZDtBQUNBQSxVQUFNSyxNQUFOLENBQWFHLE9BQWI7QUFDQWIsa0JBQWNjLElBQWQsQ0FBbUJGLElBQW5CO0FBQ0E7QUFDRCxHQU5EOztBQVFBLE1BQUtQLE1BQU1VLEtBQU4sQ0FBWXJCLE1BQVosR0FBcUIsQ0FBMUIsRUFBOEI7QUFDN0IsT0FBS2EsTUFBTCxFQUFjO0FBQ2J0QixXQUFPeUIsTUFBUCxDQUFjSCxNQUFkO0FBQ0EsSUFGRCxNQUdLO0FBQ0p0QixXQUFPeUIsTUFBUCxDQUFjTCxLQUFkO0FBQ0E7QUFDRDtBQUNELEVBakNEOztBQW1DQUwsZUFBY0MsT0FBZCxDQUFzQlcsUUFBUUEsS0FBS0ksTUFBTCxFQUE5QjtBQUNBLENBdkNNIiwiZmlsZSI6ImNvbnRhaW5lci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwb3N0Y3NzIGZyb20gJ3Bvc3Rjc3MnO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ29udGFpbmVyID0gb3B0aW9uID0+IHtcblx0cmV0dXJuIHsgLi4ub3B0aW9uLCByZXN1bHQ6IHBvc3Rjc3Mucm9vdCgpLCBmaWxlczogW10gfTtcbn07XG5cbmV4cG9ydCBjb25zdCBtYXRjaEFsbCA9ICggYXJyLCBzdHIgKSA9PiB7XG5cdHJldHVybiBhcnIuZmlsdGVyKHJlZ2V4ID0+IHtcblx0XHRcdHJldHVybiByZWdleC50ZXN0KHN0cilcblx0XHR9KS5sZW5ndGggPT09IGFyci5sZW5ndGg7XG59O1xuXG5leHBvcnQgY29uc3QgbWF0Y2hBbnkgPSAoIGFyciwgc3RyICkgPT4ge1xuXHRyZXR1cm4gISFhcnIuZmluZChyZWdleCA9PiB7XG5cdFx0cmV0dXJuIHJlZ2V4LnRlc3Qoc3RyKVxuXHR9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVVcGRhdGVyRm4gPSBjb250YWluZXJzID0+IHJ1bGUgPT4ge1xuXHRjb25zdCBkZWNsc1RvUmVtb3ZlID0gW107XG5cblx0Y29udGFpbmVycy5mb3JFYWNoKCggeyBza2lwLCBtYXRjaCwgcmVzdWx0LCBmZCB9ICkgPT4ge1xuXHRcdGlmICggbWF0Y2hBbnkoc2tpcCwgcnVsZSkgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0ZmQrKztcblxuXHRcdGxldCBjbG9uZSA9IHJ1bGUuY2xvbmUoKTtcblx0XHRjbG9uZS5yZW1vdmVBbGwoKTtcblxuXHRcdGxldCBhdFJ1bGUgPSBydWxlLnBhcmVudC50eXBlID09ICdhdHJ1bGUnID8gcnVsZS5wYXJlbnQuY2xvbmUoKSA6IG51bGw7XG5cblx0XHRpZiAoIGF0UnVsZSApIHtcblx0XHRcdGF0UnVsZS5yZW1vdmVBbGwoKTtcblx0XHRcdGF0UnVsZS5hcHBlbmQoY2xvbmUpO1xuXHRcdH1cblxuXHRcdHJ1bGUud2Fsa0RlY2xzKGRlY2wgPT4ge1xuXHRcdFx0aWYgKCBtYXRjaEFueShtYXRjaCwgZGVjbCkgKSB7XG5cdFx0XHRcdGxldCBuZXdEZWNsID0gZGVjbC5jbG9uZSgpO1xuXHRcdFx0XHRjbG9uZS5hcHBlbmQobmV3RGVjbCk7XG5cdFx0XHRcdGRlY2xzVG9SZW1vdmUucHVzaChkZWNsKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGlmICggY2xvbmUubm9kZXMubGVuZ3RoID4gMCApIHtcblx0XHRcdGlmICggYXRSdWxlICkge1xuXHRcdFx0XHRyZXN1bHQuYXBwZW5kKGF0UnVsZSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0cmVzdWx0LmFwcGVuZChjbG9uZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHRkZWNsc1RvUmVtb3ZlLmZvckVhY2goZGVjbCA9PiBkZWNsLnJlbW92ZSgpKTtcbn07XG4iXX0=