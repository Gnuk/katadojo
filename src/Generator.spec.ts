import * as path from 'path';

import * as fse from 'fs-extra';
import { afterAll, beforeEach, describe, it } from 'vitest';

import { Generator } from './Generator';
import { Kata, Slug } from './Kata';
import { Name } from './Name';
import { expectToBeADir, expectToBeAFile } from './Path.fixture';

const GENERATED = path.resolve(__dirname, 'generated-generator');

const generatedPath =
  (name: string) =>
  (...paths: string[]): string =>
    path.resolve(GENERATED, `${name}-example`, ...paths);

const generation = (slug: Slug): Generator => Generator.of({ kata: Kata.for(slug), name: Name.of(`${slug}-example`), pathname: GENERATED });

const expectGeneration = async (slug: Slug, ...files: string[]): Promise<void> => {
  await generation(slug).generate();

  const generationPath = generatedPath(slug);
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
