import * as path from 'path';

import * as fse from 'fs-extra';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';

import { Generator, Kind } from './Generator';
import { expectToBeADir, expectToBeAFile } from './Path.fixture';

const GENERATED = path.resolve(__dirname, 'generated-generator');

const generatedPath =
  (name: Kind) =>
  (...paths: string[]): string =>
    path.resolve(GENERATED, `${name}-example`, ...paths);

const generation = (kind: Kind): Generator => new Generator(kind, `${kind}-example`, GENERATED);

const expectGeneration = async (kind: Kind, ...files: string[]): Promise<void> => {
  await generation(kind).generate();

  const generationPath = generatedPath(kind);
  expectToBeADir(generationPath());
  files.map((pathname) => generationPath(pathname)).forEach(expectToBeAFile);
};

describe('Generator', () => {
  beforeEach(() => fse.removeSync(GENERATED));
  afterAll(() => fse.removeSync(GENERATED));

  it.each(['', ' ', '\t', '\n', '\r\n '])('Should not build without name for the empty "%s"', (empty) =>
    expect(() => new Generator('ts', empty, GENERATED)).toThrowError('Impossible to generate a template without name')
  );
  it('Should clone ts template', async () => await expectGeneration('ts', 'package.json', 'jest.config.js'));
  it('Should clone python template', async () => await expectGeneration('python', 'Pipfile'));
  it('Should clone ts-vite template', async () => await expectGeneration('ts-vite', 'package.json'));
  it('Should clone php template', async () => await expectGeneration('php', 'composer.json', 'phpunit.xml'));
});
