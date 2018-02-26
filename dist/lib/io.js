'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.write = exports.read = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const read = exports.read = filePath => {
	return new Promise((resolve, reject) => {
		_fs2.default.readFile(filePath, 'utf-8', (err, fileContents) => {
			if (err) {
				reject(err);
			}
			resolve(fileContents);
		});
	});
};

const write = exports.write = (filePath, fileContents, options) => {
	return new Promise((resolve, reject) => {
		// use {'flags': 'a'} to append and {'flags': 'w'} to erase and write a new file
		let ws = _fs2.default.createWriteStream(filePath, options);
		ws.write(fileContents);
		ws.end();
		ws.on('finish', () => {
			resolve();
		});
		ws.on('error', reject);
	});
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvaW8uanMiXSwibmFtZXMiOlsicmVhZCIsImZpbGVQYXRoIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZWFkRmlsZSIsImVyciIsImZpbGVDb250ZW50cyIsIndyaXRlIiwib3B0aW9ucyIsIndzIiwiY3JlYXRlV3JpdGVTdHJlYW0iLCJlbmQiLCJvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7Ozs7QUFFTyxNQUFNQSxzQkFBU0MsUUFBRixJQUFnQjtBQUNuQyxRQUFPLElBQUlDLE9BQUosQ0FBWSxDQUFFQyxPQUFGLEVBQVdDLE1BQVgsS0FBdUI7QUFDekMsZUFBR0MsUUFBSCxDQUFZSixRQUFaLEVBQXNCLE9BQXRCLEVBQStCLENBQUVLLEdBQUYsRUFBT0MsWUFBUCxLQUF5QjtBQUN2RCxPQUFLRCxHQUFMLEVBQVc7QUFDVkYsV0FBT0UsR0FBUDtBQUNBO0FBQ0RILFdBQVFJLFlBQVI7QUFDQSxHQUxEO0FBTUEsRUFQTSxDQUFQO0FBUUEsQ0FUTTs7QUFXQSxNQUFNQyx3QkFBUSxDQUFFUCxRQUFGLEVBQVlNLFlBQVosRUFBMEJFLE9BQTFCLEtBQXVDO0FBQzNELFFBQU8sSUFBSVAsT0FBSixDQUFZLENBQUVDLE9BQUYsRUFBV0MsTUFBWCxLQUF1QjtBQUN6QztBQUNBLE1BQUlNLEtBQUssYUFBR0MsaUJBQUgsQ0FBcUJWLFFBQXJCLEVBQStCUSxPQUEvQixDQUFUO0FBQ0FDLEtBQUdGLEtBQUgsQ0FBU0QsWUFBVDtBQUNBRyxLQUFHRSxHQUFIO0FBQ0FGLEtBQUdHLEVBQUgsQ0FBTSxRQUFOLEVBQWdCLE1BQU07QUFDckJWO0FBQ0EsR0FGRDtBQUdBTyxLQUFHRyxFQUFILENBQU0sT0FBTixFQUFlVCxNQUFmO0FBQ0EsRUFUTSxDQUFQO0FBVUEsQ0FYTSIsImZpbGUiOiJpby5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcyc7XG5cbmV4cG9ydCBjb25zdCByZWFkID0gKCBmaWxlUGF0aCApID0+IHtcblx0cmV0dXJuIG5ldyBQcm9taXNlKCggcmVzb2x2ZSwgcmVqZWN0ICkgPT4ge1xuXHRcdGZzLnJlYWRGaWxlKGZpbGVQYXRoLCAndXRmLTgnLCAoIGVyciwgZmlsZUNvbnRlbnRzICkgPT4ge1xuXHRcdFx0aWYgKCBlcnIgKSB7XG5cdFx0XHRcdHJlamVjdChlcnIpO1xuXHRcdFx0fVxuXHRcdFx0cmVzb2x2ZShmaWxlQ29udGVudHMpO1xuXHRcdH0pO1xuXHR9KTtcbn07XG5cbmV4cG9ydCBjb25zdCB3cml0ZSA9ICggZmlsZVBhdGgsIGZpbGVDb250ZW50cywgb3B0aW9ucyApID0+IHtcblx0cmV0dXJuIG5ldyBQcm9taXNlKCggcmVzb2x2ZSwgcmVqZWN0ICkgPT4ge1xuXHRcdC8vIHVzZSB7J2ZsYWdzJzogJ2EnfSB0byBhcHBlbmQgYW5kIHsnZmxhZ3MnOiAndyd9IHRvIGVyYXNlIGFuZCB3cml0ZSBhIG5ldyBmaWxlXG5cdFx0bGV0IHdzID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0oZmlsZVBhdGgsIG9wdGlvbnMpO1xuXHRcdHdzLndyaXRlKGZpbGVDb250ZW50cyk7XG5cdFx0d3MuZW5kKCk7XG5cdFx0d3Mub24oJ2ZpbmlzaCcsICgpID0+IHtcblx0XHRcdHJlc29sdmUoKTtcblx0XHR9KTtcblx0XHR3cy5vbignZXJyb3InLCByZWplY3QpO1xuXHR9KTtcbn07XG5cbiJdfQ==