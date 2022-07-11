import * as fs from 'fs';

const fileExists = (pathname: string): boolean => fs.lstatSync(pathname).isFile();
const dirExists = (pathname: string): boolean => fs.lstatSync(pathname).isDirectory();

const toBeFileable =
  (check: (checked: string) => boolean, kind: string) =>
  (received: string): void => {
    if (!fs.existsSync(received)) {
      throw new Error(`${received} does not exists`);
    }
    if (!check(received)) {
      throw new Error(`${received} is not a ${kind}`);
    }
  };

export const expectToBeAFile = toBeFileable(fileExists, 'file');
export const expectToBeADir = toBeFileable(dirExists, 'directory');
