import * as path from 'path';

import * as fse from 'fs-extra';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';

import { command } from './Command';
import { expectToBeAFile } from './Path.fixture';

const GENERATED = path.resolve(__dirname, 'generated-command');

const spyConsole =
  (fake: string[] = []) =>
  (...messages: string[]): unknown =>
    fake.push(...messages);

describe('Command', () => {
  beforeEach(() => {
    fse.removeSync(GENERATED);
  });
  afterAll(() => fse.removeSync(GENERATED));

  it('Should generates a template', async () => {
    await command(spyConsole()).parseAsync(['', '', 'generate', 'ts', 'example', GENERATED]);

    expectToBeAFile(path.resolve(GENERATED, 'example/package.json'));
  });

  it('Should generates a template using default path', async () => {
    fse.removeSync('./example');

    await command(spyConsole()).parseAsync(['', '', 'generate', 'ts', 'example']);

    expectToBeAFile(path.resolve('./', 'example/package.json'));

    fse.removeSync('./example');
  });

  it('Should list kata slugs', () => {
    const fakeConsole: string[] = [];
    command(spyConsole(fakeConsole)).parse(['', '', 'slugs']);

    const [slugs] = fakeConsole;
    expect(slugs).toMatch(/^Available slugs are: [a-z-, ]+$/);
  });
});
