#!/usr/bin/env node

const { mkdirsSync, copyDirectorySync, modifyFile, toCamel } = require('./_tools/common.js');
const path = require('path');
const chalk = require('chalk');

const cwd = process.cwd();
const pageName = process.argv[2];
// Assume the page root is src/pages
const pageDir = path.resolve(cwd, 'src/pages', pageName);

(function main() {
  try {
    if (!pageName) {
      console.info(chalk.red('Error: Please enter the page name, like this: create-page xxx-xxx '));
      return;
    }
    createPageDir();
    copyEnginTemplates();
    setTemplateName();
    console.info(chalk.green(`The Page '${pageName}' created successfully!`));
  } catch (error) {
    console.info(chalk.red(error));
  }
})();

function createPageDir() {
  mkdirsSync(pageDir);
}

function copyEnginTemplates() {
  const sourcePath = path.resolve(__dirname, 'engin-templates');
  copyDirectorySync(sourcePath, pageDir);
}

function setTemplateName() {
  const storeHookPath = path.resolve(pageDir, '_useStoreHook.ts');
  modifyFile(
    storeHookPath,
    'useXXXStoreHook',
    toCamel(`use-${pageName.replaceAll('/', '-')}-StoreHook`),
  );
}
