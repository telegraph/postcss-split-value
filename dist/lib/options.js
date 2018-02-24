'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.castToArray = exports.processOptions = undefined;

var _path = require('path');

const processOptions = exports.processOptions = (options = {}) => {
	options.outpath = options.outpath ? (0, _path.resolve)(options.outpath) : process.cwd();
	options.files = castToArray(options.files);
	options.files.forEach(file => {
		file.match = castToArray(file.match);
		file.skip = castToArray(file.skip);
	});
	return options;
};

const castToArray = exports.castToArray = (val = []) => {
	return Array.isArray(val) ? val : [val];
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvb3B0aW9ucy5qcyJdLCJuYW1lcyI6WyJwcm9jZXNzT3B0aW9ucyIsIm9wdGlvbnMiLCJvdXRwYXRoIiwicHJvY2VzcyIsImN3ZCIsImZpbGVzIiwiY2FzdFRvQXJyYXkiLCJmb3JFYWNoIiwiZmlsZSIsIm1hdGNoIiwic2tpcCIsInZhbCIsIkFycmF5IiwiaXNBcnJheSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVPLE1BQU1BLDBDQUFpQixDQUFFQyxVQUFVLEVBQVosS0FBb0I7QUFDakRBLFNBQVFDLE9BQVIsR0FBa0JELFFBQVFDLE9BQVIsR0FBa0IsbUJBQVFELFFBQVFDLE9BQWhCLENBQWxCLEdBQTZDQyxRQUFRQyxHQUFSLEVBQS9EO0FBQ0FILFNBQVFJLEtBQVIsR0FBZ0JDLFlBQVlMLFFBQVFJLEtBQXBCLENBQWhCO0FBQ0FKLFNBQVFJLEtBQVIsQ0FBY0UsT0FBZCxDQUFzQkMsUUFBUTtBQUM3QkEsT0FBS0MsS0FBTCxHQUFhSCxZQUFZRSxLQUFLQyxLQUFqQixDQUFiO0FBQ0FELE9BQUtFLElBQUwsR0FBWUosWUFBWUUsS0FBS0UsSUFBakIsQ0FBWjtBQUNBLEVBSEQ7QUFJQSxRQUFPVCxPQUFQO0FBQ0EsQ0FSTTs7QUFVQSxNQUFNSyxvQ0FBYyxDQUFFSyxNQUFNLEVBQVIsS0FBZ0I7QUFDMUMsUUFBT0MsTUFBTUMsT0FBTixDQUFjRixHQUFkLElBQXFCQSxHQUFyQixHQUEyQixDQUFDQSxHQUFELENBQWxDO0FBQ0EsQ0FGTSIsImZpbGUiOiJvcHRpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuXG5leHBvcnQgY29uc3QgcHJvY2Vzc09wdGlvbnMgPSAoIG9wdGlvbnMgPSB7fSApID0+IHtcblx0b3B0aW9ucy5vdXRwYXRoID0gb3B0aW9ucy5vdXRwYXRoID8gcmVzb2x2ZShvcHRpb25zLm91dHBhdGgpIDogcHJvY2Vzcy5jd2QoKTtcblx0b3B0aW9ucy5maWxlcyA9IGNhc3RUb0FycmF5KG9wdGlvbnMuZmlsZXMpO1xuXHRvcHRpb25zLmZpbGVzLmZvckVhY2goZmlsZSA9PiB7XG5cdFx0ZmlsZS5tYXRjaCA9IGNhc3RUb0FycmF5KGZpbGUubWF0Y2gpO1xuXHRcdGZpbGUuc2tpcCA9IGNhc3RUb0FycmF5KGZpbGUuc2tpcCk7XG5cdH0pO1xuXHRyZXR1cm4gb3B0aW9ucztcbn07XG5cbmV4cG9ydCBjb25zdCBjYXN0VG9BcnJheSA9ICggdmFsID0gW10gKSA9PiB7XG5cdHJldHVybiBBcnJheS5pc0FycmF5KHZhbCkgPyB2YWwgOiBbdmFsXTtcbn07XG4iXX0=