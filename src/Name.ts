const KEBAB_CASE = /^[a-z][a-z-]*[a-z]$|^[a-z]$/;

const normalize = (name: string): string => name.trim();

const isEmpty = (name: string): boolean => name.length === 0;

const notEmpty = (name: string): void => {
  if (isEmpty(name)) {
    throw new Error('The name is empty');
  }
};

const onlyKebabCase = (name: string): void => {
  if (!KEBAB_CASE.test(name)) {
    throw new Error(`The name "${name}" is not in ASCII kebab-case`);
  }
};

export class Name {
  constructor(private readonly name: string) {
    this.name = normalize(name);
    notEmpty(this.name);
    onlyKebabCase(this.name);
  }

  static of(name: string): Name {
    return new Name(name);
  }

  get(): string {
    return this.name;
  }
}
