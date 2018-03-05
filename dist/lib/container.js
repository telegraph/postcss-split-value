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
	const rulesToAppend = [];
	const declsToRemove = [];

	containers.forEach(({ match, target, skip, remove, result }) => {
		let isTarget = false;

		if (matchAny(target, rule)) {
			result.append(rule);
			isTarget = true;
		}

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
			//TODO: make this more efficient by moving isTarget test outside loop
			if (!isTarget && matchAny(match, decl)) {
				let newDecl = decl.clone();
				clone.append(newDecl);

				if (remove) {
					declsToRemove.push(decl);
				}
			}
		});

		if (clone.nodes.length > 0) {
			if (atRule) {
				rulesToAppend.push(atRule);
				result.append(atRule);
			} else {
				rulesToAppend.push(clone);
				result.append(clone);
			}
		}
	});

	declsToRemove.forEach(decl => decl.remove());
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvY29udGFpbmVyLmpzIl0sIm5hbWVzIjpbImNyZWF0ZUNvbnRhaW5lciIsIm9wdGlvbiIsInJlc3VsdCIsInJvb3QiLCJtYXRjaEFsbCIsImFyciIsInN0ciIsImZpbHRlciIsInJlZ2V4IiwidGVzdCIsImxlbmd0aCIsIm1hdGNoQW55IiwiZmluZCIsImNyZWF0ZVVwZGF0ZXJGbiIsImNvbnRhaW5lcnMiLCJydWxlIiwicnVsZXNUb0FwcGVuZCIsImRlY2xzVG9SZW1vdmUiLCJmb3JFYWNoIiwibWF0Y2giLCJ0YXJnZXQiLCJza2lwIiwicmVtb3ZlIiwiaXNUYXJnZXQiLCJhcHBlbmQiLCJjbG9uZSIsInJlbW92ZUFsbCIsImF0UnVsZSIsInBhcmVudCIsInR5cGUiLCJ3YWxrRGVjbHMiLCJkZWNsIiwibmV3RGVjbCIsInB1c2giLCJub2RlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7OztBQUVPLE1BQU1BLDRDQUFrQkMsVUFBVTtBQUN4QyxxQkFBWUEsTUFBWixJQUFvQkMsUUFBUSxrQkFBUUMsSUFBUixFQUE1QjtBQUNBLENBRk07O0FBSUEsTUFBTUMsOEJBQVcsQ0FBRUMsR0FBRixFQUFPQyxHQUFQLEtBQWdCO0FBQ3ZDLFFBQU9ELElBQUlFLE1BQUosQ0FBV0MsU0FBUztBQUN6QixTQUFPQSxNQUFNQyxJQUFOLENBQVdILEdBQVgsQ0FBUDtBQUNBLEVBRkssRUFFSEksTUFGRyxLQUVRTCxJQUFJSyxNQUZuQjtBQUdBLENBSk07O0FBTUEsTUFBTUMsOEJBQVcsQ0FBRU4sR0FBRixFQUFPQyxHQUFQLEtBQWdCO0FBQ3ZDLFFBQU8sQ0FBQyxDQUFDRCxJQUFJTyxJQUFKLENBQVNKLFNBQVM7QUFDMUIsU0FBT0EsTUFBTUMsSUFBTixDQUFXSCxHQUFYLENBQVA7QUFDQSxFQUZRLENBQVQ7QUFHQSxDQUpNOztBQU1BLE1BQU1PLDRDQUFrQkMsY0FBY0MsUUFBUTtBQUNwRCxPQUFNQyxnQkFBZ0IsRUFBdEI7QUFDQSxPQUFNQyxnQkFBZ0IsRUFBdEI7O0FBRUFILFlBQVdJLE9BQVgsQ0FBbUIsQ0FBRSxFQUFFQyxLQUFGLEVBQVNDLE1BQVQsRUFBaUJDLElBQWpCLEVBQXVCQyxNQUF2QixFQUErQnBCLE1BQS9CLEVBQUYsS0FBK0M7QUFDakUsTUFBSXFCLFdBQVcsS0FBZjs7QUFFQSxNQUFLWixTQUFTUyxNQUFULEVBQWlCTCxJQUFqQixDQUFMLEVBQThCO0FBQzdCYixVQUFPc0IsTUFBUCxDQUFjVCxJQUFkO0FBQ0FRLGNBQVcsSUFBWDtBQUNBOztBQUVELE1BQUtaLFNBQVNVLElBQVQsRUFBZU4sSUFBZixDQUFMLEVBQTRCO0FBQzNCO0FBQ0E7O0FBRUQsTUFBSVUsUUFBUVYsS0FBS1UsS0FBTCxFQUFaO0FBQ0FBLFFBQU1DLFNBQU47O0FBRUEsTUFBSUMsU0FBU1osS0FBS2EsTUFBTCxDQUFZQyxJQUFaLElBQW9CLFFBQXBCLEdBQStCZCxLQUFLYSxNQUFMLENBQVlILEtBQVosRUFBL0IsR0FBcUQsSUFBbEU7O0FBRUEsTUFBS0UsTUFBTCxFQUFjO0FBQ2JBLFVBQU9ELFNBQVA7QUFDQUMsVUFBT0gsTUFBUCxDQUFjQyxLQUFkO0FBQ0E7O0FBRURWLE9BQUtlLFNBQUwsQ0FBZUMsUUFBUTtBQUN0QjtBQUNBLE9BQUssQ0FBQ1IsUUFBRCxJQUFhWixTQUFTUSxLQUFULEVBQWdCWSxJQUFoQixDQUFsQixFQUEwQztBQUN6QyxRQUFJQyxVQUFVRCxLQUFLTixLQUFMLEVBQWQ7QUFDQUEsVUFBTUQsTUFBTixDQUFhUSxPQUFiOztBQUVBLFFBQUtWLE1BQUwsRUFBYztBQUNiTCxtQkFBY2dCLElBQWQsQ0FBbUJGLElBQW5CO0FBQ0E7QUFDRDtBQUNELEdBVkQ7O0FBWUEsTUFBS04sTUFBTVMsS0FBTixDQUFZeEIsTUFBWixHQUFxQixDQUExQixFQUE4QjtBQUM3QixPQUFLaUIsTUFBTCxFQUFjO0FBQ2JYLGtCQUFjaUIsSUFBZCxDQUFtQk4sTUFBbkI7QUFDQXpCLFdBQU9zQixNQUFQLENBQWNHLE1BQWQ7QUFDQSxJQUhELE1BSUs7QUFDSlgsa0JBQWNpQixJQUFkLENBQW1CUixLQUFuQjtBQUNBdkIsV0FBT3NCLE1BQVAsQ0FBY0MsS0FBZDtBQUNBO0FBQ0Q7QUFDRCxFQTVDRDs7QUE4Q0FSLGVBQWNDLE9BQWQsQ0FBc0JhLFFBQVFBLEtBQUtULE1BQUwsRUFBOUI7QUFDQSxDQW5ETSIsImZpbGUiOiJjb250YWluZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcG9zdGNzcyBmcm9tICdwb3N0Y3NzJztcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNvbnRhaW5lciA9IG9wdGlvbiA9PiB7XG5cdHJldHVybiB7IC4uLm9wdGlvbiwgcmVzdWx0OiBwb3N0Y3NzLnJvb3QoKSB9O1xufTtcblxuZXhwb3J0IGNvbnN0IG1hdGNoQWxsID0gKCBhcnIsIHN0ciApID0+IHtcblx0cmV0dXJuIGFyci5maWx0ZXIocmVnZXggPT4ge1xuXHRcdFx0cmV0dXJuIHJlZ2V4LnRlc3Qoc3RyKVxuXHRcdH0pLmxlbmd0aCA9PT0gYXJyLmxlbmd0aDtcbn07XG5cbmV4cG9ydCBjb25zdCBtYXRjaEFueSA9ICggYXJyLCBzdHIgKSA9PiB7XG5cdHJldHVybiAhIWFyci5maW5kKHJlZ2V4ID0+IHtcblx0XHRyZXR1cm4gcmVnZXgudGVzdChzdHIpXG5cdH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVVwZGF0ZXJGbiA9IGNvbnRhaW5lcnMgPT4gcnVsZSA9PiB7XG5cdGNvbnN0IHJ1bGVzVG9BcHBlbmQgPSBbXTtcblx0Y29uc3QgZGVjbHNUb1JlbW92ZSA9IFtdO1xuXG5cdGNvbnRhaW5lcnMuZm9yRWFjaCgoIHsgbWF0Y2gsIHRhcmdldCwgc2tpcCwgcmVtb3ZlLCByZXN1bHQgfSApID0+IHtcblx0XHRsZXQgaXNUYXJnZXQgPSBmYWxzZTtcblxuXHRcdGlmICggbWF0Y2hBbnkodGFyZ2V0LCBydWxlKSApIHtcblx0XHRcdHJlc3VsdC5hcHBlbmQocnVsZSk7XG5cdFx0XHRpc1RhcmdldCA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKCBtYXRjaEFueShza2lwLCBydWxlKSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRsZXQgY2xvbmUgPSBydWxlLmNsb25lKCk7XG5cdFx0Y2xvbmUucmVtb3ZlQWxsKCk7XG5cblx0XHRsZXQgYXRSdWxlID0gcnVsZS5wYXJlbnQudHlwZSA9PSAnYXRydWxlJyA/IHJ1bGUucGFyZW50LmNsb25lKCkgOiBudWxsO1xuXG5cdFx0aWYgKCBhdFJ1bGUgKSB7XG5cdFx0XHRhdFJ1bGUucmVtb3ZlQWxsKCk7XG5cdFx0XHRhdFJ1bGUuYXBwZW5kKGNsb25lKTtcblx0XHR9XG5cblx0XHRydWxlLndhbGtEZWNscyhkZWNsID0+IHtcblx0XHRcdC8vVE9ETzogbWFrZSB0aGlzIG1vcmUgZWZmaWNpZW50IGJ5IG1vdmluZyBpc1RhcmdldCB0ZXN0IG91dHNpZGUgbG9vcFxuXHRcdFx0aWYgKCAhaXNUYXJnZXQgJiYgbWF0Y2hBbnkobWF0Y2gsIGRlY2wpICkge1xuXHRcdFx0XHRsZXQgbmV3RGVjbCA9IGRlY2wuY2xvbmUoKTtcblx0XHRcdFx0Y2xvbmUuYXBwZW5kKG5ld0RlY2wpO1xuXG5cdFx0XHRcdGlmICggcmVtb3ZlICkge1xuXHRcdFx0XHRcdGRlY2xzVG9SZW1vdmUucHVzaChkZWNsKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0aWYgKCBjbG9uZS5ub2Rlcy5sZW5ndGggPiAwICkge1xuXHRcdFx0aWYgKCBhdFJ1bGUgKSB7XG5cdFx0XHRcdHJ1bGVzVG9BcHBlbmQucHVzaChhdFJ1bGUpO1xuXHRcdFx0XHRyZXN1bHQuYXBwZW5kKGF0UnVsZSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0cnVsZXNUb0FwcGVuZC5wdXNoKGNsb25lKTtcblx0XHRcdFx0cmVzdWx0LmFwcGVuZChjbG9uZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHRkZWNsc1RvUmVtb3ZlLmZvckVhY2goZGVjbCA9PiBkZWNsLnJlbW92ZSgpKTtcbn07Il19