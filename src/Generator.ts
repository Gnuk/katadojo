import * as path from 'path';

import * as fs from 'fs-extra';
import { simpleGit } from 'simple-git';

import { Kata } from './Kata';
import { Name } from './Name';

export interface GeneratorContent {
  kata: Kata;
  name: Name;
  pathname: string;
}

export class Generator {
  private readonly globalpath: string;

  constructor(private readonly kata: Kata, name: Name, private readonly pathname: string) {
    this.globalpath = path.resolve(pathname, name.get());
  }

  public static of({ kata, name, pathname }: GeneratorContent): Generator {
    return new Generator(kata, name, pathname);
  }

  async generate() {
    fs.ensureDirSync(this.globalpath);
    await simpleGit().clone(this.kata.repository, this.globalpath);
  }
}
