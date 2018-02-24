'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.write = exports.read = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const read = exports.read = filePath => {
	return new Promise((resolve, reject) => {
		(0, _fs.readFile)(filePath, 'utf-8', (err, fileContents) => {
			if (err) {
				reject(err);
			}
			resolve(fileContents);
		});
	});
};

const write = exports.write = (filePath, fileContents) => {
	return new Promise((resolve, reject) => {
		(0, _fs.writeFile)(filePath, fileContents, err => {
			if (err) {
				reject(err);
			}
			resolve(fileContents);
		});
	});
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvaW8uanMiXSwibmFtZXMiOlsicmVhZCIsImZpbGVQYXRoIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJlcnIiLCJmaWxlQ29udGVudHMiLCJ3cml0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFTyxNQUFNQSxzQkFBU0MsUUFBRixJQUFnQjtBQUNuQyxRQUFPLElBQUlDLE9BQUosQ0FBWSxDQUFFQyxPQUFGLEVBQVdDLE1BQVgsS0FBdUI7QUFDekMsb0JBQVNILFFBQVQsRUFBbUIsT0FBbkIsRUFBNEIsQ0FBRUksR0FBRixFQUFPQyxZQUFQLEtBQXlCO0FBQ3BELE9BQUtELEdBQUwsRUFBVztBQUNWRCxXQUFPQyxHQUFQO0FBQ0E7QUFDREYsV0FBUUcsWUFBUjtBQUNBLEdBTEQ7QUFNQSxFQVBNLENBQVA7QUFRQSxDQVRNOztBQVdBLE1BQU1DLHdCQUFRLENBQUVOLFFBQUYsRUFBWUssWUFBWixLQUE4QjtBQUNsRCxRQUFPLElBQUlKLE9BQUosQ0FBWSxDQUFFQyxPQUFGLEVBQVdDLE1BQVgsS0FBdUI7QUFDekMscUJBQVVILFFBQVYsRUFBb0JLLFlBQXBCLEVBQW9DRCxHQUFGLElBQVc7QUFDNUMsT0FBS0EsR0FBTCxFQUFXO0FBQ1ZELFdBQU9DLEdBQVA7QUFDQTtBQUNERixXQUFRRyxZQUFSO0FBQ0EsR0FMRDtBQU1BLEVBUE0sQ0FBUDtBQVFBLENBVE0iLCJmaWxlIjoiaW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IHJlYWRGaWxlLCB3cml0ZUZpbGUgfSBmcm9tICdmcyc7XG5cbmV4cG9ydCBjb25zdCByZWFkID0gKCBmaWxlUGF0aCApID0+IHtcblx0cmV0dXJuIG5ldyBQcm9taXNlKCggcmVzb2x2ZSwgcmVqZWN0ICkgPT4ge1xuXHRcdHJlYWRGaWxlKGZpbGVQYXRoLCAndXRmLTgnLCAoIGVyciwgZmlsZUNvbnRlbnRzICkgPT4ge1xuXHRcdFx0aWYgKCBlcnIgKSB7XG5cdFx0XHRcdHJlamVjdChlcnIpO1xuXHRcdFx0fVxuXHRcdFx0cmVzb2x2ZShmaWxlQ29udGVudHMpO1xuXHRcdH0pO1xuXHR9KTtcbn07XG5cbmV4cG9ydCBjb25zdCB3cml0ZSA9ICggZmlsZVBhdGgsIGZpbGVDb250ZW50cyApID0+IHtcblx0cmV0dXJuIG5ldyBQcm9taXNlKCggcmVzb2x2ZSwgcmVqZWN0ICkgPT4ge1xuXHRcdHdyaXRlRmlsZShmaWxlUGF0aCwgZmlsZUNvbnRlbnRzLCAoIGVyciApID0+IHtcblx0XHRcdGlmICggZXJyICkge1xuXHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdH1cblx0XHRcdHJlc29sdmUoZmlsZUNvbnRlbnRzKTtcblx0XHR9KTtcblx0fSk7XG59O1xuIl19