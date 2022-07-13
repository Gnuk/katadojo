import * as path from 'path';

import * as fse from 'fs-extra';
import { afterAll, beforeEach, describe, it } from 'vitest';

import { Generator, Kind } from './Generator';
import { Name } from './Name';
import { expectToBeADir, expectToBeAFile } from './Path.fixture';

const GENERATED = path.resolve(__dirname, 'generated-generator');

const generatedPath =
  (name: Kind) =>
  (...paths: string[]): string =>
    path.resolve(GENERATED, `${name}-example`, ...paths);

const generation = (kind: Kind): Generator => Generator.of({ kind, name: Name.of(`${kind}-example`), pathname: GENERATED });

const expectGeneration = async (kind: Kind, ...files: string[]): Promise<void> => {
  await generation(kind).generate();

  const generationPath = generatedPath(kind);
  expectToBeADir(generationPath());
  files.map((pathname) => generationPath(pathname)).forEach(expectToBeAFile);
};

describe('Generator', () => {
  beforeEach(() => fse.removeSync(GENERATED));
  afterAll(() => fse.removeSync(GENERATED));

  it('Should clone ts template', async () => await expectGeneration('ts', 'package.json', 'jest.config.js'));
  it('Should clone python template', async () => await expectGeneration('python', 'Pipfile'));
  it('Should clone ts-vite template', async () => await expectGeneration('ts-vite', 'package.json'));
  it('Should clone php template', async () => await expectGeneration('php', 'composer.json', 'phpunit.xml'));
});
