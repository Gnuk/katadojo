import { Command } from 'commander';

import { Generator } from './Generator';
import { Name } from './Name';

const program = new Command();

program
  .command('generate')
  .description('generate a kata template')
  .argument('<type>', 'template type')
  .argument('<name>', 'template name')
  .argument('<destination>', 'destination directory')
  .action(async (type, name, destination) => await Generator.of({ kind: type, name: Name.of(name), pathname: destination }).generate());

export { program };
