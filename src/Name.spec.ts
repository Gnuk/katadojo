import { describe, expect, it } from 'vitest';

import { Name } from './Name';

describe('Name', () => {
  it.each(['', ' ', '\t', '\n', '\r\n '])('Should not build without name: "%s"', (name) =>
    expect(() => Name.of(name)).toThrowError('The name is empty')
  );

  it.each([
    ['example', 'example'],
    ['dashed-example', 'dashed-example'],
    ['trim-example', '\t\ntrim-example '],
    ['a', 'a'],
  ])('Should get %s build with %s', (expected, actual) => expect(Name.of(actual).get()).toBe(expected));

  it.each(['à', '-', '-starting-with-dash', 'ending-with-dash-'])('Should not accept "%s"', (name) =>
    expect(() => Name.of(name)).toThrowError(`The name "${name}" is not in ASCII kebab-case`)
  );
});
