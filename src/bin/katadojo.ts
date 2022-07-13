#!/usr/bin/env node

import { command } from '../Command';

command(console.log)
  .parseAsync(process.argv)
  .catch((e: Error) => {
    console.error(e.message);
    process.exit(1);
  });
