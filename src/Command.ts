import { Command } from 'commander';

import { Generator } from './Generator';

const program = new Command();

program
  .command('generate')
  .description('generate a kata template')
  .argument('<type>', 'template type')
  .argument('<name>', 'template name')
  .argument('<destination>', 'destination directory')
  .action(async (type, name, destination) => await new Generator(type, name, destination).generate());

export { program };
