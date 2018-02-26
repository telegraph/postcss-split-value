'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _streamStream = require('stream-stream');

var _streamStream2 = _interopRequireDefault(_streamStream);

var _path = require('path');

var _io = require('./lib/io');

var _options = require('./lib/options');

var _container = require('./lib/container');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.on('unhandledRejection', console.error);

const plugin = _postcss2.default.plugin('postcss-split-value', options => {
	options = (0, _options.processOptions)(options);

	return async function (CSS, RESULT) {
		// setup containers for new files
		const containers = options.files.map(_container.createContainer);
		const updateContainers = (0, _container.createUpdaterFn)(containers);

		// do the work
		CSS.walkRules(updateContainers);

		// write files
		await Promise.all(containers.map(container => {
			const { outpath = options.outpath, name, result, files } = container;
			const file = (0, _path.join)(outpath, name);
			return (0, _io.write)(file, result.toString(), { flags: 'a' });
		})

		// containers.map(container => {
		// 	const { outpath = options.outpath, name, result, files } = container;
		// 	const baseFile = join(outpath, name);
		// 	const ws = fs.createWriteStream(baseFile, { flags: 'a' });
		// 	const stream = ss();
		//
		// 	files.forEach( file => {
		// 		stream.write(fs.createReadStream(file));
		// 	});
		// 	stream.end();
		// 	stream.pipe(ws);
		// })
		);
	};
});

