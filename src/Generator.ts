import * as path from 'path';

import * as fs from 'fs-extra';
import { simpleGit } from 'simple-git';

export type Kind = 'ts' | 'python' | 'ts-vite' | 'php';

export const isEmpty = (name: string): boolean => name.trim().length === 0;

export class Generator {
  private readonly globalpath: string;

  constructor(private readonly kind: Kind, name: string, private readonly pathname: string) {
    if (isEmpty(name)) {
      throw new Error('Impossible to generate a template without name');
    }
    this.globalpath = path.resolve(pathname, name);
  }

  async generate() {
    fs.ensureDirSync(this.globalpath);
    await simpleGit().clone(`https://github.com/Gnuk/template-${this.kind}-kata`, this.globalpath);
  }
}
