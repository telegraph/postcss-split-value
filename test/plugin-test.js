import test from 'ava';
import postcss from 'postcss';
import tempy from 'tempy';
import splitValue from '../dist/main';
import { existsSync as fileExists } from 'fs';
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

test('it strips properties where the value matches', async t => {
	const opts = {
		outpath: tempy.directory(),
		files: [{
			name: 'value.css',
			match: /var\(--value-1/
		}]
	};
	const { css } = await postcss([splitValue(opts)]).process(CSS);
	t.false(css.includes('margin-top'));
});

test('it only captures matching properties', async t => {
	const dir = tempy.directory();
	const opts = {
		outpath: dir,
		files: [{
			name: 'output.css',
			match: /var\(--value-1/
		}]
	};
	await postcss([splitValue(opts)]).process(CSS);

	const output = await read(`${dir}/output.css`);

	t.true(output.includes('.test-value-1'));
	t.false(output.includes('border-width'));
});

test('it strips multiple properties where the value matches', async t => {
	const opts = {
		outpath: tempy.directory(),
		files: [{
			name: 'value-both.css',
			match: [
				/var\(--value-1/,
				/var\(--value-2/
			]
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

test('it creates the specified files', async t => {
	const dir = tempy.directory();
	const opts = {
		outpath: dir,
		files: [{
			name: 'this-will-exist.css',
			match: /var\(--value-1/,
		}]
	};
	await postcss([splitValue(opts)]).process(CSS);

	t.true(fileExists(`${dir}/this-will-exist.css`));
});

test('it places captured css in the specified files', async t => {
	const dir = tempy.directory();
	const opts = {
		outpath: dir,
		files: [{
			name: 'output.css',
			match: /var\(--value-/
		}]
	};
	await postcss([splitValue(opts)]).process(CSS);

	const output = await read(`${dir}/output.css`);

	t.true(output.includes('.test-value-1'));
});

test('it will repeat captured css in multiple files', async t => {
	const dir = tempy.directory();
	const opts = {
		outpath: dir,
		files: [{
			name: 'file1.css',
			match: /var\(--value-/
		}, {
			name: 'file2.css',
			match: /var\(--value-/
		}]
	};
	await postcss([splitValue(opts)]).process(CSS);

	const [file1, file2] = await Promise.all([
		read(`${dir}/file1.css`),
		read(`${dir}/file2.css`)
	]);

	t.true(
		file1.includes('.test-value-1') &&
		file2.includes('.test-value-1')
	);
});

test('it will skip queries if `skip` expressions are configured', async t => {
	const dir = tempy.directory();
	const opts = {
		outpath: dir,
		files: [{
			name: 'skip.css',
			match: /var\(--value-/,
			skip: /var\(--value-1/
		}]
	};
	await postcss([splitValue(opts)]).process(CSS);

	const output = await read(`${dir}/skip.css`);

	t.false(output.includes('.test-value-1'));
});

test('it will keep the tree of matched values', async t => {
	const dir = tempy.directory();
	const opts = {
		outpath: dir,
		files: [{
			name: 'output.css',
			match: /var\(--value-/
		}]
	};
	await postcss([splitValue(opts)]).process(CSS);

	const output = await read(`${dir}/output.css`);

	t.true(output.includes('min-width'));
	t.true(output.includes('.test-inside-mq-move-one'));
});