exports.default = plugin;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbInByb2Nlc3MiLCJvbiIsImNvbnNvbGUiLCJlcnJvciIsInBsdWdpbiIsIm9wdGlvbnMiLCJDU1MiLCJSRVNVTFQiLCJjb250YWluZXJzIiwiZmlsZXMiLCJtYXAiLCJ1cGRhdGVDb250YWluZXJzIiwid2Fsa1J1bGVzIiwiUHJvbWlzZSIsImFsbCIsImNvbnRhaW5lciIsIm91dHBhdGgiLCJuYW1lIiwicmVzdWx0IiwiZmlsZSIsInRvU3RyaW5nIiwiZmxhZ3MiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUFBLFFBQVFDLEVBQVIsQ0FBVyxvQkFBWCxFQUFpQ0MsUUFBUUMsS0FBekM7O0FBRUEsTUFBTUMsU0FBUyxrQkFBUUEsTUFBUixDQUFlLHFCQUFmLEVBQXNDQyxXQUFXO0FBQy9EQSxXQUFVLDZCQUFlQSxPQUFmLENBQVY7O0FBRUEsUUFBTyxnQkFBZ0JDLEdBQWhCLEVBQXFCQyxNQUFyQixFQUE4QjtBQUNwQztBQUNBLFFBQU1DLGFBQWFILFFBQVFJLEtBQVIsQ0FBY0MsR0FBZCw0QkFBbkI7QUFDQSxRQUFNQyxtQkFBbUIsZ0NBQWdCSCxVQUFoQixDQUF6Qjs7QUFFQTtBQUNBRixNQUFJTSxTQUFKLENBQWNELGdCQUFkOztBQUVBO0FBQ0EsUUFBTUUsUUFBUUMsR0FBUixDQUNMTixXQUFXRSxHQUFYLENBQWVLLGFBQWE7QUFDM0IsU0FBTSxFQUFFQyxVQUFVWCxRQUFRVyxPQUFwQixFQUE2QkMsSUFBN0IsRUFBbUNDLE1BQW5DLEVBQTJDVCxLQUEzQyxLQUFxRE0sU0FBM0Q7QUFDQSxTQUFNSSxPQUFPLGdCQUFLSCxPQUFMLEVBQWNDLElBQWQsQ0FBYjtBQUNBLFVBQU8sZUFBTUUsSUFBTixFQUFZRCxPQUFPRSxRQUFQLEVBQVosRUFBK0IsRUFBRUMsT0FBTyxHQUFULEVBQS9CLENBQVA7QUFDQSxHQUpEOztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWxCSyxHQUFOO0FBcUJBLEVBOUJEO0FBK0JBLENBbENjLENBQWY7O2tCQW9DZWpCLE0iLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnYmFiZWwtcG9seWZpbGwnO1xuaW1wb3J0IHBvc3Rjc3MgZnJvbSAncG9zdGNzcyc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHNzIGZyb20gJ3N0cmVhbS1zdHJlYW0nO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgd3JpdGUgfSBmcm9tICcuL2xpYi9pbyc7XG5pbXBvcnQgeyBwcm9jZXNzT3B0aW9ucyB9IGZyb20gJy4vbGliL29wdGlvbnMnO1xuaW1wb3J0IHsgY3JlYXRlQ29udGFpbmVyLCBjcmVhdGVVcGRhdGVyRm4gfSBmcm9tICcuL2xpYi9jb250YWluZXInO1xuXG5wcm9jZXNzLm9uKCd1bmhhbmRsZWRSZWplY3Rpb24nLCBjb25zb2xlLmVycm9yKTtcblxuY29uc3QgcGx1Z2luID0gcG9zdGNzcy5wbHVnaW4oJ3Bvc3Rjc3Mtc3BsaXQtdmFsdWUnLCBvcHRpb25zID0+IHtcblx0b3B0aW9ucyA9IHByb2Nlc3NPcHRpb25zKG9wdGlvbnMpO1xuXG5cdHJldHVybiBhc3luYyBmdW5jdGlvbiggQ1NTLCBSRVNVTFQgKSB7XG5cdFx0Ly8gc2V0dXAgY29udGFpbmVycyBmb3IgbmV3IGZpbGVzXG5cdFx0Y29uc3QgY29udGFpbmVycyA9IG9wdGlvbnMuZmlsZXMubWFwKGNyZWF0ZUNvbnRhaW5lcik7XG5cdFx0Y29uc3QgdXBkYXRlQ29udGFpbmVycyA9IGNyZWF0ZVVwZGF0ZXJGbihjb250YWluZXJzKTtcblxuXHRcdC8vIGRvIHRoZSB3b3JrXG5cdFx0Q1NTLndhbGtSdWxlcyh1cGRhdGVDb250YWluZXJzKTtcblxuXHRcdC8vIHdyaXRlIGZpbGVzXG5cdFx0YXdhaXQgUHJvbWlzZS5hbGwoXG5cdFx0XHRjb250YWluZXJzLm1hcChjb250YWluZXIgPT4ge1xuXHRcdFx0XHRjb25zdCB7IG91dHBhdGggPSBvcHRpb25zLm91dHBhdGgsIG5hbWUsIHJlc3VsdCwgZmlsZXMgfSA9IGNvbnRhaW5lcjtcblx0XHRcdFx0Y29uc3QgZmlsZSA9IGpvaW4ob3V0cGF0aCwgbmFtZSk7XG5cdFx0XHRcdHJldHVybiB3cml0ZShmaWxlLCByZXN1bHQudG9TdHJpbmcoKSwgeyBmbGFnczogJ2EnIH0pO1xuXHRcdFx0fSksXG5cblx0XHRcdC8vIGNvbnRhaW5lcnMubWFwKGNvbnRhaW5lciA9PiB7XG5cdFx0XHQvLyBcdGNvbnN0IHsgb3V0cGF0aCA9IG9wdGlvbnMub3V0cGF0aCwgbmFtZSwgcmVzdWx0LCBmaWxlcyB9ID0gY29udGFpbmVyO1xuXHRcdFx0Ly8gXHRjb25zdCBiYXNlRmlsZSA9IGpvaW4ob3V0cGF0aCwgbmFtZSk7XG5cdFx0XHQvLyBcdGNvbnN0IHdzID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0oYmFzZUZpbGUsIHsgZmxhZ3M6ICdhJyB9KTtcblx0XHRcdC8vIFx0Y29uc3Qgc3RyZWFtID0gc3MoKTtcblx0XHRcdC8vXG5cdFx0XHQvLyBcdGZpbGVzLmZvckVhY2goIGZpbGUgPT4ge1xuXHRcdFx0Ly8gXHRcdHN0cmVhbS53cml0ZShmcy5jcmVhdGVSZWFkU3RyZWFtKGZpbGUpKTtcblx0XHRcdC8vIFx0fSk7XG5cdFx0XHQvLyBcdHN0cmVhbS5lbmQoKTtcblx0XHRcdC8vIFx0c3RyZWFtLnBpcGUod3MpO1xuXHRcdFx0Ly8gfSlcblx0XHQpXG5cblx0fVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHBsdWdpbjsiXX0=