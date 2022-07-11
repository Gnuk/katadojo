import * as path from 'path';

import * as fse from 'fs-extra';
import { afterAll, beforeEach, describe, it } from 'vitest';

import { program } from './Command';
import { expectToBeAFile } from './Path.fixture';

const GENERATED = path.resolve(__dirname, 'generated-command');

describe('Command', () => {
  beforeEach(() => fse.removeSync(GENERATED));
  afterAll(() => fse.removeSync(GENERATED));

  it('Should generates a template', async () => {
    await program.parseAsync(['', '', 'generate', 'ts', 'example', GENERATED]);

    expectToBeAFile(path.resolve(GENERATED, 'example/package.json'));
  });
});
