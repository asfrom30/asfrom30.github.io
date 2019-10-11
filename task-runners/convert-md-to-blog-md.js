const fs = require('fs');
const fsExtra = require('fs-extra');
const prepend = require('prepend');
const glob = require('glob');
const moment = require('moment');

const path = require('path');

// can apply yield function for console.log
function convertMdToBlogMdByDate(rootDir, destDir) {
  // throw new Error('');

  // fsExtra.copySync(rootDir, destDir); //TODO: warning... no copy... make one task using yeild.

  return Promise.resolve()
    .then(() => fetchTargetFilePaths(destDir))
    .then((paths) => {
      let promises = [];

      paths.forEach((path) => {
        const buffer = fs.readFileSync(path);
        const str = buffer.toString().slice(0, 10);
        if (str.indexOf('---') === -1) {
          const ms = fs.statSync(path).birthtimeMs;
          const title = `${moment(ms).format('YYYY/MM/DD')} TIL`;
          const category = 'til';
          const layout = 'post';
          const tag = 'by-date';

          const filePrefix = moment(ms).format('YYYY-MM-DD');
          const fileName = `${filePrefix}-TIL`;

          // make title
          // rename file...

          const header = _buildMdHeader({ title, category, layout });
          console.log(header);

          const promise = new Promise((resolve, reject) => {
            prepend(path, header, (err) => {
              if (err) return reject(err);
              resolve();
            });
          });
          promises.push(promise);
        } else {
          // throw new Error('It is already Blog Md file');
        }
      });
      return Promise.all(promises);
    });
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

module.exports = { convertBlogMdToMd, convertMdToBlogMd: convertMdToBlogMdByDate, _prependJekyllHeader: _buildMdHeader };
