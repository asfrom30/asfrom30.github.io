const expect = require('chai').expect;
const { convertBlogMdToMd, convertMdToBlogMd: convertMdToBlogMdByDate, _prependJekyllHeader } = require('./convert-md-to-blog-md');

const glob = require('glob');

// be sure current working directory

const path = require('path');

const targetRootDir = path.join(__dirname, '../.staging/til/by-date');
const destRootDir = path.join(__dirname, '../_posts/til/dev-til/by-date');

console.log(targetRootDir);
console.log(destRootDir);

describe('# Private Function : Prepend Header', () => {
  it('should make prepend header', () => {
    expect(_prependJekyllHeader({ title: 'a', tag: ['a', 'b'] }))
      .to.include('title')
      .to.include('tag');

    expect(_prependJekyllHeader({ title: 'a', tag: ['a', 'b'] })).to.include('[a,b]');

    expect(_prependJekyllHeader({ title: undefined, tag: ['a', 'b'] })).not.to.include('title');
  });
});

describe('# Convert Md to BlogMd', () => {
  // it('should not throw error when all file is match md', (cb) => {
  //   convertMdToBlogMdByDate(targetRootDir, destRootDir)
  //     .then((res) => {
  //       expect(Array.isArray(res)).to.be.equal(true);
  //       expect(res.length).to.be.above(0);
  //       cb();
  //     })
  //     .catch((err) => {
  //       cb(err);
  //     });
  // });
  // it('should transfer file and append text', (cb) => {
  //   fetchTargetFilePaths().then((paths) => {
  //     const dest = 'after-convert/';
  //     convertMdToBlogMd(paths, dest);
  //     cb();
  //   });
  // });
  // it('should throw error when file is not md, or already blogMd', (cb) => {
  //   convertMdToBlogMd(targetRootDir, destRootDir)
  //     .then(() => {})
  //     .catch(() => {
  //       cb();
  //     });
  // });
});
