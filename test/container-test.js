import test from 'ava';
import postcss from 'postcss';
import { createContainer, createUpdaterFn } from '../dist/lib/container';

// test('createContainer returns an object with an added `result` property', t => {
//   const container = createContainer({ foo: true });
//   t.truthy(container.result);
// });
//
// test('container.result will be a postcss container', t => {
//   const container = createContainer({ foo: true });
//   t.deepEqual(container.result, postcss.root());
// });

test('createUpdaterFn creates a function', t => {
  const containers = [ createContainer({ foo: true })];
  const updateContainers = createUpdaterFn(containers);
  t.is(typeof updateContainers, 'function');
});

test('updater function updates a set of containers', t => {
  const containers = [
    createContainer({ match: [/--value-1/i], target: [/:root/], skip: [] }),
    createContainer({ match: [/--value-2/i], target: [/:root/i], skip: [] })
  ];
  const updateContainers = createUpdaterFn(containers);
  const root = postcss.parse(':root { --test: red; } .test-value-1 { top: var(--value-1); } .test-value-2 { right: var(--value-2); }');
  const rule1 = root.nodes[1];
  const rule2 = root.last;

  updateContainers(rule1);
  updateContainers(rule2);

  t.is(containers[0].result.toString(), ' .test-value-1 { top: var(--value-1); }');
  t.is(containers[1].result.toString(), ' .test-value-2 { right: var(--value-2); }');
});
