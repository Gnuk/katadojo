const KINDS = ['ts-jest', 'ts-vitest', 'py', 'php', 'java'] as const;
const SLUGS = [...KINDS, 'ts', 'ts-vite', 'typescript', 'python'] as const;

export type Kind = typeof KINDS[number];
export type Slug = typeof SLUGS[number];
type CustomSlug = Exclude<Slug, Kind>;

const CUSTOM_SLUG_TO_KIND: Record<CustomSlug, Kind> = {
  ['ts']: 'ts-jest',
  ['ts-vite']: 'ts-vitest',
  ['typescript']: 'ts-jest',
  ['python']: 'py',
};

const KIND_TO_REPOSITORY: Record<Kind, string> = {
  ['ts-jest']: 'https://github.com/Gnuk/template-ts-kata',
  ['ts-vitest']: 'https://github.com/Gnuk/template-ts-vite-kata',
  ['py']: 'https://github.com/Gnuk/template-python-kata',
  ['php']: 'https://github.com/Gnuk/template-php-kata',
  ['java']: 'https://github.com/cvirieux/template-java-kata',
};

const kindHasNot = (slug: string): boolean => KINDS.findIndex((kind) => kind === slug) === -1;

const slugToKind = (slug: Slug): Kind => {
  if (kindHasNot(slug)) {
    return CUSTOM_SLUG_TO_KIND[slug as CustomSlug];
  }
  return slug as Kind;
};

const assertSlug = (slug: string): Slug => {
  const trimSlug = slug.trim();
  if (SLUGS.findIndex((s) => s === trimSlug) === -1) {
    throw new Error(`The slug "${trimSlug}" is not in the slugs: ${SLUGS.join(', ')}`);
  }
  return trimSlug as Slug;
};

export class Kata {
  private constructor(readonly kind: Kind, readonly repository: string) {}

  static for(slug: Slug): Kata {
    const kind = slugToKind(slug);
    const repository = KIND_TO_REPOSITORY[kind];

    return new Kata(kind, repository);
  }

  static slugs() {
    return SLUGS;
  }

  static from(slug: string): Kata {
    return Kata.for(assertSlug(slug));
  }
}
