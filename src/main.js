import 'babel-polyfill';
import postcss from 'postcss';
import { processOptions } from './lib/options';
import { createContainer, createUpdaterFn } from './lib/container';

process.on('unhandledRejection', console.error);

const plugin = postcss.plugin('postcss-split-value', options => {
	options = processOptions(options);

	return async function( CSS, RESULT ) {
		// setup containers for new files
		const containers = options.files.map(createContainer);
		const updateContainers = createUpdaterFn(containers);

		// get all the rules to be moved
		CSS.walkRules(updateContainers);
	}
});

export default plugin;