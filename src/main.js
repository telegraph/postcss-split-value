import 'babel-polyfill';
import postcss from 'postcss';
import { join } from 'path';
import { write } from './lib/io';
import { processOptions } from './lib/options';
import { createContainer, createUpdaterFn } from './lib/container';

process.on('unhandledRejection', console.error);

const plugin = postcss.plugin('postcss-split-value', options => {
	options = processOptions(options);

	return async function(CSS, RESULT) {
		// setup containers for new files
		const containers = options.files.map(createContainer);
		const updateContainers = createUpdaterFn(containers);

		// do the deed
		CSS.walkRules(updateContainers);

		// write files
		await Promise.all(
			containers.map(container => {
				const { outpath = options.outpath, name, result } = container;
				return write(join(outpath, name), result.toString());
			})
		);
	}
});

export default plugin;
