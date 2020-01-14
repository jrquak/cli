/* npm dependencies */

import program from 'commander';
import { CommandActions } from './types';

/* internal dependencies */

/* setup */

const availableCommands: CommandActions[] = [
  'init',
  'build',
  'publish',
  'help',
];

/* process arguments */

program
  .usage(`<${availableCommands.join('|')}>`)
  .name('bb actions')
  .command('init', 'create a new functions project in the current directory')
  .command(
    'build',
    'build all the created functions in the CWD to the dist folder',
  )
  .command(
    'publish [options] [path]',
    'publish the  built function(s) and their meta to our azure functions server',
  )
  .on('command:*', ([command]: string[]): void => {
    if (!availableCommands.includes(command as CommandActions)) {
      console.error('Invalid command: %s\n', command);
      program.outputHelp();
    }
  })
  .parse(process.argv);
