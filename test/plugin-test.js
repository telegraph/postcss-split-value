import test from 'ava';
import postcss from 'postcss';
import tempy from 'tempy';
import splitValue from '../dist/main';
import { existsSync as fileExists, readdirSync } from 'fs';
import { exec } from 'shelljs';
import { read, write } from '../dist/lib/io';

let CSS;

test.before(async() => {
	CSS = await read('./test/fixtures/test.css');
});

test('it returns a css string', async t => {
	const { css } = await postcss([splitValue]).process(CSS);
	t.is(typeof css, 'string');
});

test('it strips properties where the value matches and options.remove is true', async t => {
	const opts = {
		files: [{
			match: /var\(--value-1/,
			target: /#does-not-exist/i,
			remove: true
		}]
	};
	const { css } = await postcss([splitValue(opts)]).process(CSS);
	t.false(css.includes('margin-top'));
});

test('it does not strip properties where the value matches and options.remove is false', async t => {
	const opts = {
		files: [{
			match: /var\(--value-1/,
			remove: false
		}]
	};
	const { css } = await postcss([splitValue(opts)]).process(CSS);
	t.true(css.includes('margin-top'));
});

test('it only captures matching properties', async t => {
	const opts = {
		files: [{
			match: /var\(--value-1/,
			target: /:root/i
		}]
	};
	const { css } = await postcss([splitValue(opts)]).process(CSS);

	// debugging help code
	// const files = await readdirSync(dir, {});
	// const output2 = await read(`${dir}/output.0.css`);
	// console.log('\naz:', files);
	// console.log('\nbz:', output);
	// console.log('\ncz:', output2);

	//TODO: return both altered input and output for test
	t.true(css.includes('.test-value-1'));
	t.false(css.includes('border-width'));
});

test('it strips multiple properties where the value matches and remove is set', async t => {
	const opts = {
		outpath: tempy.directory(),
		files: [{
			name: 'value-both.css',
			match: [
				/var\(--value-1/,
				/var\(--value-2/
			],
			remove: true
		}]
	};
	const { css } = await postcss([splitValue(opts)]).process(CSS);
	t.false(
		css.includes('margin-top') &&
		css.includes('margin-right') &&
		css.includes('margin-left') &&
		css.includes('padding-left')
	);
});

// test('it creates the specified files', async t => {
// 	const dir = tempy.directory();
// 	const opts = {
// 		outpath: dir,
// 		files: [{
// 			name: 'this-will-exist.css',
// 			match: /var\(--value-1/,
// 		}]
// 	};
// 	await postcss([splitValue(opts)]).process(CSS);
//
// 	t.true(fileExists(`${dir}/this-will-exist.css`));
// });

// test('it places captured css in the specified files', async t => {
// 	const dir = tempy.directory();
// 	const opts = {
// 		outpath: dir,
// 		files: [{
// 			name: 'output.css',
// 			match: /var\(--value-/
// 		}]
// 	};
// 	await postcss([splitValue(opts)]).process(CSS);
//
// 	const output = await read(`${dir}/output.css`);
//
// 	t.true(output.includes('.test-value-1'));
// });

// test('it will repeat captured css in multiple files', async t => {
// 	const dir = tempy.directory();
// 	const opts = {
// 		outpath: dir,
// 		files: [{
// 			name: 'file1.css',
// 			match: /var\(--value-/
// 		}, {
// 			name: 'file2.css',
// 			match: /var\(--value-/
// 		}]
// 	};
// 	await postcss([splitValue(opts)]).process(CSS);
//
// 	const [file1, file2] = await Promise.all([
// 		read(`${dir}/file1.css`),
// 		read(`${dir}/file2.css`)
// 	]);
//
// 	t.true(
// 		file1.includes('.test-value-1') &&
// 		file2.includes('.test-value-1')
// 	);
// });

// test('it will skip queries if `skip` expressions are configured', async t => {
// 	const dir = tempy.directory();
// 	const opts = {
// 		outpath: dir,
// 		files: [{
// 			name: 'skip.css',
// 			match: /var\(--value-/,
// 			skip: /var\(--value-1/
// 		}]
// 	};
// 	await postcss([splitValue(opts)]).process(CSS);
//
// 	const output = await read(`${dir}/skip.css`);
//
// 	t.false(output.includes('.test-value-1'));
// });

// test('it will keep the tree of matched values', async t => {
// 	const dir = tempy.directory();
// 	const opts = {
// 		outpath: dir,
// 		files: [{
// 			name: 'output.css',
// 			match: /var\(--value-/
// 		}]
// 	};
// 	await postcss([splitValue(opts)]).process(CSS);
//
// 	const output = await read(`${dir}/output.css`);
//
// 	t.true(output.includes('min-width'));
// 	t.true(output.includes('.test-inside-mq-move-one'));
// });
