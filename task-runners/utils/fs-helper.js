const path = require('path');
const fs = require('fs');

function rename(src, destDir, fileRename, { copy = false } = {}) {
  if (copy) {
    fs.copyFileSync(src, path.join(destDir, fileRename));
  } else {
    fs.renameSync(src, path.join(destDir, fileRename));
  }
}

const fsExtra = require('fs-extra');

function copyFolder() {
  // not yet impl
  fsExtra.copySync('.resources/-boarding-queue', '.resources/after-convert');
}

module.exports = { rename, copyFolder };
