import * as path from 'path';

import * as fs from 'fs-extra';
import { simpleGit } from 'simple-git';

import { Name } from './Name';

export type Kind = 'ts' | 'python' | 'ts-vite' | 'php';

export const isEmpty = (name: string): boolean => name.trim().length === 0;

export interface GeneratorContent {
  kind: Kind;
  name: Name;
  pathname: string;
}

export class Generator {
  private readonly globalpath: string;

  constructor(private readonly kind: Kind, name: Name, private readonly pathname: string) {
    this.globalpath = path.resolve(pathname, name.get());
  }

  public static of({ kind, name, pathname }: GeneratorContent): Generator {
    return new Generator(kind, name, pathname);
  }

  async generate() {
    fs.ensureDirSync(this.globalpath);
    await simpleGit().clone(`https://github.com/Gnuk/template-${this.kind}-kata`, this.globalpath);
  }
}
