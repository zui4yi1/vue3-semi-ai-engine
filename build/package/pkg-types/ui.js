/* eslint-disable @typescript-eslint/no-var-requires */
const fse = require('fs-extra');
const path = require('path');

const root = process.cwd();
const srcRoot = path.join(root, 'src');
const packageRoot = path.join(root, 'packages');

const buildPkg = () => {
  fse.removeSync(path.join(packageRoot, 'components'));
  fse.copySync(path.join(srcRoot, 'components'), path.join(packageRoot, 'components'));
};

module.exports = buildPkg;
