import { Command } from 'commander';

import { Generator } from './Generator';
import { Kata } from './Kata';
import { Name } from './Name';

export const command = (show: (...messages: string[]) => unknown): Command => {
  const program = new Command();

  program
    .command('generate')
    .description('generate a kata template')
    .argument('<slug>', 'kata slug')
    .argument('<name>', 'name as ASCII kebab-case')
    .argument('[destination]', 'destination directory', './')
    .action(
      async (kata: string, name: string, destination: string) =>
        await Generator.of({ kata: Kata.from(kata), name: Name.of(name), pathname: destination }).generate()
    );

  program
    .command('slugs')
    .description('list kata slugs')
    .action(() => {
      show(`Available slugs are: ${Kata.slugs().join(', ')}`);
    });

  return program;
};
