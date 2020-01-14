/* npm dependencies */

import program, { CommanderStatic } from 'commander';
import chalk from 'chalk';
import { existsSync, copy, move } from 'fs-extra';
import path from 'path';

const CONFIG_FILES = [
  'package.json',
  'webpack.config.js',
  '.eslintignore',
  '.eslintrc.json',
  '.prettierignore',
  '.prettierrc.json',
  'tsconfig.json',
];

/* process arguments */
program.name('bbac actions init').parse(process.argv);

// const { args }: CommanderStatic = program;

const dest = process.cwd();

/* execute command */
if (existsSync(`${dest}/package.json`)) {
  throw Error(
    chalk.red(
      `\nWe have already initialized a project at the directory (${dest}).\n`,
    ),
  );
}

(async (): Promise<void> => {
  try {
    await copy(path.join(__dirname, '../assets/actions'), dest);

    Promise.all(
      CONFIG_FILES.map(fileName =>
        move(`${dest}/__${fileName}`, `${dest}/${fileName}`),
      ),
    );

    console.log(
      chalk.green(
        `\n BB functions succesfully initialized in directory '${dest}'.\n`,
      ),
    );
  } catch ({ message }) {
    throw Error(
      chalk.red(
        `\nCould not initialize BB functions in directory ${dest}: ${message}.\n`,
      ),
    );
  }
})();
