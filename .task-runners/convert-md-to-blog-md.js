const fs = require('fs');
const fsExtra = require('fs-extra');
const prepend = require('prepend');
const glob = require('glob');
const moment = require('moment');

const path = require('path');
const { rename } = require('./utils/fs-helper');

// can apply yield function for console.log
function convertMdToBlogMdByDate(projectRootDir) {
  // throw new Error('');

  // fsExtra.copySync(rootDir, destDir); //TODO: warning... no copy... make one task using yeild.

  const srcDir = path.join(projectRootDir, '.staging/til/by-date');
  const destDir = path.join(projectRootDir, '_posts/devs/til/by-date');
  const archiveDir = path.join(projectRootDir, `.archives/til/by-date`);

  return Promise.resolve()
    .then(() => fetchTargetFilePaths(srcDir))
    .then((paths) => {
      let promises = [];

      console.log(`# target file count is ${paths.length}`);

      paths.forEach((_path) => {
        console.log(_path);
        try {
          const context = new Context(_path, destDir);

          const header = _buildMdHeader({ title: `${context.title}`, category: 'til', layout: 'post', tag: 'by-date' });
          const promise = Promise.resolve()
            .then(() => {
              if (fs.existsSync(context.destPath)) return Promise.reject(Error(`[NOT CONVERT]  ${context.destPath}`));
            })
            .then(() => rename(_path, archiveDir, context.srcFileName, { copy: true }))
            .then(() => _asyncHasHeaderIfNotAppend(_path, header))
            .then(() => {
              const { destFileName, destDir, destPath } = context;
              rename(_path, destDir, destFileName, { copy: false });
              //TODO: clean all...
              console.log(`[CONVERT]  ${destPath}`);
            });
          promises.push(promise);
        } catch (error) {
          // console.log(error);
        }
      });
      return Promise.all(promises);
    });
}

class Context {
  constructor(srcPath, destDir) {
    // validate check
    const baseNameWithOutExt = path.basename(srcPath, '.md');
    if (this._isInvalidBaseName(baseNameWithOutExt)) throw new Error(`Context Valid Error, Invalid File Name ${baseNameWithOutExt}`);

    const prefix = moment(baseNameWithOutExt).format('YYYY-MM-DD');

    this.srcPath = srcPath;
    this.srcFileName = path.basename(srcPath);

    this.destDir = destDir;
    this.destFileName = `${prefix}-TIL.md`;
    this.destPath = path.join(destDir, this.destFileName);

    this.title = `${moment(baseNameWithOutExt).format('YYYY/MM/DD')} TIL`;
  }

  _isInvalidBaseName(name) {
    console.log(name);
    if (name.length < 8) return true;

    const date = moment(name);
    if (!date.isValid()) return true;

    return false;
  }
}

function convertBlogMdToMd() {
  // not yet impl
}

function fetchTargetFilePaths(dir) {
  const globPath = path.join(dir, '**/*.md');

  return new Promise((resolve, reject) => {
    glob(globPath, { dot: true }, (err, files) => {
      if (err) return reject(err);
      const paths = files;
      resolve(paths);
    });
  });
}

function _buildMdHeader(map) {
  let header = '---\r\n';
  Object.keys(map).forEach((key) => {
    const value = map[key];
    if (value) {
      if (Array.isArray(value)) header += `${key}: [${value.toString()}]\r\n`;
      else header += `${key}: ${map[key]}\r\n`;
    }
  });

  header += '---';
  return header;
}

function _asyncHasHeaderIfNotAppend(_path, header) {
  const buffer = fs.readFileSync(_path);
  const str = buffer.toString().slice(0, 10);

  if (str.indexOf('---') !== -1) {
    console.log(_path, ' has already header');
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    prepend(_path, header, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

module.exports = { convertBlogMdToMd, convertMdToBlogMd: convertMdToBlogMdByDate, _prependJekyllHeader: _buildMdHeader };
