import { expect, describe, it } from 'vitest';

import { Kata, Kind, Slug } from './Kata';

describe('Kata', () => {
  it.each<[Kind, Slug, string]>([
    ['ts-jest', 'ts', 'https://github.com/Gnuk/template-ts-kata'],
    ['ts-jest', 'ts-jest', 'https://github.com/Gnuk/template-ts-kata'],
    ['ts-vitest', 'ts-vitest', 'https://github.com/Gnuk/template-ts-vite-kata'],
    ['py', 'py', 'https://github.com/Gnuk/template-python-kata'],
    ['php', 'php', 'https://github.com/Gnuk/template-php-kata'],
    ['java', 'java', 'https://github.com/cvirieux/template-java-kata'],
  ])('Should get %s kind for %s slug', (kind, slug, repository) => {
    const kata = Kata.for(slug);

    expect(kata.kind).toBe(kind);
    expect(kata.repository).toBe(repository);
  });

  it.each(['invalid', 'not a language'])('Should not get from invalid slug for %s', (slug: string) =>
    expect(() => Kata.from(slug)).toThrowError(/^The slug ".+" is not in the slugs: [a-z-, ]+$/)
  );

  it.each([' ts\n', '\tpython'])('Should normalize slug for "%s', (slug) => expect(() => Kata.from(slug)).not.toThrow());

  it('Should contains kind from slugs', () => {
    expect(Kata.slugs()).toEqual(expect.arrayContaining(['ts', 'typescript', 'py', 'python']));
  });
});
